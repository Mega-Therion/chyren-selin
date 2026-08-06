//! Integration tests for Archon Selin HTTP server security, prompt sanitization, metrics, and API key auth.

use selin::server::sanitize_prompt;

#[test]
fn test_sanitize_prompt_valid() {
    let raw = "Explain the quantum holonomy tensor on St(N, K).";
    let cleaned = sanitize_prompt(raw).expect("valid prompt should pass");
    assert_eq!(cleaned, raw);
}

#[test]
fn test_sanitize_prompt_empty_rejected() {
    let res = sanitize_prompt("   ");
    assert!(res.is_err());
    assert_eq!(res.unwrap_err(), "prompt must not be empty");
}

#[test]
fn test_sanitize_prompt_oversized_rejected() {
    let large_prompt = "a".repeat(35_000);
    let res = sanitize_prompt(&large_prompt);
    assert!(res.is_err());
    assert_eq!(res.unwrap_err(), "prompt exceeds maximum allowed byte limit (32KB)");
}

#[test]
fn test_sanitize_prompt_strips_zero_width_injection() {
    let raw = "r\u{200B}m -rf / with z\u{200C}w\u{200D}j and \u{FEFF}byte order mark";
    let cleaned = sanitize_prompt(raw).expect("should clean zero-width unicode");
    assert_eq!(cleaned, "rm -rf / with zwj and byte order mark");
}
