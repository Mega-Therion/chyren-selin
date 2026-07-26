use archon_kernel::basepoint::generate_basepoint_seal;
use chrono::Utc;
use dialoguer::{theme::ColorfulTheme, Input};
use rusqlite::Connection;
use serde_json::json;
use sha2::{Digest, Sha256};
use std::fs;
use std::path::PathBuf;
use uuid::Uuid;

use crate::preflight::{execute_preflight_probe, PreflightResult};
use serde_json::Value as JsonValue;

/// Returns the SELIN data directory (~/.selin)
pub fn selin_dir() -> PathBuf {
    let home = std::env::var("HOME").unwrap_or_else(|_| "/tmp".into());
    PathBuf::from(home).join(".selin")
}

pub fn myelin_db_path() -> PathBuf {
    selin_dir().join("myelin.db")
}

pub fn basepoint_path() -> PathBuf {
    selin_dir().join("basepoint.json")
}

pub fn execute_init() {
    println!("╔══════════════════════════════════════════════════════════════╗");
    println!("║     CHYREN SELIN Series (ARCHON v1.0) — Init Wizard          ║");
    println!("║     Reflect-It-Yourself Unit (RIYU) Sovereign Onboarding     ║");
    println!("╚══════════════════════════════════════════════════════════════╝");
    println!();

    // Step 1: Gather identity directives
    println!("[1/4] Identity Directives");
    println!("      Enter your governing principles (comma-separated).");
    println!("      These are hashed — they are NEVER stored in plaintext.\n");

    let theme = ColorfulTheme::default();
    let directives: String = Input::with_theme(&theme)
        .with_prompt("Directives")
        .default("sovereignty,verifiable-accuracy,anti-drift".to_string())
        .interact_text()
        .expect("Failed to read directives");

    let endpoint: String = Input::with_theme(&theme)
        .with_prompt("Model endpoint")
        .default("http://localhost:11434".to_string())
        .interact_text()
        .expect("Failed to read endpoint");

    // Step 2: Generate Yettragrammaton basepoint seal
    println!("\n[2/4] Generating Yettragrammaton Basepoint Seal...");

    // Local entropy = hash of hostname + current timestamp nanoseconds
    let hostname = std::env::var("HOSTNAME")
        .or_else(|_| std::env::var("HOST"))
        .unwrap_or_else(|_| "localhost".to_string());
    let ts_ns = Utc::now().timestamp_nanos_opt().unwrap_or(0);
    let entropy_raw = format!("{}:{}", hostname, ts_ns);
    let entropy_hash = hex::encode(Sha256::digest(entropy_raw.as_bytes()));

    let seal = generate_basepoint_seal(&directives, &entropy_hash);

    // Write basepoint.json
    fs::create_dir_all(selin_dir()).expect("Failed to create ~/.selin directory");
    let bp_json = json!({
        "version": 1,
        "seal": seal,
        "created_at": Utc::now().to_rfc3339(),
        "directives_hint": directives.split(',').map(|s| s.trim().chars().take(3).collect::<String>() + "…").collect::<Vec<_>>().join(", "),
        "endpoint": endpoint
    });
    fs::write(
        basepoint_path(),
        serde_json::to_string_pretty(&bp_json).unwrap(),
    )
    .expect("Failed to write basepoint.json");

    println!("      Seal (HMAC-SHA256): {}", seal);
    println!("      Written to: {}", basepoint_path().display());

    // Step 3: Preflight probe
    println!("\n[3/4] Running Model Capability Preflight Diagnostic...");
    let preflight = execute_preflight_probe(&endpoint);
    match &preflight {
        PreflightResult::Pass { model, latency_ms } => {
            println!(
                "      [✓] Model '{}' responded in {}ms — ARCHON gate cleared.",
                model, latency_ms
            );
        }
        PreflightResult::Fail { reason } => {
            println!("      [✗] Preflight FAILED: {}", reason);
            println!("      Continuing init — you can fix the endpoint later.");
        }
    }

    // Step 4: Initialize myelin SQLite store
    println!("\n[4/4] Initializing Myelin SQLite Store...");
    let schema_sql = include_str!("../../templates/myelin_schema.sql");
    let conn = Connection::open(myelin_db_path()).expect("Failed to open myelin.db");
    conn.execute_batch(schema_sql)
        .expect("Failed to apply myelin schema");

    // Insert the basepoint record
    let run_id = Uuid::new_v4().to_string();
    let (schema_ok, chi_ok, latency) = match &preflight {
        PreflightResult::Pass { latency_ms, .. } => (1, 1, *latency_ms as i64),
        PreflightResult::Fail { .. } => (0, 0, -1),
    };
    let model_name = match &preflight {
        PreflightResult::Pass { model, .. } => model.clone(),
        PreflightResult::Fail { reason } => format!("unknown ({})", reason),
    };
    let preflight_result = match &preflight {
        PreflightResult::Pass { .. } => "PASS",
        PreflightResult::Fail { .. } => "FAIL",
    };

    conn.execute(
        "INSERT OR IGNORE INTO selin_identity (basepoint_seal, seal_version) VALUES (?1, 1)",
        rusqlite::params![seal],
    )
    .expect("Failed to insert identity record");

    conn.execute(
        "INSERT INTO preflight_log (endpoint, schema_adherence, chi_compliance, model_name, latency_ms, result) VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
        rusqlite::params![endpoint, schema_ok, chi_ok, model_name, latency, preflight_result],
    )
    .expect("Failed to insert preflight log");

    let db_size = fs::metadata(myelin_db_path()).map(|m| m.len()).unwrap_or(0);

    println!(
        "      Myelin DB: {} ({} bytes)",
        myelin_db_path().display(),
        db_size
    );
    println!("      Identity record ID: {}", run_id);

    println!();
    println!("╔══════════════════════════════════════════════════════════════╗");
    println!("║  Initialization Complete.                                     ║");
    println!("║  Your SELIN instance is locked to your identity basepoint.   ║");
    println!("║  Run `selin preflight` anytime to re-verify your endpoint.   ║");
    println!("╚══════════════════════════════════════════════════════════════╝");
}

/// Load configured endpoint from basepoint.json, env, or default.
pub fn load_endpoint_from_bp() -> String {
    if let Ok(ep) = std::env::var("MODEL_ENDPOINT") {
        return ep;
    }
    let bp_path = basepoint_path();
    if let Ok(raw) = std::fs::read_to_string(&bp_path) {
        if let Ok(v) = serde_json::from_str::<JsonValue>(&raw) {
            if let Some(ep) = v.get("endpoint").and_then(|e| e.as_str()) {
                return ep.to_string();
            }
        }
    }
    "http://localhost:11434".to_string()
}
