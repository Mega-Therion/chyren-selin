# Local sync (pull / build / verify)

GitHub is already updated. On **your** machine:

## chyren-selin

```bash
cd /path/to/chyren-selin   # or: git clone https://github.com/Mega-Therion/chyren-selin.git
git checkout main
git pull origin main

cargo build --release -p selin
./target/release/selin --help
# should list: init, preflight, run, audit, serve, verify-artifact
```

## MVPC-X (same machine, local only)

```bash
cd /path/to/MVPC-X
git checkout main
git pull origin main
python3 -m venv .venv && source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -e ".[all]"
mvpc --help
export MVPC_BIN=mvpc   # or full path to the script
```

## Smoke both

```bash
mvpc integrity --verify-twice
selin verify-artifact /path/to/MVPC-X/tests/fixtures/sorry.lean --policy default
# expect mechanical REJECTED / non-zero under ci-mode semantics
```

## Docker

```bash
cd chyren-selin
docker compose up -d --build
curl -s localhost:8080/health
```

Formal files still need MVPC **on the host** (or a custom image that installs `mvpc`); compose does not bundle MVPC-X by default.

## If pull conflicts

```bash
git status
git stash -u          # if you have local edits you want to keep
git pull origin main
git stash pop         # resolve if needed
```

Never force-push `main` unless you intend to rewrite public history.
