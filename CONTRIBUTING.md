# Contributing to SELIN

Thank you for your interest in contributing to SELIN - a sovereign, local-first AI governance node built on the ARCHON architecture.

## Prerequisites

- Rust 1.83 or later (install via [rustup](https://rustup.rs))
- A local [Ollama](https://ollama.ai) instance for integration testing
- Git

## Getting Started

```bash
git clone https://github.com/Mega-Therion/chyren-selin.git
cd chyren-selin
cargo build --release

# Initialize your sovereign RIYU
./target/release/selin init

# Run a governed task (requires Ollama running on localhost:11434)
./target/release/selin run "What is 2 + 2?"
```

## Development Workflow

### Before You Push

Run the quality gate - this is exactly what CI runs:

```bash
./scripts/check.sh
```

This runs three checks:
1. `cargo fmt --all -- --check` - formatting must be clean
2. `cargo clippy --workspace --all-targets -- -D warnings` - zero warnings
3. `cargo test --workspace` - all tests must pass

If any check fails, fix it before pushing. CI will run the same checks and will block your PR.

### Pre-push Hook (Optional)

To automatically run checks before each push:

```bash
ln -sf ../../scripts/check.sh .git/hooks/pre-push
```

### Phase 5 Gate (Integration Test)

For end-to-end verification with a live Ollama instance:

```bash
# Start Ollama first
ollama serve &
ollama pull deepseek-r1:1.5b

# Run the phase 5 gate
./scripts/phase5_gate.sh ./target/release/selin
```

This tests both happy-path (passing) and forced ChiralViolation (failing) audit traces.

## Code Standards

### Rust Style

- Follow `rustfmt` defaults. No custom formatting configuration.
- Zero clippy warnings. If clippy suggests a change, make it.
- No `unwrap()` or `expect()` in production code paths - use proper error handling.
- No `TODO`, `FIXME`, or `HACK` comments in merged code. Track issues properly.

### Architecture Constraints

SELIN is the open-source distribution of the ARCHON architecture. It must remain:

- **Standalone:** No external service dependencies (no Supabase, no Qdrant, no cloud APIs)
- **Local-First:** All data stays on the user's machine
- **Pure Rust:** No Go, Elixir, C, Lean, Python, or TypeScript in this repo
- **Security-First:** Fail-closed by default. When in doubt, reject.

### The Air Gap

SELIN shares documentation with the private `chyren-aeon` repository. **Personal data must never flow from any RIYU to the SELIN repo.** Before touching any export, import, or data-transfer code:

1. Read [docs/AIR_GAP_POLICY.md](docs/AIR_GAP_POLICY.md) in full.
2. Confirm your change only transfers governance logic and math - never personal data.
3. When in doubt, do not transfer. The default is silence.

### Naming Convention

SELIN is for everyone. All naming must be universal, non-denominational, and technical:

- Use "Sovereign Identity Protocol" - not personal or religious naming
- Use "SELIN" - not personal prefixes
- Use "Node" - not Greek mythology references
- No personal names, no religious wordplay, no cheeky acronyms
- No attribution to specific AI models or their nicknames

## Pull Request Process

1. **Fork** the repository and create your branch from `main`
2. **Run** `./scripts/check.sh` and ensure all checks pass
3. **Write** a clear PR description explaining what changed and why
4. **Reference** any relevant issues
5. **Keep PRs focused** - one feature or fix per PR is ideal

### PR Review Criteria

- All CI checks pass (fmt, clippy, test)
- No personal data in any file (the import guard will check this)
- No personal/symbolic naming (see Naming Convention above)
- Architecture constraints are maintained (standalone, local-first, pure Rust)
- Fail-closed verification is preserved
- Documentation is updated if behavior changes

## Reporting Issues

- **Bugs:** Open a GitHub issue with reproduction steps and expected vs actual behavior
- **Security:** Do NOT open a public issue. See [SECURITY.md](SECURITY.md)
- **Feature Requests:** Open a GitHub issue with the `enhancement` label and describe the use case

## License

By contributing to SELIN, you agree that your contributions will be licensed under the Apache 2.0 license.
