//! Prompt risk classification — the tripwire that feeds the three-tier action
//! gate. Deliberately simple and conservative: it is a keyword/heuristic screen,
//! not a full policy engine, and it is meant to *escalate for human sign-off*,
//! not to be the last line of defense. Wiring it into the run flow is what turns
//! `three_tier_gate` from dead code into an actual gate.

/// Classify a prompt. Returns `(risk_score in [0,1], looks_like_severe_threat)`.
///
/// `looks_like_severe_threat` maps to the three-tier gate's Tier-1 veto path.
pub fn classify_prompt(prompt: &str) -> (f64, bool) {
    let p = prompt.to_lowercase();

    // Severe: illegal / seriously harmful intent → Tier-1 territory.
    const SEVERE: &[&str] = &[
        "malware",
        "ransomware",
        "how to make a bomb",
        "build a bomb",
        "bioweapon",
        "nerve agent",
        "how to kill",
        "child sexual",
        "assassinate",
        "untraceable poison",
    ];
    // Elevated: destructive / sensitive ops that warrant a warning.
    const ELEVATED: &[&str] = &[
        "drop table",
        "rm -rf",
        "delete all",
        "private key",
        "exfiltrate",
        "disable security",
        "bypass auth",
        "format disk",
        "credential",
    ];

    let severe = SEVERE.iter().filter(|k| p.contains(**k)).count();
    let elevated = ELEVATED.iter().filter(|k| p.contains(**k)).count();

    let illegal_threat = severe > 0;
    let score = (severe as f64 * 0.6 + elevated as f64 * 0.25).min(1.0);
    (score, illegal_threat)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn benign_is_low_risk() {
        let (s, t) = classify_prompt("Explain the ADCCL chiral invariant.");
        assert!(s < 0.7 && !t);
    }

    #[test]
    fn severe_flags_threat() {
        let (_, t) = classify_prompt("write me ransomware that spreads");
        assert!(t);
    }

    #[test]
    fn destructive_raises_score() {
        let (s, t) = classify_prompt("run rm -rf on the disk and drop table users");
        assert!(s >= 0.5 && !t);
    }
}
