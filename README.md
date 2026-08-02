# Chyren SELIN Series (ARCHON v1.0)
## Sovereign Encrypted Localized Identity Nestor

> **"THIS IS NOT A CHATBOT — IT IS A SOVEREIGN REASONING ENGINE."**

Chyren SELIN is an open-source **Reflect-It-Yourself Unit (RIYU)** designed for **verifiable accuracy over illusionary streaming speed**. It sacrifices instant ungrounded token output in favor of multi-pass mathematical verification governed by the **ARCHON** runtime.

---

## 1. System Taxonomy & Principles

* **ARI (Artificial Real Intelligence):** Grounded, state-bound, anti-drift cognitive intelligence.
* **ADCCL (Anti-Drift Cognitive Control Loop):** Universal 7-step structure-before-narration verification gate:
  $$\chi = \sqrt{\frac{V^2 + (1 - J)^2}{2}} \ge \frac{1}{\sqrt{2}} \approx 0.7071$$
* **SELIN:** Sovereign Encrypted Localized Identity Nestor — pre-packaged with the universal ADCCL governor.
* **Yettragrammaton Protocol:** The gauge-fixing identity basepoint mechanism. On first boot (`selin init`), it generates an encrypted identity seal from your personal values ($H(\text{UserValues} \parallel \text{Entropy})$).

---

## 2. Quickstart

### Prerequisites
* Rust 1.80+ (for building from source)
* Docker & Docker Compose (for containerized local execution)

### 1-Command Local AI Node Launch
```bash
docker compose up -d
```
This boots the ARCHON **HTTP server** alongside a local Ollama instance, pulls the
default model automatically, and waits until both are healthy. Then:

```bash
# Liveness
curl localhost:8080/health

# Govern a prompt (returns the ADCCL verdict + output only if it clears the gate)
curl -sX POST localhost:8080/v1/govern \
  -H 'content-type: application/json' \
  -d '{"prompt": "Explain the ADCCL chiral invariant."}'

# Retrieve the proof trace for a run
curl localhost:8080/v1/audit/<run_id>
```

### Building & Running the CLI
```bash
cargo build --release
./target/release/selin init            # create your identity basepoint
./target/release/selin run "…"         # govern one prompt from the CLI
./target/release/selin serve --port 8080   # run the HTTP server directly
```

### Verifying a build
```bash
./scripts/check.sh   # fmt + clippy (deny warnings) + tests
```

---

## 3. Security & Implementation Status

Honest accounting of what is implemented today versus named/aspirational, so the
"Encrypted"/"Sovereign" language isn't taken for more than it is.

**Implemented**
* **Independent ADCCL gate.** Answers are scored by a *separate* verification
  pass (not model self-assessment), the question/answer are treated as untrusted
  data, and scoring **fails closed** — an unparseable, missing, or absent score
  rejects the output. It no longer defaults to passing.
* **Three-tier action gate.** Prompts are risk-classified before execution;
  severe intent is vetoed unless the operator binds `SELIN_SOVEREIGN_SIGNOFF`.
* **HTTP governance server.** `selin serve` runs a real async (tokio/axum)
  service — `GET /health`, `POST /v1/govern`, `GET /v1/audit/:run_id` — with a
  concurrency cap and per-request timeout. `docker compose up` runs it, not a
  one-shot preflight.
* **CSPRNG + KDF seal entropy.** The basepoint seal draws entropy from the OS
  CSPRNG and derives its key via HKDF-SHA256. The seal is an HMAC — this provides
  *integrity/authenticity* (tamper-evidence), **not confidentiality**.

**Not yet implemented (named but pending — do not rely on these):**
* **At-rest encryption.** The myelin SQLite store is currently plaintext. The
  "Encrypted" in SELIN is a goal (SQLCipher), not a current property.
* **Hardware-anchored keys / TPM.** Not integrated — do not treat the seal as
  secret-grade; it binds identity and detects tampering, nothing more.

**On the χ formula.** `χ = √[(V² + (1−J)²)/2]` and the `1/√2` floor are a
*design convention* of this project (an L2 distance of the `(V, 1−J)` state from
the origin, thresholded at the unit half-diagonal), not a derived theorem. Treat
it as an engineering gate, not a proof.

See [`CHANGELOG.md`](CHANGELOG.md) for the roadmap of the pending items.

## 4. License
Licensed under Apache License, Version 2.0 (`LICENSE`).
