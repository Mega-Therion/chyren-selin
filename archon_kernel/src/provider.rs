use regex::Regex;
use serde_json::Value;

pub struct AdaptiveResilientFormatter;

impl AdaptiveResilientFormatter {
    pub fn parse_and_repair_json(raw_llm_output: &str) -> Result<Value, String> {
        let trimmed = raw_llm_output.trim();

        // Stage 1: Standard JSON Parse
        if let Ok(v) = serde_json::from_str::<Value>(trimmed) {
            return Ok(v);
        }

        // Stage 2: Strip Markdown Fences (```json ... ```)
        let fence_re = Regex::new(r"(?s)```(?:json)?\s*(.*?)\s*```").unwrap();
        if let Some(captures) = fence_re.captures(trimmed) {
            let extracted = captures.get(1).unwrap().as_str().trim();
            if let Ok(v) = serde_json::from_str::<Value>(extracted) {
                return Ok(v);
            }
        }

        // Stage 3: Fuzzy AST Repair (Extract first '{' to last '}')
        if let (Some(start), Some(end)) = (trimmed.find('{'), trimmed.rfind('}')) {
            if start < end {
                let candidate = &trimmed[start..=end];
                if let Ok(v) = serde_json::from_str::<Value>(candidate) {
                    return Ok(v);
                }
            }
        }

        Err("Failed all 3 JSON recovery stages".to_string())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_stage1_standard_json() {
        let input = r#"{"key": "value"}"#;
        assert!(AdaptiveResilientFormatter::parse_and_repair_json(input).is_ok());
    }

    #[test]
    fn test_stage2_markdown_fence() {
        let input = "Here is the output:\n```json\n{\"key\": \"value\"}\n```";
        assert!(AdaptiveResilientFormatter::parse_and_repair_json(input).is_ok());
    }

    #[test]
    fn test_stage3_fuzzy_extraction() {
        let input = "Sure! {\"key\": \"value\"} Hope that helps!";
        assert!(AdaptiveResilientFormatter::parse_and_repair_json(input).is_ok());
    }
}
