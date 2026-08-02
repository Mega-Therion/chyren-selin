use serde::{Deserialize, Serialize};

/// The canonical Stiefel identity-preserving minimum threshold.
pub const CHIRAL_FLOOR: f64 = std::f64::consts::FRAC_1_SQRT_2; // 1 / √2 ≈ 0.7071067811865476

/// Authoritative Chiral Invariant formula:
/// χ = √ ( V² + (1 - J)² ) / √2
pub fn compute_chiral_invariant(v_gate_score: f64, drift_penalty_j: f64) -> f64 {
    let v_clamped = v_gate_score.clamp(0.0, 1.0);
    let j_clamped = drift_penalty_j.clamp(0.0, 1.0);
    ((v_clamped.powi(2) + (1.0 - j_clamped).powi(2)) / 2.0).sqrt()
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct VerificationReport {
    pub v_gate_score: f64,
    pub drift_penalty_j: f64,
    pub chiral_invariant: f64,
    pub passed: bool,
    pub rejection_reason: Option<String>,
}

pub struct AdcclGate {
    pub threshold: f64,
}

impl Default for AdcclGate {
    fn default() -> Self {
        Self {
            threshold: CHIRAL_FLOOR,
        }
    }
}

impl AdcclGate {
    pub fn new(threshold: f64) -> Self {
        Self { threshold }
    }

    pub fn evaluate(&self, v_score: f64, j_penalty: f64) -> VerificationReport {
        let chi = compute_chiral_invariant(v_score, j_penalty);
        let passed = chi >= self.threshold;
        let rejection_reason = if passed {
            None
        } else {
            Some(format!(
                "Chiral Violation: Invariant {:.4} < threshold {:.4}",
                chi, self.threshold
            ))
        };

        VerificationReport {
            v_gate_score: v_score,
            drift_penalty_j: j_penalty,
            chiral_invariant: chi,
            passed,
            rejection_reason,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_reference_fixture_table() {
        // Shared {V, J} -> χ reference table test. The 1/√2 row is the on-floor
        // fixed point (V = 1/√2, J = 1 - 1/√2 ⇒ χ = 1/√2).
        let inv_sqrt2 = std::f64::consts::FRAC_1_SQRT_2;
        let fixtures = vec![
            (1.0, 0.0, 1.0),
            (0.9, 0.1, 0.9000),
            (inv_sqrt2, 1.0 - inv_sqrt2, inv_sqrt2),
            (0.5, 0.5, 0.5),
            (0.0, 1.0, 0.0),
        ];

        for (v, j, expected_chi) in fixtures {
            let chi = compute_chiral_invariant(v, j);
            assert!(
                (chi - expected_chi).abs() < 1e-4,
                "Fixture fail for V={}, J={}: got {}, expected {}",
                v,
                j,
                chi,
                expected_chi
            );
        }
    }

    #[test]
    fn test_chiral_floor_pass_fail() {
        let gate = AdcclGate::default();
        let pass_report = gate.evaluate(0.9, 0.1);
        assert!(pass_report.passed);

        let fail_report = gate.evaluate(0.4, 0.6);
        assert!(!fail_report.passed);
        assert!(fail_report.rejection_reason.is_some());
    }
}
