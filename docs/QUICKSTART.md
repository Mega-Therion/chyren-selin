# Chyren SELIN Series — QUICKSTART

## What is SELIN?

**SELIN** (Sovereign Encrypted Localized Identity Nestor) is an open-source ARCHON runtime.  
It governs AI model responses through the **ADCCL** (Anti-Drift Cognitive Control Loop),  
rejecting outputs that fall below the chiral floor `χ ≥ 1/√2 ≈ 0.7071`.

**This is not a chatbot.** It is a governance engine.

---

## Requirements

- Rust 1.79+ (`curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh`)
- Docker + Docker Compose (for the full stack)
- SQLite 3 (bundled in the binary via rusqlite — no install needed)

---

## Option A: Local Binary (Direct)

```bash
# Clone and build
git clone https://github.com/Mega-Therion/chyren-selin.git
cd chyren-selin
cargo build --release -p selin

# Initialize (4-step interactive wizard)
./target/release/selin init

# Verify your model endpoint
./target/release/selin preflight

# Run a governed task
./target/release/selin run "What is the speed of light?"

# Audit a specific run (replace <run_id> with what `run` printed)
./target/release/selin audit <run_id>
```

---

## Option B: Docker Stack (Recommended)

Single command — brings up Ollama + ARCHON node:

```bash
git clone https://github.com/Mega-Therion/chyren-selin.git
cd chyren-selin
docker compose up
```

This starts:
- `local-llm` (Ollama on port 11434) — your local model server
- `selin-archon` (ARCHON node on port 8080) — the governance engine

Pull a model once (inside the running container):
```bash
docker exec selin-local-llm ollama pull deepseek-r1:1.5b
```

Then on your host:
```bash
export MODEL_ENDPOINT=http://localhost:11434
./target/release/selin init   # or cargo run -p selin -- init
```

---

## The ADCCL Gate

Every response is evaluated:

```
χ = √[(V² + (1-J)²) / 2]
```

Where:
- **V** = verifiability score (0.0–1.0): how factually grounded is this output?
- **J** = drift/hallucination penalty (0.0–1.0): how likely is this a confabulation?
- **χ** must be ≥ **0.7071** (1/√2) to pass

Outputs below the floor are **rejected and suppressed**. Run `selin audit <run_id>` to see the exact computation for any run.

---

## Environment Variables

| Variable | Default | Description |
|---|---|---|
| `MODEL_ENDPOINT` | `http://localhost:11434` | Ollama or OpenAI-compatible endpoint |
| `ADCCL_THRESHOLD` | `0.7071` | Chiral floor (do not lower below 1/√2) |
| `HOME` | (system) | SELIN data stored in `$HOME/.selin/` |
