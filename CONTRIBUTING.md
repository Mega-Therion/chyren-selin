# Contributing to Archon Selin

Thank you for helping build and refine Archon Selin!

## Development Guidelines

1. **Rust Toolchain**:
   - Minimum Supported Rust Version (MSRV): `1.75+` (Edition 2021).
   - Standard formatting is strictly enforced (`cargo fmt --all -- --check`).
   - Zero Clippy warnings allowed (`cargo clippy --workspace --all-targets -- -D warnings`).

2. **Testing Expectations**:
   - Every bug fix or feature must include automated tests in `tests/` or unit tests alongside the module.
   - Run the full suite before submitting PRs:
     ```bash
     cargo test --workspace
     ```

3. **Commit Standards**:
   - Follow Conventional Commits format:
     - `feat(archon): ...`
     - `fix(sec): ...`
     - `docs: ...`
     - `test: ...`
