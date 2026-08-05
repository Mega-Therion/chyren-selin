use archon_kernel::basepoint::{generate_basepoint_seal, generate_entropy};
use chrono::Utc;
use dialoguer::{theme::ColorfulTheme, Input};
use serde_json::json;
use std::fs;
use std::path::PathBuf;

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

/// Returns the database encryption key from basepoint.json, if present.
/// Used to apply PRAGMA key when opening the Myelin store.
pub fn db_key() -> Option<String> {
    let raw = std::fs::read_to_string(basepoint_path()).ok()?;
    let v: JsonValue = serde_json::from_str(&raw).ok()?;
    v.get("db_key")
        .and_then(|k| k.as_str())
        .map(|s| s.to_string())
}

/// Open the Myelin SQLite store, applying encryption if a key exists.
/// Falls back to unencrypted for backward compatibility (no key in basepoint.json).
pub fn open_myelin() -> Result<rusqlite::Connection, String> {
    let conn = rusqlite::Connection::open(myelin_db_path())
        .map_err(|e| format!("could not open {}: {e}", myelin_db_path().display()))?;
    if let Some(key) = db_key() {
        conn.pragma_update(None, "key", &key)
            .map_err(|e| format!("could not apply database encryption: {e}"))?;
    }
    Ok(conn)
}

pub fn basepoint_path() -> PathBuf {
    selin_dir().join("basepoint.json")
}

/// Public entry point. Prints a friendly error instead of panicking on failure.
pub async fn execute_init() {
    if let Err(e) = run_init().await {
        eprintln!("\n  ✗ Initialization failed: {e}");
        eprintln!("    Nothing was overwritten. Fix the issue above and re-run `selin init`.");
        std::process::exit(1);
    }
}

async fn run_init() -> Result<(), String> {
    println!("╔══════════════════════════════════════════════════════════════╗");
    println!("║     SELIN Series (ARCHON v1.0) — Init Wizard          ║");
    println!("║     Reflect-It-Yourself Unit (RIYU) Sovereign Onboarding     ║");
    println!("╚══════════════════════════════════════════════════════════════╝");
    println!();

    // Guard: refuse to silently clobber an existing identity (was INSERT OR
    // IGNORE, which kept the old seal while telling the user they'd re-initialized).
    let force = std::env::var("SELIN_FORCE_REINIT").is_ok();
    if basepoint_path().exists() && !force {
        return Err(format!(
            "an identity already exists at {}.\n    Re-initializing replaces your basepoint seal. \
             To proceed intentionally, re-run with SELIN_FORCE_REINIT=1.",
            basepoint_path().display()
        ));
    }

    println!("[1/4] Identity Directives");
    println!("      Enter your governing principles (comma-separated).");
    println!("      These are used to derive your seal; they are NOT stored in plaintext.\n");

    let theme = ColorfulTheme::default();
    let directives: String = Input::with_theme(&theme)
        .with_prompt("Directives")
        .default("sovereignty,verifiable-accuracy,anti-drift".to_string())
        .interact_text()
        .map_err(|e| format!("could not read directives: {e}"))?;

    let endpoint: String = Input::with_theme(&theme)
        .with_prompt("Model endpoint")
        .default("http://localhost:11434".to_string())
        .interact_text()
        .map_err(|e| format!("could not read endpoint: {e}"))?;

    // Step 2: Generate the seal from CSPRNG entropy (was hostname:timestamp).
    println!("\n[2/4] Generating Sovereign Identity Basepoint Seal (CSPRNG + HKDF)…");
    let salt = generate_entropy()?;
    let salt_hex = hex::encode(salt);
    let seal = generate_basepoint_seal(&directives, &salt);

    fs::create_dir_all(selin_dir())
        .map_err(|e| format!("could not create {}: {e}", selin_dir().display()))?;

    // Generate a 32-byte database encryption key (SQLCipher).
    // Stored in basepoint.json alongside the seal — both are local-only.
    let db_key_bytes = generate_entropy()?;
    let db_key_hex = hex::encode(db_key_bytes);

    // basepoint.json stores the seal + the random salt (needed to re-verify the
    // seal) + the database encryption key. It deliberately does NOT store the
    // directives or any hint of them.
    let bp_json = json!({
        "version": 2,
        "seal": seal,
        "salt": salt_hex,
        "seal_alg": "HKDF-SHA256/HMAC-SHA256",
        "created_at": Utc::now().to_rfc3339(),
        "endpoint": endpoint,
        "db_key": db_key_hex,
    });
    fs::write(
        basepoint_path(),
        serde_json::to_string_pretty(&bp_json)
            .map_err(|e| format!("could not serialize basepoint: {e}"))?,
    )
    .map_err(|e| format!("could not write {}: {e}", basepoint_path().display()))?;

    println!("      Seal (HMAC-SHA256): {seal}");
    println!("      Written to: {}", basepoint_path().display());

    // Step 3: Preflight probe (non-fatal).
    println!("\n[3/4] Running Model Capability Preflight Diagnostic…");
    let preflight = execute_preflight_probe(&endpoint).await;
    match &preflight {
        PreflightResult::Pass { model, latency_ms } => {
            println!("      [✓] Model '{model}' responded in {latency_ms}ms — gate cleared.");
        }
        PreflightResult::Fail { reason } => {
            println!("      [✗] Preflight FAILED: {reason}");
            println!("      Continuing init — you can fix the endpoint later.");
        }
    }

    // Step 4: Myelin store.
    println!("\n[4/4] Initializing Myelin SQLite Store…");
    let schema_sql = include_str!("../../templates/myelin_schema.sql");
    let conn = open_myelin()?;
    conn.execute_batch(schema_sql)
        .map_err(|e| format!("could not apply myelin schema: {e}"))?;

    let (schema_ok, chi_ok, latency) = match &preflight {
        PreflightResult::Pass { latency_ms, .. } => (1, 1, *latency_ms as i64),
        PreflightResult::Fail { .. } => (0, 0, -1),
    };
    let model_name = match &preflight {
        PreflightResult::Pass { model, .. } => model.clone(),
        PreflightResult::Fail { reason } => format!("unknown ({reason})"),
    };
    let preflight_result = match &preflight {
        PreflightResult::Pass { .. } => "PASS",
        PreflightResult::Fail { .. } => "FAIL",
    };

    // Re-init (force): replace the single identity row rather than IGNORE it.
    conn.execute("DELETE FROM selin_identity", [])
        .map_err(|e| format!("could not reset identity: {e}"))?;
    conn.execute(
        "INSERT INTO selin_identity (basepoint_seal, seal_version) VALUES (?1, 2)",
        rusqlite::params![seal],
    )
    .map_err(|e| format!("could not insert identity: {e}"))?;

    conn.execute(
        "INSERT INTO preflight_log (endpoint, schema_adherence, chi_compliance, model_name, latency_ms, result) VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
        rusqlite::params![endpoint, schema_ok, chi_ok, model_name, latency, preflight_result],
    )
    .map_err(|e| format!("could not insert preflight log: {e}"))?;

    let db_size = fs::metadata(myelin_db_path()).map(|m| m.len()).unwrap_or(0);
    println!(
        "      Myelin DB: {} ({db_size} bytes) [SQLCipher encrypted]",
        myelin_db_path().display()
    );

    println!();
    println!("╔══════════════════════════════════════════════════════════════╗");
    println!("║  Initialization Complete.                                     ║");
    println!("║  Your SELIN instance is locked to your identity basepoint.   ║");
    println!("║  Run `selin preflight` anytime to re-verify your endpoint.   ║");
    println!("╚══════════════════════════════════════════════════════════════╝");
    Ok(())
}

/// Load configured endpoint from basepoint.json, env, or default.
pub fn load_endpoint_from_bp() -> String {
    if let Ok(ep) = std::env::var("MODEL_ENDPOINT") {
        return ep;
    }
    if let Ok(raw) = std::fs::read_to_string(basepoint_path()) {
        if let Ok(v) = serde_json::from_str::<JsonValue>(&raw) {
            if let Some(ep) = v.get("endpoint").and_then(|e| e.as_str()) {
                return ep.to_string();
            }
        }
    }
    "http://localhost:11434".to_string()
}
