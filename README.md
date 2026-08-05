# SELIN / ARCHON

## Sovereign Encrypted Localized Identity Node

![SELIN Hero](Visuals/hero.png)

**SELIN** is an open-source **Reflect-It-Yourself Unit (RIYU)** — a sovereign, local-first AI governance node that verifies its own outputs through mathematical proof before presenting them to you.

It is designed for **verifiable accuracy over illusionary streaming speed**, sacrificing instant ungrounded token output in favor of multi-pass mathematical verification governed by the **ARCHON** runtime.

SELIN provides a localized, sovereign identity core that ensures your intelligence remains yours, your data remains local, and your reasoning remains grounded.

---

## ✨ Core Concepts

*   **RIYU (Reflect It Yourself Unit):** Every person who downloads SELIN gets a unique, cryptographically unique sovereign instance. No two RIYUs are the same. All run the same SELIN core on the same ARCHON architecture.
*   **ADCCL (Anti-Drift Cognitive Control Loop):** The universal 7-step structure-before-narration verification gate:
    1. Provisional risk classification.
    2. Independent generation.
    3. Independent verification (separate model, injection-resistant).
    4. Chiral invariant computation (V, J → χ).
    5. Three-tier action gate (Veto / Advisory / Accountability Lock).
    6. Persistence to local audit store.
    7. Proof-trace rendering on demand.
*   **Sovereign Identity Protocol:** The identity basepoint mechanism. On first boot (`selin init`), it generates an encrypted identity seal from your personal values using CSPRNG + HKDF-SHA256.
*   **Fail-Closed Verification:** If the independent verifier is unavailable or returns unparseable output, the system defaults to **rejection**. Missing verification = failed verification.

---

## 🛡️ ARCHON Governance

The **ARCHON** runtime enforces a bi-cameral governance framework:

1.  **Provisional Risk Gate:** Pre-flight risk classification (safe / risky / severe).
2.  **Independent ADCCL Gate:** Answers are scored by a separate verification pass. Scoring **fails closed** — an unparseable or missing score rejects the output.
3.  **Synthetic Judiciary:** A multi-layered framework decoupling provisional safety from immutable legal ratification.

### The Chiral Invariant

```
χ = √((V² + (1-J)²) / 2) ≥ 1/√2
```

Where **V** = verification score (grounding quality) and **J** = jitter (deviation from expected behavior). The invariant is "chiral" because V and J are asymmetric — swapping them gives a different result, capturing the fact that a well-grounded but erratic answer is qualitatively different from a poorly-grounded but stable one.

---

## 🚀 Quickstart

```bash
# 1. Clone
git clone https://github.com/Mega-Therion/chyren-selin.git
cd chyren-selin

# 2. Build
cargo build --release

# 3. Initialize your sovereign RIYU
./target/release/selin init

# 4. Run a governed task
./target/release/selin run "Explain the chiral invariant."

# 5. View the proof trace
./target/release/selin audit

# 6. (Optional) Start the HTTP server
./target/release/selin serve --port 8080
```

This boots the ARCHON **HTTP server** alongside a local Ollama instance.

### API Example

```bash
curl -X POST http://localhost:8080/govern \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Explain the ADCCL chiral invariant."}'
```

---

## 📊 Governance Pipeline

```
Prompt → Risk Gate → Generate → Independent Verify → χ Computation → Three-Tier Gate → Persist → Audit
```

- **Fail-Closed:** Missing verification = rejection. Always.
- **Independent Verification:** The verifier is a separate model call, injection-resistant.
- **Local-First:** All data stays on your machine. No cloud, no telemetry, no phone-home.

---

## 🔐 Security & Sovereignty

- **At-Rest Encryption:** The Myelin SQLite store is currently plaintext; SQLCipher integration is planned.
- **No Phone-Home:** SELIN never sends your data anywhere. No telemetry, no analytics, no crash reports.
- **Identity Seal:** Your RIYU's identity is cryptographically unique (CSPRNG + HKDF-SHA256). Nobody can impersonate your node.

---

## 📂 Repository Structure

- `cli/`: Command-line interface (init, run, audit, serve).
- `archon_kernel/`: Core Rust logic for ADCCL, risk, and verification.
- `docs/`: Architecture, air gap policy, and quickstart guides.
- `scripts/`: Import guard, CI checks.
- `templates/`: Terms of Sovereignty and Myelin schema templates.
- `Visuals/`: Hero image and diagrams.

---

## 🌐 The Sovereign Mesh

SELIN RIYUs can optionally connect to a decentralized mesh network. On the mesh, RIYUs share **governance verdicts only** — χ scores, pass/fail status, proof status counts. Personal data never crosses the mesh. No prompts, no vectors, no identity seals.

**The mesh shares verdicts. The mesh never shares people.**

---

## 📜 License

Apache 2.0 — free for all, forever.

> **ARCHON Protects. You Govern. SELIN.**

---

## 📖 Documentation

- [System Architecture](docs/SYSTEM_ARCHITECTURE.md) — what ARCHON, SELIN, RIYU, and AEON are
- [Air Gap Policy](docs/AIR_GAP_POLICY.md) — bilateral data isolation contract
- [Quickstart Guide](docs/QUICKSTART.md) — get running in 5 minutes
- [Synthetic Judiciary Spec](docs/SYNTHETIC_JUDICIARY_SPEC.md) — governance framework details
