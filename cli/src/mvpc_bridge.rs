//! Local-only bridge to MVPC-X (mechanical claim/proof verifier).
//!
//! Contract: no network calls to Mega-Therion or any cloud "notary".
//! We only spawn a local `mvpc` (or `MVPC_BIN`) process on this machine.
//! Personal Chyren/AEON is never involved.

use std::env;
use std::fs;
use std::path::{Path, PathBuf};
use std::process::Command;

/// Extensions that should be routed to MVPC-X rather than χ-scored as prose.
pub fn looks_like_formal_artifact(path: &str) -> bool {
    let p = path.to_lowercase();
    p.ends_with(".lean")
        || p.ends_with(".v")
        || p.ends_with(".thy")
        || p.ends_with(".biomech")
        || p.ends_with("claim.yaml")
        || p.ends_with("claim.yml")
        || p.ends_with(".py") // may contain MVPC-CLAIM blocks; MVPC decides
}

fn mvpc_bin() -> String {
    env::var("MVPC_BIN").unwrap_or_else(|_| "mvpc".to_string())
}

fn require_mvpc() -> bool {
    matches!(
        env::var("SELIN_REQUIRE_MVPC").as_deref(),
        Ok("1") | Ok("true") | Ok("TRUE") | Ok("yes")
    )
}

fn out_dir() -> PathBuf {
    if let Ok(d) = env::var("SELIN_MVPC_OUT_DIR") {
        return PathBuf::from(d);
    }
    let home = env::var("HOME")
        .or_else(|_| env::var("USERPROFILE"))
        .unwrap_or_else(|_| ".".to_string());
    PathBuf::from(home).join(".selin").join("mvpc_witnesses")
}

/// Run local MVPC-X against `path`. Returns process exit code.
pub fn verify_artifact(path: &str, policy: &str, json_stdout: bool, run_id: Option<&str>) -> i32 {
    println!("╔══════════════════════════════════════════════════════════════╗");
    println!("║     SELIN → MVPC-X  (local mechanical audit)                 ║");
    println!("╚══════════════════════════════════════════════════════════════╝");
    println!("  Artifact : {path}");
    println!("  Policy   : {policy}");
    println!("  Bin      : {}", mvpc_bin());
    println!("  Mode     : local subprocess only (no cloud, no personal Chyren)");
    println!();

    if !Path::new(path).exists() {
        eprintln!("  ✗ Path does not exist: {path}");
        return fail_code(2);
    }

    let bin = mvpc_bin();
    // Probe that binary exists
    match Command::new(&bin).arg("--help").output() {
        Ok(_) => {}
        Err(e) => {
            eprintln!("  ✗ Cannot execute `{bin}`: {e}");
            eprintln!("    Install MVPC-X and ensure it is on PATH, or set MVPC_BIN.");
            eprintln!("    https://github.com/Mega-Therion/MVPC-X");
            return fail_code(127);
        }
    }

    let out_root = out_dir();
    if let Err(e) = fs::create_dir_all(&out_root) {
        eprintln!("  [warn] could not create witness dir {}: {e}", out_root.display());
    }

    let mut args: Vec<String> = vec![
        "audit".into(),
        path.into(),
        "--policy".into(),
        policy.into(),
        "--ci-mode".into(),
    ];
    if json_stdout {
        args.push("--json".into());
    }
    // Always ask MVPC to write reports into our out dir when supported
    args.push("--output-dir".into());
    args.push(out_root.to_string_lossy().to_string());

    println!("  Spawning: {bin} {}\n", args.join(" "));

    let output = match Command::new(&bin).args(&args).output() {
        Ok(o) => o,
        Err(e) => {
            eprintln!("  ✗ spawn failed: {e}");
            return fail_code(127);
        }
    };

    let stdout = String::from_utf8_lossy(&output.stdout);
    let stderr = String::from_utf8_lossy(&output.stderr);
    if !stdout.is_empty() {
        print!("{stdout}");
    }
    if !stderr.is_empty() {
        eprint!("{stderr}");
    }

    let code = output.status.code().unwrap_or(1);

    // Best-effort: stash a correlation sidecar if run_id provided
    if let Some(rid) = run_id {
        let side = out_root.join(format!("{rid}.selin-mvpc-link.json"));
        let body = format!(
            "{{\n  \"run_id\": {rid:?},\n  \"artifact\": {path:?},\n  \"policy\": {policy:?},\n  \"mvpc_exit_code\": {code},\n  \"note\": \"Local correlation only. Not a cloud seal.\"\n}}\n"
        );
        if let Err(e) = fs::write(&side, body) {
            eprintln!("  [warn] could not write link file: {e}");
        } else {
            println!("  Link file: {}", side.display());
        }
    }

    println!("  Witness/reports dir: {}", out_root.display());
    if code == 0 {
        println!("  ✓ MVPC mechanical audit exited clean (ci-mode).");
    } else {
        println!("  ✗ MVPC mechanical audit failed (exit {code}).");
        println!("    Generative χ-pass does not override this for formal artifacts.");
    }
    code
}

fn fail_code(code: i32) -> i32 {
    if require_mvpc() {
        std::process::exit(code);
    }
    code
}

/// CLI entry: exit with MVPC status when SELIN_REQUIRE_MVPC is set.
pub fn verify_artifact_cli(path: &str, policy: &str, json: bool, run_id: Option<&str>) {
    let code = verify_artifact(path, policy, json, run_id);
    if require_mvpc() || code != 0 {
        // Always surface non-zero to the shell for verify-artifact so CI can gate;
        // SELIN_REQUIRE_MVPC only changes behavior of soft helpers (reserved).
        std::process::exit(code);
    }
}
