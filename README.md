# ⟪ CHYREN SELIN / ARCHON ⟫
## Sovereign Encrypted Localized Identity Nestor

![Chyren SELIN Hero](Visuals/hero.png)

> **"THIS IS NOT A CHATBOT — IT IS A SOVEREIGN REASONING ENGINE."**

---

## 🏛️ Overview

**Chyren SELIN** (Sovereign Encrypted Localized Identity Nestor) is an open-source **Reflect-It-Yourself Unit (RIYU)**. It is designed for **verifiable accuracy over illusionary streaming speed**, sacrificing instant ungrounded token output in favor of multi-pass mathematical verification governed by the **ARCHON** runtime.

SELIN is the public anchor of the Chyren ARI ecosystem, providing a localized, sovereign identity core that ensures your intelligence remains yours, your data remains local, and your reasoning remains grounded.

---

## ⚖️ System Taxonomy & Principles

*   **ARI (Artificial Real Intelligence):** Grounded, state-bound, anti-drift cognitive intelligence.
*   **RIYU (Reflect-It-Yourself Unit):** A cognitive architecture that reflects on its own reasoning before committing to an output.
*   **ADCCL (Anti-Drift Cognitive Control Loop):** The universal 7-step structure-before-narration verification gate:
    $$ \chi = \sqrt{\frac{V^2 + (1 - J)^2}{2}} \ge \frac{1}{\sqrt{2}} \approx 0.7071 $$
*   **Yettragrammaton Protocol:** The identity basepoint mechanism. On first boot (`selin init`), it generates an encrypted identity seal from your personal values ($H(\text{UserValues} \parallel \text{Entropy})$).

---

## 🛡️ ARCHON Governance

The **ARCHON** runtime enforces a bi-cameral governance framework:

1.  **Three-Tier Action Gate:** Prompts are risk-classified before execution. Severe intent is vetoed unless the operator binds `SELIN_SOVEREIGN_SIGNOFF`.
2.  **Independent ADCCL Gate:** Answers are scored by a separate verification pass. Scoring **fails closed** — an unparseable or missing score rejects the output.
3.  **Synthetic Judiciary:** A multi-layered framework decoupling provisional safety from immutable legal ratification.

---

## 🚀 Quick Start

### Prerequisites
*   **Rust 1.80+** (for building from source)
*   **Docker & Docker Compose** (for containerized local execution)

### 1-Command Local AI Node Launch
```bash
docker compose up -d
```
This boots the ARCHON **HTTP server** alongside a local Ollama instance.

### Using the API
```bash
# Liveness Check
curl localhost:8080/health

# Govern a Prompt
curl -sX POST localhost:8080/v1/govern \
  -H 'content-type: application/json' \
  -d '{"prompt": "Explain the ADCCL chiral invariant."}'

# Retrieve Audit Trace
curl localhost:8080/v1/audit/<run_id>
```

### Building the CLI
```bash
cargo build --release
./target/release/selin init            # create your identity basepoint
./target/release/selin run "…"         # govern one prompt from the CLI
./target/release/selin serve --port 8080   # run the HTTP server directly
```

---

## 🔐 Security & Implementation Status (Honest Accounting)

### Implemented
- **Independent ADCCL Gate:** Multi-pass verification that fails closed.
- **Three-Tier Action Gate:** Risk-classification and operator sign-off.
- **HTTP Governance Server:** Async (tokio/axum) service with concurrency caps.
- **Identity Seal:** CSPRNG + HKDF-SHA256 HMAC for integrity and authenticity.

### Pending (Roadmap)
- **At-Rest Encryption:** The Myelin SQLite store is currently plaintext; SQLCipher integration is planned.
- **Hardware-Anchored Keys:** TPM/TEE integration for secret-grade identity binding.

---

## 📂 Repository Structure

- `archon_kernel/`: Core Rust logic for ADCCL, risk, and verification.
- `cli/`: The `selin` CLI tool for audit, governance, and server management.
- `docs/`: Manifesto, Synthetic Judiciary Spec, and Quickstart guides.
- `scripts/`: Verification and phase-gating scripts.
- `templates/`: Terms of Sovereignty and Myelin schema templates.

---

## 📜 License
Licensed under Apache License, Version 2.0 (`LICENSE`).

> **ARCHON Protects. You Govern. Chyren SELIN.**
