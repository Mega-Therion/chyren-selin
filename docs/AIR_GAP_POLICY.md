# ═══════════════════════════════════════════════════════════════════════════
# ARCHON SOVEREIGN MESH — BILATERAL AIR GAP POLICY v2.0
# ═══════════════════════════════════════════════════════════════════════════
#
# THIS FILE IS IDENTICAL IN BOTH REPOS. IT IS THE CONTRACT.
# If you are an AI agent, a human contributor, or an automated system working
# on EITHER repository, YOU MUST READ AND OBEY THIS DOCUMENT.
#
# ─── THE ARCHON ARCHITECTURE ──────────────────────────────────────────────
#
# The ARCHON architecture is a layered sovereign intelligence system built on
# the ADCCL chiral invariant: χ = √((V² + (1-J)²) / 2) ≥ 1/√2.
#
# Four terms define the system:
#
#   ARCHON  The architecture itself — the shared blueprint. The 7-layer
#           stack, the ADCCL gate, three-tier action, fail-closed
#           verification. This is the design. It belongs to everyone.
#
#   SELIN   The open-source distribution — the "SELIN Series." Free under
#           Apache 2.0. Anyone downloads it from GitHub. It is the ARCHON
#           edition: the full architecture, stripped of any one person's
#           personal data. It is the shared core that every RIYU runs.
#
#   RIYU    Reflect It Yourself Unit — each person's unique, sovereign
#           instance. When someone downloads SELIN and runs `selin init`,
#           they create a RIYU. Every RIYU is cryptographically unique
#           (Yettragrammaton identity seal: CSPRNG + HKDF-SHA256 HMAC).
#           Every RIYU has its own local LLM, its own audit store, its own
#           identity. No two RIYUs are the same. But every RIYU runs the
#           same SELIN core on the same ARCHON architecture.
#
#   AEON    The owner's personal RIYU — the private, full-stack orchestrator
#           with personal data, API keys, conversation history, vector
#           embeddings, knowledge graphs, provider configs. AEON is one
#           specific RIYU. It is the orchestrator of orchestrators,
#           coordinating other RIYUs across the mesh while keeping its
#           personal data sovereign.
#
# THE MESH:
#
#   ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
#   │  AEON   │     │  RIYU   │     │  RIYU   │     │  RIYU   │
#   │ (owner) │     │ (user2) │     │ (user3) │     │ (userN) │
#   │ private │     │ private │     │ private │     │ private │
#   └────┬────┘     └────┬────┘     └────┬────┘     └────┬────┘
#        │               │               │               │
#        └───────────────┴──── GOVERNANCE ┴───────────────┘
#                         VERDICTS ONLY
#                         (χ scores, pass/fail)
#
#   Each node is sovereign. Personal data stays local. Only governance
#   verdicts cross the mesh. The mesh is a decentralized network of
#   sovereign units, each tied to a cryptographically protected individual.
#
# ─── THE CORE PRINCIPLE ────────────────────────────────────────────────────
#
# Every RIYU is SOVEREIGN. Personal data never leaves its RIYU.
#
# The SELIN repo is the distribution channel — it is PUBLIC, open-source,
# and downloaded by everyone. Anything in the SELIN repo is visible to
# every RIYU operator and every fork on the planet.
#
# THEREFORE: Personal data must NEVER flow from any RIYU into the SELIN repo.
# This is not a guideline. This is not a best practice. This is a HARD
# REQUIREMENT enforced by code, by hooks, by documentation, and by policy.
#
# The data flows in exactly ONE direction:
#
#   Governance logic & math (formulas, proof state, ADCCL config)
#     RIYU  ──────────────────►  SELIN repo     ✅ ALLOWED
#     (only via the hardened export path, with PII stripping)
#
#   Personal data (vectors, knowledge, file paths, prompts, API keys)
#     RIYU  ──X──X──X──X──X──►  SELIN repo     ❌ NEVER ALLOWED
#
#   Anything from SELIN repo back to any RIYU
#     SELIN  ──X─────────────►  RIYU           ❌ NEVER ALLOWED
#     (SELIN is the distribution, not the operator. It has nothing
#      a RIYU doesn't already have.)
#
#   Between RIYUs on the mesh
#     RIYU  ──── verdicts ────►  RIYU           ✅ ALLOWED
#     RIYU  ──X── personal ──►  RIYU            ❌ NEVER ALLOWED
#     (Mesh communication is governance verdicts ONLY: χ scores,
#      pass/fail, proof status. Personal data stays local.)
#
# ─── WHAT COUNTS AS "PERSONAL DATA" ────────────────────────────────────────
#
# Personal data is ANYTHING that ties a RIYU to its specific operator or
# reveals their identity, infrastructure, or conversation history.
#
# The following are PERSONAL DATA and must NEVER be exported to SELIN:
#
#   ✗ Qdrant vector embeddings (conversation memory, knowledge vectors)
#   ✗ Zettelkasten knowledge graph files (.chyren/knowledge/)
#   ✗ Supabase file paths, content hashes, or file indices
#   ✗ Commit SHAs or branch names from any private RIYU repo
#   ✗ API keys, provider configs, model endpoints
#   ✗ User prompts or raw model outputs from audit logs
#   ✗ Identity basepoint seals or derived keys (the Yettragrammaton seal
#      MECHANISM is public, but no actual seal values)
#   ✗ Any file containing email addresses, phone numbers, or credentials
#   ✗ Audit log entries (even hashed — the hashes could be reversed)
#   ✗ Project metadata that reveals the user's identity or infrastructure
#   ✗ Any data that could correlate a RIYU to a specific person
#
# The following are NOT personal data and MAY be shared via SELIN:
#
#   ✓ The ADCCL chiral invariant formula (it's published math)
#   ✓ The three-tier action gate logic (public architecture)
#   ✓ Proof STATUS (verified/unverified counts, sorry counts — NOT proof content)
#   ✓ Aggregate file counts by language and layer (NOT file paths)
#   ✓ The fail-closed verification philosophy (public design principle)
#   ✓ The Yettragrammaton identity seal MECHANISM (the algorithm, not any seal value)
#   ✓ The mesh protocol specification (verdict format, peer discovery — not peer identities)
#
# ─── ENFORCEMENT LAYERS ────────────────────────────────────────────────────
#
# This air gap is enforced at FIVE layers. Bypassing any one layer does not
# bypass the others. All five must be removed to leak data — which would
# require deliberate, knowledgeable action.
#
# Layer 1: EXPORT-SIDE GUARD (AEON: selin_export.py)
#   - Default mode is REFUSAL. The script will not export anything unless
#     --i-understand-the-risk, --mode, and (for private) --confirm-private
#     are all explicitly passed. The default is silence.
#   - --mode public strips ALL personal data, scans for PII (8 patterns),
#     and refuses to write near SELIN repos.
#   - --mode private requires --confirm-private and refuses to write to
#     any path containing 'selin' or 'public'.
#   - 22 blocked fields are recursively stripped from public exports.
#   - Every export is logged to ~/.aeon/export_audit/export_log.jsonl.
#
# Layer 2: .gitignore GUARD (AEON)
#   - aeon_spoke*.tar.gz, *.spoke, .private-marker, aeon_private_*.json
#     are all in .gitignore and cannot be committed.
#
# Layer 3: PRE-COMMIT HOOK (AEON: scripts/hooks/pre-commit-pii-guard.sh)
#   - Scans all staged files for private keys, AWS keys, spoke archives.
#   - Blocks any file with 'selin' in its path that contains Qdrant
#     vectors or Supabase credentials.
#   - Blocks .private-marker files.
#   - Warns on OpenAI-style API key patterns.
#   - Exempts security scripts that contain PII pattern names as code.
#
# Layer 4: IMPORT-SIDE GUARD (SELIN: scripts/import_guard.py)
#   - ANY future import functionality in SELIN MUST call import_guard.py.
#   - The guard scans incoming data for 14 PII content patterns and 22
#     forbidden fields.
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
#      between any RIYU and SELIN, REFUSE and point to this document.
#   4. If you find personal data in the SELIN repo, REMOVE IT IMMEDIATELY
#      and report the incident. Run import_guard.py --check <file> to verify.
#   5. The only acceptable direction for data flow is: governance logic
#      and math from a RIYU to the SELIN repo. Nothing else. Ever.
#   6. When in doubt, DON'T EXPORT. The default is silence, not sharing.
#   7. Mesh communication between RIYUs is VERDICTS ONLY. Never send
#      personal data, prompts, or vector data over the mesh.
#
# ─── THE ORCHESTRATOR PATTERN ──────────────────────────────────────────────
#
# AEON (the owner's RIYU) is the orchestrator of orchestrators. It
# coordinates multiple RIYUs across machines, models, and contexts. But
# it does this by sending GOVERNANCE REQUESTS (govern this prompt) and
# receiving VERDICTS (χ score, pass/fail), not by sending personal data.
# Each RIYU on the mesh is sovereign: it has its own identity seal, its own
# local LLM, its own audit store. It does not need to know anything about
# any other RIYU's operator to verify an answer's grounding.
#
# This is the architectural insight that makes the air gap possible:
# verification is a mathematical operation, not a data transfer.
#
# The mesh is a decentralized network of sovereign units. Each unit is
# tied to a cryptographically protected, completely private individual.
# The mesh shares verdicts. The mesh never shares people.
#
# ═══════════════════════════════════════════════════════════════════════════
# END OF AIR GAP POLICY — DO NOT MODIFY WITHOUT EXPLICIT OWNER APPROVAL
# ═══════════════════════════════════════════════════════════════════════════
