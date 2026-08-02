#!/usr/bin/env bash
# Self-owned quality gate — no CI platform required. Runs the same three checks
# a CI would: formatting, lints (deny warnings), and tests. Run before pushing:
#
#   ./scripts/check.sh
#
# Optionally wire it as a pre-push hook:
#   ln -sf ../../scripts/check.sh .git/hooks/pre-push
set -euo pipefail
cd "$(dirname "$0")/.."

echo "▸ cargo fmt --all -- --check"
cargo fmt --all -- --check

echo "▸ cargo clippy --workspace --all-targets -- -D warnings"
cargo clippy --workspace --all-targets -- -D warnings

echo "▸ cargo test --workspace"
cargo test --workspace

echo "✓ all checks passed"
