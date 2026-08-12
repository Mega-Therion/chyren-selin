# Changelog

All notable changes to ARCHON / SELIN.

---

## [Unreleased] — MVPC-X local bridge

### Added
- **`docs/MVPC_INTEGRATION.md`** — contract: SELIN governs generation; MVPC-X audits formal artifacts; local subprocess only; no personal Chyren; no vendor cloud notary.
- **`selin verify-artifact <path>`** — spawns local `mvpc` (`MVPC_BIN`), `--policy`, `--json`, optional `--run-id` correlation sidecar under `~/.selin/mvpc_witnesses`.
- **`serve --bind`** — default **127.0.0.1** (local-first); Docker CMD uses `0.0.0.0` explicitly.
- **`.gitignore`** — ignore `node_modules/`, local RIYU state, venvs.

### Notes
- χ and MVPC attestation languages are **not** collapsed; both may be stored/correlated.
- Personal AEON/Chyren remains out of band (see AIR_GAP_POLICY).

---

## Prior

See git history for axum server, ADCCL fail-closed verifier, SQLCipher, air-gap policy, and universalize renames.
