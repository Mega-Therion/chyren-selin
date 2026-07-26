#!/usr/bin/env bash
# Phase 5 Gate: end-to-end proof verification test
# Tests both happy-path (pass) and forced ChiralViolation (fail) audit traces.
# Must be run AFTER: selin init (with Ollama live)

set -euo pipefail

SELIN="${1:-./target/release/selin}"
MYELIN="$HOME/.selin/myelin.db"

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  PHASE 5 GATE — End-to-End Proof Verification               ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

# Verify selin binary exists
if [ ! -f "$SELIN" ]; then
  echo "[FAIL] Binary not found at $SELIN — run cargo build --release -p selin first"
  exit 1
fi

# Verify myelin store exists
if [ ! -f "$MYELIN" ]; then
  echo "[FAIL] Myelin store not found — run selin init first"
  exit 1
fi

echo "[1/4] Confirming Ollama is live..."
if ! curl -sf http://localhost:11434/api/tags > /dev/null; then
  echo "[FAIL] Ollama not responding at localhost:11434"
  exit 1
fi
echo "      [✓] Ollama live"

echo ""
echo "[2/4] Running a standard governed task (happy path)..."
HAPPY_OUTPUT=$("$SELIN" run "What is 2 + 2? Answer only in JSON." 2>&1)
echo "$HAPPY_OUTPUT"

# Extract run_id from output
HAPPY_RUN_ID=$(echo "$HAPPY_OUTPUT" | grep "Run ID:" | tail -1 | awk '{print $NF}')
if [ -z "$HAPPY_RUN_ID" ]; then
  echo "[FAIL] Could not extract run_id from selin run output"
  exit 1
fi
echo "      [✓] Run ID: $HAPPY_RUN_ID"

echo ""
echo "[3/4] Running selin audit on happy-path run..."
"$SELIN" audit "$HAPPY_RUN_ID"

echo ""
echo "[4/4] Inserting a forced ChiralViolation record and auditing it..."
# Insert a synthetic low-chi record directly to myelin (simulating a rejected run)
FORCE_FAIL_ID=$(python3 -c "import uuid; print(str(uuid.uuid4()))")
FORCE_TIMESTAMP=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
sqlite3 "$MYELIN" "
INSERT INTO adccl_runs (run_id, created_at, prompt_hash, v_score, j_penalty, chi_invariant, passed, rejection_reason, model_endpoint, raw_output_snippet)
VALUES (
  '$FORCE_FAIL_ID',
  '$FORCE_TIMESTAMP',
  'aabbccdd11223344556677889900aabb',
  0.3,
  0.8,
  0.2828,
  0,
  'Chiral Violation: Invariant 0.2828 < threshold 0.7071',
  'http://localhost:11434',
  'Model output suppressed — force-fail test case'
);
"
echo "      [✓] Inserted forced ChiralViolation run: $FORCE_FAIL_ID"
echo ""
"$SELIN" audit "$FORCE_FAIL_ID"

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║  Phase 5 Gate: COMPLETE                                      ║"
echo "║  Both happy-path and ChiralViolation traces verified.        ║"
echo "╚══════════════════════════════════════════════════════════════╝"
