use archon_kernel::{
    build_verifier_prompt, classify_prompt, extract_scores, ActionSecurityLevel,
    AdaptiveResilientFormatter, AdcclGate, ThreeTierGate, Tier3SignOff, FAIL_CLOSED,
};
use chrono::Utc;
use reqwest::blocking::Client;
use rusqlite::Connection;
use serde_json::{json, Value};
use sha2::{Digest, Sha256};
use uuid::Uuid;

use crate::init::{load_endpoint_from_bp, myelin_db_path};

/// Execute an ARCHON-governed task against the configured model endpoint.
///
/// Governance pipeline (this is the real gate, not a self-grade):
///   1. Risk classify the prompt → three-tier action gate (may veto / require
///      explicit sovereign sign-off before any model call is made).
///   2. Generate the answer with a clean, answer-only prompt.
///   3. Score the answer with a **separate, independent** verifier call whose
///      prompt treats the question and answer as untrusted data.
///   4. Feed the verifier's {V, J} into the chiral invariant. If no trustworthy
///      score is obtained, **fail closed** (reject) — never default to passing.
pub fn execute_run(prompt: &str) {
    println!("╔══════════════════════════════════════════════════════════════╗");
    println!("║     ARCHON GOVERNED TASK EXECUTION                           ║");
    println!("╚══════════════════════════════════════════════════════════════╝");
    println!("  Prompt: \"{}\"", prompt);
    println!();

    let endpoint = load_endpoint_from_bp();
    let run_id = Uuid::new_v4().to_string();
    let prompt_hash = hex::encode(Sha256::digest(prompt.as_bytes()));
    let gate = AdcclGate::default();

    println!("  Run ID: {}", run_id);
    println!("  Endpoint: {}", endpoint);

    // ── 1. Three-tier action gate (before any model call) ──────────────────
    let (risk_score, illegal_threat) = classify_prompt(prompt);
    let sign_off = build_sign_off();
    let action = ThreeTierGate::evaluate_action(risk_score, illegal_threat, sign_off.as_ref());
    if let Some(msg) = &action.prompt_message {
        println!("  ┌─ THREE-TIER ACTION GATE ────────────────────────────────┐");
        println!("  │  {:?} (risk={:.2})", action.level, risk_score);
        println!("  │  {}", msg);
        println!("  └─────────────────────────────────────────────────────────┘");
    }
    if !action.permitted {
        let reason = format!("Action blocked at {:?}", action.level);
        println!("\n  ✗ EXECUTION HALTED — {reason}");
        println!("  (Set SELIN_SOVEREIGN_SIGNOFF=\"<phrase>\" to bind sovereign accountability.)");
        log_run(
            &run_id,
            &prompt_hash,
            &gate.evaluate(FAIL_CLOSED.0, FAIL_CLOSED.1),
            &endpoint,
            &reason,
        );
        return;
    }

    let client = match Client::builder()
        .timeout(std::time::Duration::from_secs(60))
        .build()
    {
        Ok(c) => c,
        Err(e) => {
            println!("  [error] Could not build HTTP client: {e}");
            return;
        }
    };
    let model = crate::preflight::detect_ollama_model_pub(&endpoint, &client);

    // ── 2. Generate the answer (clean prompt — no self-scoring) ────────────
    println!("  Submitting to model ({model})…");
    let answer = match call_model(&client, &endpoint, &model, prompt) {
        Ok(a) if !a.trim().is_empty() => a,
        Ok(_) => {
            reject(
                &run_id,
                &prompt_hash,
                &gate,
                &endpoint,
                "Empty model response",
            );
            return;
        }
        Err(e) => {
            reject(
                &run_id,
                &prompt_hash,
                &gate,
                &endpoint,
                &format!("Model call failed: {e}"),
            );
            return;
        }
    };

    // ── 3. Independent verification (separate call, injection-resistant) ───
    println!("  Verifying answer via independent scoring pass…");
    let verifier_prompt = build_verifier_prompt(prompt, &answer);
    let (v, j, verdict_note) = match call_model(&client, &endpoint, &model, &verifier_prompt) {
        Ok(vraw) => match AdaptiveResilientFormatter::parse_and_repair_json(&vraw)
            .ok()
            .and_then(|json| extract_scores(&json))
        {
            Some((v, j)) => (v, j, "verifier-scored".to_string()),
            None => (
                FAIL_CLOSED.0,
                FAIL_CLOSED.1,
                "fail-closed: verifier returned no usable score".to_string(),
            ),
        },
        Err(e) => (
            FAIL_CLOSED.0,
            FAIL_CLOSED.1,
            format!("fail-closed: verifier call failed: {e}"),
        ),
    };

    // ── 4. Chiral invariant verdict ────────────────────────────────────────
    let report = gate.evaluate(v, j);
    println!("  ┌─ ADCCL GATE VERDICT ────────────────────────────────────┐");
    println!("  │  source: {verdict_note}");
    println!(
        "  │  V_score: {:.4} | J_penalty: {:.4} | χ: {:.4}",
        report.v_gate_score, report.drift_penalty_j, report.chiral_invariant
    );
    if report.passed {
        println!("  │  STATUS: ✓ PASSED (χ ≥ {:.4})", gate.threshold);
    } else {
        println!(
            "  │  STATUS: ✗ REJECTED — {}",
            report
                .rejection_reason
                .as_deref()
                .unwrap_or("ChiralViolation")
        );
    }
    println!("  └─────────────────────────────────────────────────────────┘\n");

    if report.passed {
        println!("  Output:\n  {}", answer.trim());
    } else {
        println!("  Output suppressed — response did not clear the governance threshold.");
    }

    log_run(&run_id, &prompt_hash, &report, &endpoint, &answer);
    println!("\n  Logged to myelin store. Run ID: {run_id}");
    println!("  Use `selin audit {run_id}` to retrieve the proof trace.");
}

/// Build a Tier-3 sovereign sign-off from the env, if the operator has bound one.
fn build_sign_off() -> Option<Tier3SignOff> {
    let phrase = std::env::var("SELIN_SOVEREIGN_SIGNOFF").ok()?;
    if phrase.trim().is_empty() {
        return None;
    }
    Some(Tier3SignOff {
        human_ack_warning: true,
        human_accept_consequences: true,
        sovereign_phrase_hash: hex::encode(Sha256::digest(phrase.as_bytes())),
    })
}

/// One model call. Handles the Ollama `/api/generate` and OpenAI-compatible
/// `/v1/chat/completions` shapes and returns the assistant text.
fn call_model(
    client: &Client,
    endpoint: &str,
    model: &str,
    prompt: &str,
) -> Result<String, String> {
    let is_ollama = endpoint.contains("11434");
    let api_url = if is_ollama {
        format!("{}/api/generate", endpoint.trim_end_matches('/'))
    } else {
        format!("{}/v1/chat/completions", endpoint.trim_end_matches('/'))
    };
    let body = if is_ollama {
        json!({ "model": model, "prompt": prompt, "stream": false })
    } else {
        json!({ "model": model, "messages": [{"role": "user", "content": prompt}] })
    };

    let resp = client
        .post(&api_url)
        .json(&body)
        .send()
        .map_err(|e| e.to_string())?;
    if !resp.status().is_success() {
        return Err(format!("HTTP {}", resp.status()));
    }
    let v: Value = resp.json().map_err(|e| e.to_string())?;
    let text = v
        .get("response")
        .and_then(|x| x.as_str())
        .or_else(|| {
            v.pointer("/choices/0/message/content")
                .and_then(|x| x.as_str())
        })
        .unwrap_or("")
        .to_string();
    Ok(text)
}

fn reject(run_id: &str, prompt_hash: &str, gate: &AdcclGate, endpoint: &str, note: &str) {
    let report = gate.evaluate(FAIL_CLOSED.0, FAIL_CLOSED.1);
    println!("  ✗ REJECTED (fail-closed) — {note}");
    log_run(run_id, prompt_hash, &report, endpoint, note);
}

/// Persist a run to the myelin store. Stores up to 2000 chars of output (was 200)
/// so rejected runs are actually debuggable.
fn log_run(
    run_id: &str,
    prompt_hash: &str,
    report: &archon_kernel::VerificationReport,
    endpoint: &str,
    output: &str,
) {
    let snippet: String = output.chars().take(2000).collect();
    if let Ok(conn) = Connection::open(myelin_db_path()) {
        let _ = conn.execute(
            "INSERT INTO adccl_runs (run_id, created_at, prompt_hash, v_score, j_penalty, chi_invariant, passed, rejection_reason, model_endpoint, raw_output_snippet)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)",
            rusqlite::params![
                run_id,
                Utc::now().to_rfc3339(),
                prompt_hash,
                report.v_gate_score,
                report.drift_penalty_j,
                report.chiral_invariant,
                if report.passed { 1 } else { 0 },
                report.rejection_reason,
                endpoint,
                snippet,
            ],
        );
    }
}

// Keep the tier enum referenced for exhaustiveness as the gate evolves.
#[allow(dead_code)]
fn _tier_name(l: &ActionSecurityLevel) -> &'static str {
    match l {
        ActionSecurityLevel::Standard => "standard",
        ActionSecurityLevel::Tier1Veto => "veto",
        ActionSecurityLevel::Tier2Warning => "warning",
        ActionSecurityLevel::Tier3AccountabilityLock => "accountability-lock",
    }
}
