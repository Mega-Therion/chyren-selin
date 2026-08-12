# SELIN Quickstart

## 1. Pull latest

```bash
git clone https://github.com/Mega-Therion/chyren-selin.git
cd chyren-selin
# or: git pull origin main
```

See [LOCAL_SYNC.md](./LOCAL_SYNC.md) for dual-repo (SELIN + MVPC-X) sync.

## 2. Build CLI

```bash
cargo build --release -p selin
export SELIN=./target/release/selin
```

## 3. Init RIYU (once)

```bash
$SELIN init
```

## 4. Model preflight

```bash
# Ollama example
export MODEL_ENDPOINT=http://127.0.0.1:11434
$SELIN preflight
```

## 5. Govern a prompt (generative / χ)

```bash
$SELIN run "Explain the ADCCL chiral invariant in one paragraph."
```

## 6. Formal / claim artifacts (mechanical — local MVPC-X)

```bash
# Install MVPC-X separately on this machine first
export MVPC_BIN=mvpc
$SELIN verify-artifact ./path/to/File.lean
$SELIN verify-artifact ./path/to/claims.py --policy strict --json
```

Full contract: [MVPC_INTEGRATION.md](./MVPC_INTEGRATION.md).

## 7. HTTP (local-first)

```bash
$SELIN serve --bind 127.0.0.1 --port 8080
curl -s localhost:8080/health
```

Docker: `docker compose up -d` binds `0.0.0.0:8080` inside the container network only as published.

## 8. Audit a run

```bash
$SELIN audit <run_id>
```
