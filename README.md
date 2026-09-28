# Chyren SELIN

<p align="left">
  <a href="https://huggingface.co/datasets/ChyRho/chyren-selin"><img src="https://img.shields.io/badge/Hugging%20Face-ChyRho%2Fchyren--selin-FFD21E?style=flat-square&logo=huggingface&logoColor=black" alt="Hugging Face Dataset"></a>
  <a href="https://orcid.org/0009-0001-1303-7190"><img src="https://img.shields.io/badge/ORCID-0009--0001--1303--7190-A6CE39?style=flat-square&logo=orcid&logoColor=white" alt="ORCID"></a>
  <a href="https://resnova-hub-f4ucvy3e.manus.space"><img src="https://img.shields.io/badge/Research%20Atlas-resnova--hub-0070f3?style=flat-square&logo=safari&logoColor=white" alt="Research Atlas"></a>
  <a href="https://www.linkedin.com/in/r-w-yett/"><img src="https://img.shields.io/badge/LinkedIn-R.W._Yett-0A66C2?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn"></a>
  <a href="https://x.com/_chyrho_"><img src="https://img.shields.io/badge/X-@__ChyRho__-000000?style=flat-square&logo=x&logoColor=white" alt="X"></a>
</p>

Sovereign AI Governance Node & ARCHON Runtime — Local-first, encrypted, fail-closed mathematical verification.

![SELIN Local-First Governance Boundary](docs/visuals/selin-local-governance.svg)

## System Role & Mission

`chyren-selin` is the open, distributable incarnation of the Chyren sovereign intelligence stack. Where `chyren-aeon` is the private unified core, SELIN is designed for self-hosted sovereign deployment: running local-first on user hardware with zero telemetry, encrypted-at-rest state, and fail-closed capability gates.

## Core Architectural Invariants

- **Local Sovereign Boundary**: All personal memory, cryptographic keys, and raw conversation history reside exclusively on local SQLite/encrypted storage.
- **Fail-Closed Execution**: If an external connector, model, or policy evaluator is unreachable or degraded, SELIN fails closed: actions are refused rather than executed without oversight.
- **Strict Connector Capabilities**: External tools operate under fixed capability envelopes (`read_only`, `draft_only`, `write_bounded`). External writes always require local policy approval and an immutable receipt.

## Architecture

```
Operator Intent ──► ARCHON Runtime ──► Local Policy Evaluator ──► Bounded Connector ──► Action Receipt
                          │                       │
                          ▼                       ▼
                   Encrypted State        Local Receipt Ledger
                   (SQLite / SQLCipher)    (Replay & Audit)
```

## Toolchain & Services

- **Rust Core**: Native ARCHON kernel and cryptographic primitives in `archon_kernel/` (`Cargo.toml`).
- **Node / Runtime CLI**: Local orchestration bridge and CLI tooling (`package.json`).
- **Self-Hosting**: Deployable via root `Dockerfile` and `docker-compose.yml`.

## Verification & Local Run

```bash
# Verify Rust ARCHON kernel
cargo test --locked

# Verify local Node services
npm test
```
