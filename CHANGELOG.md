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

### Added — HTTP service + async
- **`selin serve`** — a real async (tokio + axum) HTTP governance server:
  `GET /health`, `POST /v1/govern`, `GET /v1/audit/:run_id`. Concurrency is
  capped by a semaphore (sheds load with 503) and each govern call is bounded by
  a timeout. `docker compose up` now runs it, with a `/health` healthcheck and a
  one-shot init container that auto-pulls the default model.
- **Async migration** — the whole request path moved off `reqwest::blocking` to
  async reqwest; the model call gained bounded retry with exponential backoff.
- **Shared pipeline** — `selin run` and the server both call one `govern()` so
  they behave identically.
- **Integration tests** — subprocess tests of the built binary: fail-closed on an
  unreachable endpoint, and CLI surface.

### Security — seal & init hardening
- Seal entropy now comes from the OS CSPRNG with an HKDF-SHA256 key derivation
  (was `SHA256("hostname:timestamp_ns")`, brute-forceable). The random salt is
  stored (v2 basepoint) so the seal verifies; the `directives_hint` plaintext
  leak is removed.
- `init` is `Result`-based (no `.expect` panics) and refuses to silently clobber
  an existing identity — re-init requires `SELIN_FORCE_REINIT=1` (was a silent
  `INSERT OR IGNORE` that kept the old seal).

### Added — tooling
- Self-owned quality gate `scripts/check.sh` (fmt + `clippy -D warnings` +
  test). Run locally or wire as a `pre-push` hook — no CI platform required.
- `.dockerignore`; Dockerfile persists state to the mounted volume via `HOME`;
  removed the dead `SELIN_DATA_DIR` env.
- Honest **Security & Implementation Status** section in the README.

## Roadmap (planned)

Ordered by priority.

1. ~~**At-rest encryption** — SQLCipher for the myelin store.~~ **Done** ✅
2. **Second-verifier / retrieval option** — allow a distinct verifier model or a
   retrieval-augmented fact check for `v_score`, not just a second prompt.
3. **Hardware-anchored keys / TPM** — bind the seal to hardware.
4. Export/backup + migration for the myelin store; multi-model routing/ensemble.

## [1.0.0]
- Initial public release: ADCCL chiral-invariant gate, basepoint seal, CLI
  (`init`/`preflight`/`run`/`audit`), Docker Compose scaffold.
