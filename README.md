# Chyren-Archon

**Public open-source RIYU runtime** (SELIN series / ARCHON governor).

> Local-first. Encrypted identity seal. Fail-closed ADCCL. Optional mechanical proofs via MVPC-X.

**GitHub repo name:** `chyren-selin` · **Product name:** Chyren-Archon  
Binary: `selin`

---

## Product triangle

| Product | Repo | For whom |
|---------|------|----------|
| **Chyren-Archon** (this) | [chyren-selin](https://github.com/Mega-Therion/chyren-selin) | Anyone who wants a **sovereign node** |
| **MVPC-X** | [MVPC-X](https://github.com/Mega-Therion/MVPC-X) | Anyone who only wants a **proof/claim tool** |
| **Chyren-Aeon** | private | Owner only — full private OS |

Archon **can** call MVPC locally. MVPC **never** requires Archon.  
See [PRODUCT_TRIANGLE.md](PRODUCT_TRIANGLE.md) · [DEPENDENCIES.md](DEPENDENCIES.md) · [docs/MVPC_INTEGRATION.md](docs/MVPC_INTEGRATION.md).

---

## What you get

- `selin init` — RIYU identity basepoint (CSPRNG / HKDF seal)
- `selin run` / `selin serve` — ADCCL govern (independent verifier, fail-closed χ)
- Three-tier action gate + optional sovereign signoff
- Local myelin run log (SQLCipher-class store where enabled)
- `selin verify-artifact` — **local** MVPC-X for `.lean` / `.v` / `.thy` / claims

**Not a chatbot.** Verification before narration. See onboarding banners and docs.

---

## Quickstart

```bash
git clone https://github.com/Mega-Therion/chyren-selin.git
cd chyren-selin
cargo build --release -p selin
./target/release/selin init
./target/release/selin preflight
./target/release/selin run "Explain ADCCL in one paragraph."
```

### Formal files (optional MVPC-X)

```bash
# install MVPC-X separately
pip install -e /path/to/MVPC-X[all]
export MVPC_BIN=mvpc
./target/release/selin verify-artifact ./path/to/File.lean
```

### HTTP (local-first)

```bash
./target/release/selin serve --bind 127.0.0.1 --port 8080
```

Docker: `docker compose up -d` (binds `0.0.0.0` *inside* the container network).

More: [docs/QUICKSTART.md](docs/QUICKSTART.md) · [docs/LOCAL_SYNC.md](docs/LOCAL_SYNC.md)

---

## Architecture (short)

OmegA-class layers live *inside* the node (not separate installs):

| Concern | Name |
|---------|------|
| Boundary governance | AEGIS-class shell (Rust) |
| Identity / continuity OS | AEON-class runtime concepts |
| Think/speak gate | **ADCCL** + χ |
| Run memory | **Myelin** store |
| Formal artifacts | **MVPC-X** (external binary) |

Canon background: OmegA four-layer papers (archived upstream) + Chyren system canon.

---

## Security & privacy

- [docs/AIR_GAP_POLICY.md](docs/AIR_GAP_POLICY.md) — no personal AEON data in this tree  
- [SECURITY.md](SECURITY.md) · [PRIVACY.md](PRIVACY.md)  
- Prefer `127.0.0.1` for `serve` unless you knowingly expose a node  

---

## License

See [LICENSE](LICENSE) (Apache-2.0 class open distribution).
