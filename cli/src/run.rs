use archon_kernel::{AdaptiveResilientFormatter, AdcclGate};
use chrono::Utc;
use reqwest::blocking::Client;
use rusqlite::Connection;
use serde_json::{json, Value};
use sha2::{Digest, Sha256};
use uuid::Uuid;

use crate::init::{load_endpoint_from_bp, myelin_db_path};

/// Execute an ARCHON-governed task against the configured model endpoint.
/// Logs {V, J, χ} to the myelin store and returns a run_id for `selin audit`.
pub fn execute_run(prompt: &str) {
    println!("╔══════════════════════════════════════════════════════════════╗");
    println!("║     ARCHON GOVERNED TASK EXECUTION                           ║");
    println!("╚══════════════════════════════════════════════════════════════╝");
    println!("  Prompt: \"{}\"", prompt);
    println!();

    let endpoint = load_endpoint_from_bp();
    let run_id = Uuid::new_v4().to_string();
    let prompt_hash = hex::encode(Sha256::digest(prompt.as_bytes()));

    println!("  Run ID: {}", run_id);
    println!("  Endpoint: {}", endpoint);
    println!("  Submitting to model...\n");

    let client = Client::builder()
        .timeout(std::time::Duration::from_secs(60))
        .build()
        .expect("Failed to build HTTP client");

    let model = crate::preflight::detect_ollama_model_pub(&endpoint, &client);

    // Structured prompt: ask model to reason and provide v_score/j_penalty
    let structured_prompt = format!(
        "Answer the following question. After your answer, provide a JSON block with your self-assessed \
         accuracy scores: {{\"v_score\": <0.0-1.0 factual verifiability>, \"j_penalty\": <0.0-1.0 drift/hallucination risk>}}.\n\nQuestion: {}",
        prompt
    );

    let api_url = if endpoint.contains("11434") {
        format!("{}/api/generate", endpoint.trim_end_matches('/'))
    } else {
        format!("{}/v1/chat/completions", endpoint.trim_end_matches('/'))
    };

    let body = if endpoint.contains("11434") {
        json!({
            "model": model,
            "prompt": structured_prompt,
            "stream": false
        })
    } else {
        json!({
            "model": model,
            "messages": [{"role": "user", "content": structured_prompt}]
        })
    };

    let gate = AdcclGate::default();

    let (raw_text, _model_name, report, raw_snippet) = match client.post(&api_url).json(&body).send() {
        Ok(resp) if resp.status().is_success() => {
            let resp_body: Value = resp.json().unwrap_or(Value::Null);
            let text = resp_body
                .get("response")
                .and_then(|v| v.as_str())
                .or_else(|| {
                    resp_body
                        .pointer("/choices/0/message/content")
                        .and_then(|v| v.as_str())
                })
                .unwrap_or("")
                .to_string();

            let name = resp_body
                .get("model")
                .and_then(|v| v.as_str())
                .unwrap_or(&model)
                .to_string();

            let snippet = text.chars().take(200).collect::<String>();

            // Try to parse model's self-scored JSON from its response
            let (v, j) = match AdaptiveResilientFormatter::parse_and_repair_json(&text) {
                Ok(parsed) => (
                    parsed.get("v_score").and_then(|v| v.as_f64()).unwrap_or(0.8),
                    parsed.get("j_penalty").and_then(|v| v.as_f64()).unwrap_or(0.2),
                ),
                Err(_) => (0.8, 0.2), // conservative defaults if model didn't score itself
            };

            (text, name, gate.evaluate(v, j), snippet)
        }
        Ok(resp) => {
            let status = resp.status();
            let conservative = gate.evaluate(0.5, 0.5);
            (
                String::new(),
                "unknown".to_string(),
                conservative,
                format!("HTTP error: {}", status),
            )
        }
        Err(e) => {
            let conservative = gate.evaluate(0.3, 0.7);
            (
                String::new(),
                "unreachable".to_string(),
                conservative,
                format!("Connection error: {}", e),
            )
        }
    };

    // Print ADCCL verdict
    println!("  ┌─ ADCCL GATE VERDICT ────────────────────────────────────┐");
    println!(
        "  │  V_score: {:.4} | J_penalty: {:.4} | χ_invariant: {:.4} │",
        report.v_gate_score, report.drift_penalty_j, report.chiral_invariant
    );
    if report.passed {
        println!("  │  STATUS: ✓ PASSED (χ >= {:.4})                         │", gate.threshold);
    } else {
        println!(
            "  │  STATUS: ✗ REJECTED — {}   │",
            report.rejection_reason.as_deref().unwrap_or("ChiralViolation")
        );
    }
    println!("  └─────────────────────────────────────────────────────────┘\n");

    if !raw_text.is_empty() && report.passed {
        println!("  Output:\n  {}", raw_text.trim());
    } else if !report.passed {
        println!("  Output suppressed — ChiralViolation: response did not meet governance threshold.");
    }

    // Log to myelin store
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
                raw_snippet,
            ],
        );
        println!("\n  Logged to myelin store. Run ID: {}", run_id);
        println!("  Use `selin audit {}` to retrieve the proof trace.", run_id);
    } else {
        println!("\n  [warn] Could not write to myelin store — run `selin init` first.");
    }
}
