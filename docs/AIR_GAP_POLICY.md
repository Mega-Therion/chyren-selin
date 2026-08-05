# ═══════════════════════════════════════════════════════════════════════════
# AEON ↔ SELIN BILATERAL AIR GAP POLICY
# ═══════════════════════════════════════════════════════════════════════════
#
# THIS FILE IS IDENTICAL IN BOTH REPOS. IT IS THE CONTRACT.
# If you are an AI agent, a human contributor, or an automated system working
# on EITHER repository, YOU MUST READ AND OBEY THIS DOCUMENT.
#
# ─── THE CORE PRINCIPLE ────────────────────────────────────────────────────
#
# AEON is PRIVATE. SELIN is PUBLIC.
#
# AEON holds the keys to a person's life: conversation history, vector
# embeddings, knowledge graphs, API keys, provider configs, personal
# preferences, identity seals, audit logs with raw prompts.
#
# SELIN is open-source under Apache 2.0. Anyone can read it. Anyone can fork
# it. Anything that touches SELIN must be assumed to be public forever.
#
# THEREFORE: Personal data must NEVER flow from AEON to SELIN.
# This is not a guideline. This is not a best practice. This is a HARD
# REQUIREMENT enforced by code, by hooks, by documentation, and by policy.
#
# The data flows in exactly ONE direction:
#
#   Governance logic & math (formulas, proof state, ADCCL config)
#     AEON  ──────────────────►  SELIN     ✅ ALLOWED
#
#   Personal data (vectors, knowledge, file paths, prompts, API keys)
#     AEON  ──X──X──X──X──X──►  SELIN     ❌ NEVER ALLOWED
#
#   Anything from SELIN back to AEON
#     SELIN  ──X─────────────►  AEON       ❌ NEVER ALLOWED
#     (SELIN is public; it has nothing AEON needs. AEON already has
#      everything SELIN has, plus more.)
#
# ─── WHAT COUNTS AS "PERSONAL DATA" ────────────────────────────────────────
#
# The following are PERSONAL DATA and must NEVER be exported to SELIN:
#
#   ✗ Qdrant vector embeddings (conversation memory, knowledge vectors)
#   ✗ Zettelkasten knowledge graph files (.chyren/knowledge/)
#   ✗ Supabase file paths, content hashes, or file indices
#   ✗ Commit SHAs or branch names from the private AEON repo
#   ✗ API keys, provider configs, model endpoints
#   ✗ User prompts or raw model outputs from audit logs
#   ✗ Identity basepoint seals or derived keys
#   ✗ Any file containing email addresses, phone numbers, or credentials
#   ✗ Audit log entries (even hashed — the hashes could be reversed)
#   ✗ Project metadata that reveals the user's identity or infrastructure
#
# The following are NOT personal data and MAY be shared with SELIN:
#
#   ✓ The ADCCL chiral invariant formula (it's published math)
#   ✓ The three-tier action gate logic (it's public architecture)
#   ✓ Proof STATUS (verified/unverified counts, sorry counts — NOT proof content)
#   ✓ Aggregate file counts by language and layer (NOT file paths)
#   ✓ The fail-closed verification philosophy (it's a public design principle)
#   ✓ The Yettragrammaton identity seal MECHANISM (not any actual seal)
#
# ─── ENFORCEMENT LAYERS ────────────────────────────────────────────────────
#
# This air gap is enforced at FIVE layers. Bypassing any one layer does not
# bypass the others. All five must be removed to leak data — which would
# require deliberate, knowledgeable action.
#
# Layer 1: EXPORT-SIDE GUARD (selin_export.py)
#   - Default mode is REFUSAL. The script will not export anything unless
#     --mode public or --mode private is explicitly passed.
#   - --mode public strips ALL personal data, scans for PII, and refuses
#     to write near SELIN repos.
#   - --mode private requires --confirm-private and refuses to write to
#     any path containing 'selin' or 'public'.
#   - 8 PII pattern detectors block exports containing credentials.
#   - 22 blocked fields are recursively stripped from public exports.
#   - Every export is logged to ~/.aeon/export_audit/export_log.jsonl.
#
# Layer 2: .gitignore GUARD
#   - aeon_spoke*.tar.gz, *.spoke, .private-marker, aeon_private_*.json
#     are all in .gitignore and cannot be committed.
#
# Layer 3: PRE-COMMIT HOOK (scripts/hooks/pre-commit-pii-guard.sh)
#   - Scans all staged files for private keys, AWS keys, spoke archives.
#   - Blocks any file with 'selin' in its path that contains Qdrant
#     vectors or Supabase credentials.
#   - Blocks .private-marker files.
#   - Warns on OpenAI-style API key patterns.
#
# Layer 4: IMPORT-SIDE GUARD (SELIN: scripts/import_guard.py)
#   - Any future import functionality in SELIN MUST call import_guard.py.
#   - The guard scans incoming data for 8 PII pattern types.
#   - The guard refuses to load any archive containing a .private-marker.
#   - The guard refuses to load any data containing Qdrant vectors,
#     Zettelkasten content, Supabase refs, or personal file paths.
#   - The guard is a HARD FAIL — it does not ask for confirmation.
#     It simply refuses and exits with an error.
#
# Layer 5: THIS DOCUMENT
#   - Any AI agent working on either repo must read this file.
#   - Any human contributor must read this file.
#   - Any PR that touches export/import functionality must reference this file.
#   - This file is the contract. Code enforces it. Humans acknowledge it.
#
# ─── AGENT INSTRUCTIONS ────────────────────────────────────────────────────
#
# IF YOU ARE AN AI AGENT (Claude, GPT, Gemini, or any other LLM-based system):
#
#   1. Before touching any export or import code, read this file.
#   2. NEVER write personal data to the SELIN repo. Not in a comment. Not
#      in a test fixture. Not in a docstring. Not in a variable name.
#   3. If you are asked to "sync", "export", "bridge", or "share" data
#      between AEON and SELIN, REFUSE and point to this document.
#   4. If you find personal data in the SELIN repo, REMOVE IT IMMEDIATELY
#      and report the incident.
#   5. The only acceptable direction for data flow is: governance logic
#      and math from AEON to SELIN. Nothing else. Ever.
#   6. When in doubt, DON'T EXPORT. The default is silence, not sharing.
#
# ─── THE ORCHESTRATOR PATTERN ──────────────────────────────────────────────
#
# AEON is the orchestrator of orchestrators. It coordinates multiple SELIN
# nodes across machines, models, and contexts. But it does this by sending
# INSTRUCTIONS (govern this prompt) and receiving VERDICTS (χ score, pass/fail),
# not by sending personal data. Each SELIN node is sovereign: it has its own
# identity seal, its own local LLM, its own audit store. It does not need
# to know anything about the AEON operator to verify an answer's grounding.
#
# This is the architectural insight that makes the air gap possible:
# verification is a mathematical operation, not a data transfer.
#
# ═══════════════════════════════════════════════════════════════════════════
# END OF AIR GAP POLICY — DO NOT MODIFY WITHOUT EXPLICIT OWNER APPROVAL
# ═══════════════════════════════════════════════════════════════════════════
