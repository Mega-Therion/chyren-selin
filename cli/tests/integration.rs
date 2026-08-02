//! End-to-end integration tests driving the built `selin` binary.
//! These exercise the real async pipeline — no mocks — against an unreachable
//! endpoint to prove the fail-closed guarantee holds through the whole flow.

use std::process::Command;

fn selin() -> Command {
    Command::new(env!("CARGO_BIN_EXE_selin"))
}

#[test]
fn run_fails_closed_when_endpoint_is_unreachable() {
    // Port 9 (discard) refuses immediately — the model call cannot succeed, so
    // governance must reject rather than pass anything through.
    let out = selin()
        .args(["run", "hello there"])
        .env("MODEL_ENDPOINT", "http://127.0.0.1:9")
        .env("HOME", std::env::temp_dir())
        .output()
        .expect("failed to run selin");
    let stdout = String::from_utf8_lossy(&out.stdout);
    assert!(
        stdout.contains("REJECTED"),
        "expected a rejection verdict, got:\n{stdout}"
    );
    assert!(
        stdout.contains("fail-closed"),
        "expected fail-closed source, got:\n{stdout}"
    );
    assert!(
        stdout.contains("Output suppressed"),
        "rejected output must be suppressed, got:\n{stdout}"
    );
}

#[test]
fn help_lists_the_serve_command() {
    let out = selin()
        .arg("--help")
        .output()
        .expect("failed to run --help");
    assert!(out.status.success());
    let stdout = String::from_utf8_lossy(&out.stdout);
    assert!(stdout.contains("serve"), "serve command missing from help");
    assert!(stdout.contains("govern") || stdout.contains("Governed") || stdout.contains("run"));
}
