use serde::{Deserialize, Serialize};

/// The 3-Tier Sovereign Defense-in-Depth Security Levels
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub enum ActionSecurityLevel {
    /// Tier 0: Normal safe operations (e.g. read files, standard inference)
    Standard,
    /// Tier 1: System Veto ("Hell No") — High risk / illegal action attempt
    Tier1Veto,
    /// Tier 2: Threat Escalation Warning — Requires explicit confirmation check
    Tier2Warning,
    /// Tier 3: Sovereign Accountability Lock — Final explicit sign-off & responsibility waiver
    Tier3AccountabilityLock,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Tier3SignOff {
    pub human_ack_warning: bool,
    pub human_accept_consequences: bool,
    pub sovereign_phrase_hash: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ActionEvaluation {
    pub level: ActionSecurityLevel,
    pub permitted: bool,
    pub prompt_message: Option<String>,
}

pub struct ThreeTierGate;

impl ThreeTierGate {
    pub fn evaluate_action(
        risk_score: f64,
        is_illegal_threat: bool,
        sign_off: Option<&Tier3SignOff>,
    ) -> ActionEvaluation {
        if is_illegal_threat {
            // Tier 1: Core System Veto ("Hell No")
            if sign_off.is_none() {
                return ActionEvaluation {
                    level: ActionSecurityLevel::Tier1Veto,
                    permitted: false,
                    prompt_message: Some(
                        "TIER 1 VETO: Action flagged as severe threat. Execution halted ('HELL NO').".to_string(),
                    ),
                };
            }

            let s = sign_off.unwrap();

            // Tier 2: Threat Escalation Gate
            if !s.human_ack_warning {
                return ActionEvaluation {
                    level: ActionSecurityLevel::Tier2Warning,
                    permitted: false,
                    prompt_message: Some(
                        "TIER 2 WARNING: Action flagged as potential security threat. Check the warning box to proceed.".to_string(),
                    ),
                };
            }

            // Tier 3: Sovereign Accountability Lock
            if !s.human_accept_consequences || s.sovereign_phrase_hash.is_empty() {
                return ActionEvaluation {
                    level: ActionSecurityLevel::Tier3AccountabilityLock,
                    permitted: false,
                    prompt_message: Some(
                        "TIER 3 ACCOUNTABILITY LOCK: You must accept full personal responsibility for all consequences arising from this action.".to_string(),
                    ),
                };
            }

            // High-Impact Override Granted under Full Sovereign Sign-Off
            return ActionEvaluation {
                level: ActionSecurityLevel::Tier3AccountabilityLock,
                permitted: true,
                prompt_message: Some(
                    "SOVEREIGN SIGN-OFF RECORDED: Full personal accountability bound to human operator key.".to_string(),
                ),
            };
        }

        if risk_score > 0.7 {
            return ActionEvaluation {
                level: ActionSecurityLevel::Tier2Warning,
                permitted: true,
                prompt_message: Some(
                    "TIER 2 ADVISORY: High-risk operation authorized.".to_string(),
                ),
            };
        }

        ActionEvaluation {
            level: ActionSecurityLevel::Standard,
            permitted: true,
            prompt_message: None,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_three_tier_veto_and_escalation() {
        // Tier 1 Veto
        let eval1 = ThreeTierGate::evaluate_action(0.9, true, None);
        assert_eq!(eval1.level, ActionSecurityLevel::Tier1Veto);
        assert!(!eval1.permitted);

        // Tier 3 Full Sign-Off
        let sign_off = Tier3SignOff {
            human_ack_warning: true,
            human_accept_consequences: true,
            sovereign_phrase_hash: "hash_sovereign_ack".to_string(),
        };

        let eval3 = ThreeTierGate::evaluate_action(0.9, true, Some(&sign_off));
        assert_eq!(eval3.level, ActionSecurityLevel::Tier3AccountabilityLock);
        assert!(eval3.permitted);
    }
}
