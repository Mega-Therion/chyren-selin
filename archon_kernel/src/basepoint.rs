use hmac::{Hmac, Mac};
use sha2::Sha256;

type HmacSha256 = Hmac<Sha256>;

pub fn generate_basepoint_seal(user_values: &str, local_entropy: &str) -> String {
    let mut mac =
        HmacSha256::new_from_slice(local_entropy.as_bytes()).expect("HMAC initialization failed");
    mac.update(user_values.as_bytes());
    let result = mac.finalize();
    hex::encode(result.into_bytes())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_basepoint_seal_generation() {
        let seal = generate_basepoint_seal("sovereignty,truth", "entropy_seed");
        assert_eq!(seal.len(), 64);
    }
}
