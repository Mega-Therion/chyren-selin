# Changelog

All notable changes to ARCHON / SELIN. Format loosely follows
[Keep a Changelog](https://keepachangelog.com/); versions are semver.

## [Unreleased]

### Fixed — the gate now actually verifies
- **ADCCL is no longer self-assessment.** Answers are scored by a separate,
  independent verification pass; the model no longer grades its own homework.
- **Fail-closed.** Unparseable / missing / out-of-range / empty / failed
  verification all reject (`χ(0.5,0.5) < 1/√2`). The old always-passing
  `(0.8, 0.2)` default is gone.
- **Prompt-injection resistance.** User input is no longer interpolated into the
  scoring instruction; question/answer are fenced as untrusted data.
- **Three-tier action gate wired in** (was dead code): risk classification gates
  execution; severe intent requires `SELIN_SOVEREIGN_SIGNOFF`.
- `provider.rs`: fence regex compiled once (`OnceLock`), not per call.
- Audit log stores 2000 chars of output (was 200).

### Added
- Self-owned quality gate `scripts/check.sh` (fmt + `clippy -D warnings` +
  test). Run locally or wire as a `pre-push` hook — no CI platform required.
- `.dockerignore`; Dockerfile persists state to the mounted volume via `HOME`;
  removed the dead `SELIN_DATA_DIR` env.
- Honest **Security & Implementation Status** section in the README.

## Roadmap (planned)

Ordered by priority.

1. **axum HTTP server** — `/health`, `POST /v1/govern`, `GET /v1/audit/:id`, so
   `docker compose up` serves a real API instead of running `preflight` once.
2. **At-rest encryption** — SQLCipher for the myelin store, so "Encrypted" is
   true rather than aspirational.
3. **tokio async** — replace `reqwest::blocking` for concurrent request handling.
4. **Entropy/KDF hardening** — CSPRNG + HKDF/Argon2 for the identity seal;
   remove the `hostname:timestamp` derivation and the `directives_hint` leak.
5. **Robust init** — `Result`-based error handling (no `.expect` panics);
   re-init updates or warns instead of silently keeping the old seal.
6. **Second-verifier / retrieval option** — allow a distinct verifier model or a
   retrieval-augmented fact check for `v_score`, not just a second prompt.
7. Docker healthcheck + model auto-pull; integration tests; export/backup for the
   myelin store.

## [1.0.0]
- Initial public release: ADCCL chiral-invariant gate, basepoint seal, CLI
  (`init`/`preflight`/`run`/`audit`), Docker Compose scaffold.
