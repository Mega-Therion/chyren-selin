# Dependencies — Chyren-Archon

## Required to build Archon

| Dep | Notes |
|-----|--------|
| Rust stable (see `rust-toolchain` / CI) | `cargo build -p selin` |
| Optional: local LLM endpoint | Ollama or OpenAI-compatible for `selin run` / `serve` |

## Optional — formal / claim files

| Dep | Notes |
|-----|--------|
| **MVPC-X** `>= 7.3.0` | Standalone install; not bundled |
| `MVPC_BIN` | Default `mvpc` on PATH |

```bash
# separate clone — do not vendor MVPC source into this repo
git clone https://github.com/Mega-Therion/MVPC-X.git
cd MVPC-X && pip install -e ".[all]"
export MVPC_BIN=mvpc
selin verify-artifact ./some/File.lean
```

## Must not depend on

- `chyren-aeon` (private)
- Owner personal identity / myelin from AEON
- Network “notary” for verification

## Env vars

| Var | Role |
|-----|------|
| `MODEL_ENDPOINT` | LLM for generative govern |
| `MVPC_BIN` | Path to MVPC-X CLI |
| `SELIN_REQUIRE_MVPC` | If set, treat missing/failing MVPC as hard failure where wired |
| `SELIN_SOVEREIGN_SIGNOFF` | Tier-3 accountability phrase |
| `SELIN_FORCE_REINIT` | Allow identity re-init |
