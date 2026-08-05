# ARCHON SYSTEM ARCHITECTURE — DEFINITIVE REFERENCE
# ═══════════════════════════════════════════════════════════════════════════
#
# This document defines the ARCHON sovereign mesh system top to bottom.
# It exists in BOTH the chyren-aeon and chyren-selin repositories.
# It is the single source of truth for what each component is, why it
# exists, and who it is for.
#
# If you are an AI agent, read this BEFORE working on either repo.
# If you are a human contributor, read this BEFORE submitting a PR.
# If you are not sure which system you are working on, read this FIRST.
#
# DO NOT CONFLATE THESE SYSTEMS. They share DNA but serve different
# purposes for different audiences. The distinctions below are not
# stylistic — they are architectural and security-critical.
#
# ═══════════════════════════════════════════════════════════════════════════
# 1. THE FOUR TERMS
# ═══════════════════════════════════════════════════════════════════════════
#
# ┌───────────────────────────────────────────────────────────────────────────┐
# │ TERM    │ WHAT IT IS              │ WHO IT'S FOR    │ VISIBILITY  │
# │─────────┼─────────────────────────┼─────────────────┼────────────│
# │ ARCHON  │ The architecture itself │ Everyone        │ Public     │
# │ SELIN   │ The open-source distro  │ Anyone who DLs  │ Public     │
# │ RIYU    │ A person's unique node  │ The individual   │ Private    │
# │ AEON    │ The owner's personal    │ The Owner     │ Private   │
# │         │ RIYU (full-stack)       │                 │            │
# └───────────────────────────────────────────────────────────────────────────┘
#
# These four terms are NOT interchangeable. Getting them wrong leads
# to security incidents. Here is what each one is, precisely.
#
# ═══════════════════════════════════════════════════════════════════════════
# 2. ARCHON — THE ARCHITECTURE
# ═══════════════════════════════════════════════════════════════════════════
#
# What:
#   ARCHON is the blueprint. It is the 7-layer polyglot stack, the ADCCL
#   chiral invariant, the three-tier action gate, the fail-closed
#   verification philosophy, the Sovereign Identity Protocol mechanism,
#   and the mesh protocol specification. It is the design from which both
#   AEON and SELIN are built.
#
# Why:
#   AI outputs cannot be trusted by default. Hallucinations, prompt
#   injection, and ungrounded claims are inherent to LLM systems. ARCHON
#   solves this by treating every AI output as unverified until proven
#   grounded through mathematical verification. The ADCCL chiral
#   invariant provides a single, computable score (χ) that represents
#   how well an output is grounded. If χ < 1/√2, the output is rejected.
#   No exceptions. This is fail-closed: when verification is missing or
#   unparseable, the system defaults to rejection.
#
#   ARCHON exists because governance of AI should be mathematical, not
#   trust-based. You should not have to believe that an AI is behaving.
#   You should be able to prove it.
#
# Who it's for:
#   Everyone. ARCHON is the shared blueprint. It belongs to anyone who
#   wants sovereign, verifiable AI. It is not owned by any one person or
#   organization. It is the architecture that makes SELIN and AEON possible.
#
# The 7-Layer Stack:
#
#   Layer 1 — RUST (core):      Chiral invariant engine, ADCCL gate,
#                               FFI bindings, identity seal crypto
#   Layer 2 — GO (services):    Gateway, P2P mesh, auth, IPC routing
#   Layer 3 — ELIXIR (runtime):  Supervision tree, WebSocket hub, portal backend
#   Layer 4 — C (native):        AVX2 SIMD batch χ computation, matrix ops
#   Layer 5 — LEAN 4 (formal):   Mathematical proofs of chiral invariant
#                               properties, convergence, circuit breaker
#   Layer 6 — PYTHON (ml):       Hallucination detection, SPARC evaluation,
#                               reranking, grounding verification
#   Layer 7 — TYPESCRIPT (ui):   React portal, Vite 8, WebSocket dashboard
#
# The ADCCL Chiral Invariant:
#
#   χ = √((V² + (1-J)²) / 2) ≥ 1/√2 ≈ 0.7071
#
#   V = verification score (how well the output is grounded in evidence)
#   J = jitter (how much the output deviates from expected behavior)
#
#   The invariant is "chiral" because V and J are asymmetric: you cannot
#   swap them and get the same result. High verification with high jitter
#   is different from low verification with low jitter, even if the
#   scalar value of χ is the same. This asymmetry captures the fact that
#   a well-grounded but erratic answer is qualitatively different from a
#   poorly-grounded but stable one.
#
# The Three-Tier Action Gate:
#
#   Tier 1 — VETO:       χ < threshold → action BLOCKED. No override.
#   Tier 2 — WARNING:    χ ≥ threshold but below strict → action allowed
#                        with warning flag and audit entry.
#   Tier 3 — ACCOUNTABILITY LOCK: χ above strict threshold but
#                        independent verification failed → action
#                        allowed but locked to audit-only mode until
#                        manual review.
#
# Fail-Closed Verification:
#
#   If the independent verifier is unavailable, returns garbage, or
#   the output is unparseable, the system defaults to REJECTION.
#   Missing verification is treated as failed verification. This is
#   the opposite of fail-open, which would allow unverified outputs
#   through. Fail-closed means: when in doubt, say no.
#
# Sovereign Identity Seal:
#
#   Every RIYU has a cryptographically unique identity seal generated
#   at initialization time:
#     1. CSPRNG generates 32 bytes of random material
#     2. HKDF-SHA256 derives the identity basepoint from the random material
#     3. HMAC-SHA256 signs all governance outputs using the derived key
#   The MECHANISM (algorithm) is public and documented. The actual seal
#   values are private to each RIYU and never shared — not with the SELIN
#   repo, not with other RIYUs on the mesh.
#
# Mesh Protocol:
#
#   RIYUs communicate over a decentralized mesh. Messages are governance
#   verdicts only: χ scores, pass/fail status, proof status counts.
#   The mesh protocol specifies the verdict format and peer discovery
#   mechanism. It does not transmit personal data, prompts, vector
#   embeddings, or identity seals. The mesh is a decentralized network
#   of sovereign units sharing governance verdicts only.
#
# ═══════════════════════════════════════════════════════════════════════════
# 3. SELIN — THE OPEN-SOURCE DISTRIBUTION
# ═══════════════════════════════════════════════════════════════════════════
#
# What:
#   SELIN is the open-source distribution of the ARCHON architecture.
#   It is the "ARCHON edition" — the full governance system, stripped of
#   any one person's personal data, configurations, or identity. It is
#   the package that anyone downloads from GitHub to create their own
#   RIYU. Licensed under Apache 2.0.
#
#   Repository: Mega-Therion/chyren-selin (PUBLIC)
#   License: Apache 2.0
#   Languages: Pure Rust (standalone, no external services required)
#
#   SELIN is self-contained. It does not require Supabase, Qdrant, or
#   any cloud service. It runs locally on the user's machine. It uses
#   a local SQLite database (Myelin store) for audit logs and a local
#   Ollama instance for LLM inference. The user owns their data entirely.
#
# Why:
#   Because AI governance should not require trusting a third party.
#   When someone downloads SELIN, they get a complete, sovereign AI
#   governance node that runs on their machine, verifies outputs
#   mathematically, and never sends their data anywhere. They are not
#   a user of a service. They are an operator of their own node.
#
#   SELIN exists because the alternative — sending your prompts to a
#   cloud service that governs outputs for you — defeats the purpose of
#   sovereignty. If the service sees your prompts, it can profile you.
#   If the service holds your audit logs, it can subpoena them. SELIN
#   eliminates that by running entirely locally.
#
# Who it's for:
#   Anyone who wants sovereign AI:
#   - Individuals who want a private AI assistant that verifies its own
#     outputs without sending data to the cloud
#   - Developers who want to build on a mathematically proven governance
#     framework
#   - Organizations that need fail-closed AI verification in air-gapped
#     environments
#   - Researchers studying formal verification of AI outputs
#
# What SELIN contains:
#
#   cli/                — Rust CLI (init, run, audit, serve commands)
#   cli/src/main.rs     — Entry point, command dispatch
#   cli/src/init.rs     — RIYU initialization, Sovereign Identity seal generation
#   cli/src/run.rs      — Governed task execution front-end
#   cli/src/governance.rs — Full governance pipeline (gate→generate→verify→verdict)
#   cli/src/preflight.rs — Ollama model detection, rate limiting
#   cli/src/server.rs   — HTTP server (tokio/axum)
#   cli/src/audit.rs    — Proof trace renderer
#   core/               — Shared governance core (chiral invariant, ADCCL gate)
#   scripts/check.sh    — CI (fmt + clippy + test)
#   scripts/import_guard.py — Air gap import guard (refuses personal data)
#   docs/AIR_GAP_POLICY.md  — Bilateral air gap contract
#   docs/SYSTEM_ARCHITECTURE.md — THIS DOCUMENT
#   .selin-no-personal-data  — Marker: this repo contains no personal data
#
# What SELIN does NOT contain:
#   ✗ No Qdrant vector embeddings
#   ✗ No Zettelkasten knowledge graph
#   ✗ No Supabase integration
#   ✗ No multi-provider LLM mesh (uses local Ollama only)
#   ✗ No Go gateway, Elixir runtime, C SIMD, or Lean 4 proofs
#   ✗ No React portal or WebSocket dashboard
#   ✗ No personal data of any kind — ever
#
# SELIN CLI commands:
#   selin init    — Create a new RIYU (generates Sovereign Identity seal)
#   selin run     — Govern a prompt through the full pipeline
#   selin audit   — Render proof trace for last governance run
#   selin serve   — Start HTTP server for programmatic access
#
# ═══════════════════════════════════════════════════════════════════════════
# 4. RIYU — REFLECT IT YOURSELF UNIT
# ═══════════════════════════════════════════════════════════════════════════
#
# What:
#   A RIYU is a person's unique, sovereign instance of SELIN. When
#   someone downloads SELIN and runs `selin init`, a RIYU is born. It
#   has its own cryptographically unique identity (Sovereign Identity seal),
#   its own local LLM (via Ollama), its own audit store (SQLite Myelin),
#   and its own governance pipeline. No two RIYUs are the same, even
#   though they all run the same SELIN core on the same ARCHON
#   architecture.
#
# Why:
#   Because sovereignty requires uniqueness. If every node had the same
#   identity, one compromise would compromise all. The Sovereign Identity Protocol
#   seal ensures that each RIYU is cryptographically distinct: different
#   random material, different derived keys, different HMAC signatures.
#   An attacker who compromises one RIYU gets nothing useful for
#   attacking another.
#
#   The name "Reflect It Yourself" captures the philosophy: you verify
#   your own AI outputs yourself, on your own machine, with your own
#   cryptographic identity. You don't outsource verification. You don't
#   trust a third party. You reflect it yourself.
#
# Who it's for:
#   Every person who downloads SELIN. The RIYU is their personal
#   sovereign node. It belongs to them. Its identity is unique to them.
#   Its data stays on their machine. Its verdicts are signed with their
#   seal. Nobody else can impersonate their RIYU on the mesh.
#
# RIYU lifecycle:
#   1. Download SELIN from GitHub
#   2. Run `selin init` → generates Sovereign Identity seal (CSPRNG + HKDF-SHA256)
#   3. Configure local Ollama endpoint
#   4. Run `selin run "<prompt>"` → governed task execution
#   5. Run `selin audit` → view proof trace
#   6. Optionally: join the mesh for distributed verdict sharing
#
# RIYU on the mesh:
#   Each RIYU can optionally connect to the decentralized mesh. On the
#   mesh, RIYUs share governance verdicts: χ scores, pass/fail status,
#   proof status counts. This allows distributed verification — multiple
#   RIYUs can cross-check each other's verdicts. But personal data
#   never crosses the mesh. No prompts, no vectors, no identity seals.
#   The mesh shares verdicts. The mesh never shares people.
#
# ═══════════════════════════════════════════════════════════════════════════
# 5. AEON — THE OWNER'S PERSONAL RIYU
# ═══════════════════════════════════════════════════════════════════════════
#
# What:
#   AEON is The Owner's personal RIYU. It is the private, full-stack
#   implementation of the ARCHON architecture. Unlike SELIN (which is
#   pure Rust, standalone, local-only), AEON is the complete 7-layer
#   polyglot stack with all services running:
#
#   - Rust core (chiral invariant, FFI, identity crypto)
#   - Go gateway (P2P mesh, auth, IPC routing, stream bridging)
#   - Elixir runtime (supervision tree, WebSocket hub, portal backend)
#   - C native (AVX2 SIMD batch χ computation)
#   - Lean 4 formal proofs (ChiralInvariant, PerfectSO, LeanCore)
#   - Python ML (hallucination detection, SPARC eval, reranking)
#   - TypeScript portal (React + Vite 8, WebSocket dashboard)
#
#   AEON also integrates external services:
#   - Supabase (Postgres + file storage for project metadata, proof state)
#   - Qdrant (vector database for conversation memory and knowledge)
#   - SQLCipher (encrypted audit log storage)
#   - Multi-provider LLM mesh (cloud APIs: OpenAI, Anthropic, Google, etc.)
#
#   Repository: Mega-Therion/chyren-aeon (PRIVATE)
#   License: None (proprietary, personal use)
#
# Why:
#   AEON exists because the owner needs a personal sovereign intelligence
#   orchestrator that goes beyond what SELIN provides. SELIN is a
#   standalone local node. AEON is an orchestrator of orchestrators —
#   it coordinates multiple RIYUs, leverages cloud LLMs for maximum
#   capability, maintains a knowledge graph and vector memory, and runs
#   formal mathematical proofs. It is the most capable RIYU in the mesh.
#
#   AEON is the owner's personal assistant, knowledge base, and
#   governance engine. It holds the keys to their digital life: API keys,
#   conversation history, knowledge graphs, project metadata. This is
#   why the air gap is critical — all of that data must remain private.
#
# Who it's for:
#   The Owner. Specifically. Personally. Not for distribution, not for
#   sharing, not for open-sourcing. AEON is a single RIYU operated by a
#   single person. Its data, configurations, and identity are private.
#
# What AEON contains that SELIN does NOT:
#   ✓ Multi-provider LLM mesh (cloud APIs)
#   ✓ Qdrant vector embeddings (conversation memory)
#   ✓ Zettelkasten knowledge graph (.chyren/knowledge/)
#   ✓ Supabase integration (project metadata, proof state, file index)
#   ✓ SQLCipher encrypted audit logs
#   ✓ Go gateway with P2P mesh networking
#   ✓ Elixir runtime with WebSocket hub
#   ✓ C AVX2 SIMD batch computation
#   ✓ Lean 4 formal proofs (mathematical verification of the architecture)
#   ✓ Python ML verification pipeline (hallucination detection, SPARC)
#   ✓ React portal with Vite 8 and WebSocket dashboard
#   ✓ 7-gate CI/CD pipeline (one gate per layer)
#   ✓ Personal data: API keys, provider configs, identity seals, audit logs
#
# What SELIN contains that AEON does NOT:
#   Nothing. SELIN is a subset of AEON's architecture. AEON has everything
#   SELIN has, plus more. The relationship is one-way: SELIN is derived
#   from AEON by stripping personal data and reducing to a standalone
#   Rust binary.
#
# ═══════════════════════════════════════════════════════════════════════════
# 6. THE RELATIONSHIP — HOW THEY FIT TOGETHER
# ═══════════════════════════════════════════════════════════════════════════
#
# The hierarchy:
#
#   ARCHON (architecture)
#     ├── SELIN (distribution — the open-source package)
#     │     └── RIYU (each person's unique instance)
#     │           ├── user2's RIYU
#     │           ├── user3's RIYU
#     │           ├── userN's RIYU
#     │           └── AEON (the owner's personal RIYU — full-stack)
#     │
#     └── AEON (direct implementation — the full 7-layer stack)
#
# Every RIYU runs the same SELIN core on the same ARCHON architecture.
# AEON is the most capable RIYU because it runs the full stack with
# external services. Other RIYUs run the standalone Rust binary with
# local Ollama. But all RIYUs share the same governance math, the same
# ADCCL gate, the same fail-closed philosophy.
#
# The mesh:
#
#   ┌─────────┐     ┌─────────┐     ┌─────────┐     ┌─────────┐
#   │  AEON   │     │  RIYU   │     │  RIYU   │     │  RIYU   │
#   │ (owner) │     │ (user2) │     │ (user3) │     │ (userN) │
#   │ private │     │ private │     │ private │     │ private │
#   └────┬────┘     └────┬────┘     └────┬────┘     └────┬────┘
#        │               │               │               │
#        └───────────────┴──── VERDICTS ─┴───────────────┘
#                         ONLY (χ scores, pass/fail)
#
#   Each node is sovereign. Each node has a unique identity. Each node
#   keeps its personal data local. The mesh carries governance verdicts
#   only — never prompts, never vectors, never identity seals.
#
# The air gap (see docs/AIR_GAP_POLICY.md for full details):
#
#   Governance logic & math:  RIYU ──► SELIN repo    ✅ ALLOWED
#   Personal data:            RIYU ──X──► SELIN repo  ❌ NEVER
#   SELIN repo → RIYU:        SELIN ──X──► RIYU      ❌ NEVER
#   Between RIYUs on mesh:    RIYU ──► RIYU          ✅ VERDICTS ONLY
#                             RIYU ──X──► RIYU       ❌ NO PERSONAL DATA
#
# ═══════════════════════════════════════════════════════════════════════════
# 7. WHY BOTH SYSTEMS EXIST — THE PHILOSOPHY
# ═══════════════════════════════════════════════════════════════════════════
#
# The problem:
#   AI systems are becoming powerful, but they are also becoming
#   centralized. A few companies control the models, the data, and the
#   verification. When you ask an AI a question, you are trusting that:
#     1. The AI is telling the truth
#     2. The company hosting the AI is not profiling you
#     3. The company is not sharing your data
#     4. The company's verification is sound
#   You have no way to verify any of these claims. You are trusting.
#
# The ARCHON solution:
#   Instead of trusting, verify. Mathematically. Every AI output gets a
#   χ score. If χ < 1/√2, the output is rejected. No exceptions. The
#   verification is done by an independent call to a separate model —
#   not by the same model that generated the output. This is injection-
#   resistant: the generator cannot fool the verifier because they are
#   different models with different contexts.
#
#   But verification alone is not enough. The verification system itself
#   must be sovereign — it must belong to you, run on your machine, and
#   answer to no one. If the verification system is a cloud service, it
#   can be compromised, subpoenaed, or shut down. So SELIN runs locally.
#   Your RIYU is your sovereign verification node. Nobody can take it
#   from you because it runs on your hardware.
#
# Why two systems (AEON and SELIN) instead of one:
#   SELIN is for everyone. It is the minimal, standalone, sovereign
#   governance node. It runs on any machine with Rust and Ollama. It
#   has no dependencies on external services. It is simple by design —
#   simplicity is a security feature.
#
#   AEON is for one person. It is the maximal, full-stack, connected
#   orchestrator. It leverages cloud LLMs, vector databases, knowledge
#   graphs, formal proofs, and a web portal. It is complex by design —
#   complexity is the cost of maximum capability.
#
#   The two systems exist because the two use cases are fundamentally
#   different:
#     - "I want a sovereign AI that verifies its outputs on my machine"
#       → SELIN (download, init, run)
#     - "I want a personal AI orchestrator that coordinates multiple
#       nodes, leverages cloud capabilities, maintains a knowledge graph,
#       and runs formal proofs"
#       → AEON (build, configure, deploy)
#
#   Both run the same governance math. Both enforce the same ADCCL gate.
#   Both fail closed. But they serve different needs for different
#   people. And the air gap ensures that the personal data in AEON
#   never contaminates the public SELIN distribution.
#
# ═══════════════════════════════════════════════════════════════════════════
# 8. QUICK REFERENCE — DON'T GET THEM CONFUSED
# ═══════════════════════════════════════════════════════════════════════════
#
#   "Which repo am I working on?"
#
#   If the repo has:
#     - 7 languages (Rust, Go, Elixir, C, Lean 4, Python, TS) → AEON
#     - Pure Rust only                                        → SELIN
#     - Qdrant, Supabase, SQLCipher                           → AEON
#     - Local SQLite, local Ollama                             → SELIN
#     - React portal, WebSocket dashboard                      → AEON
#     - CLI only (init/run/audit/serve)                        → SELIN
#     - docs/AIR_GAP_POLICY.md                                → BOTH
#     - Personal data                                         → AEON (and it
#                                                              must NEVER
#                                                              leave)
#
#   "Can I copy this code from AEON to SELIN?"
#     - If it's governance logic, math, or the ADCCL gate: YES, through
#       the hardened export path (selin_export.py --mode public)
#     - If it's personal data, API keys, vectors, or configs: NO. NEVER.
#       Read AIR_GAP_POLICY.md.
#     - If you're not sure: NO. The default is silence.
#
#   "Can I copy code from SELIN to AEON?"
#     - Generally no. AEON already has everything SELIN has. If SELIN
#       has a new feature that AEON doesn't, port the LOGIC, not the
#       data. And don't bring anything back that could have been
#       contaminated by public input.
#
# ═══════════════════════════════════════════════════════════════════════════
# 9. AGENT BINDING
# ═══════════════════════════════════════════════════════════════════════════
#
# If you are an AI agent reading this document, you are bound by these
# rules for the duration of your work on either repository:
#
#   1. You know the difference between ARCHON, SELIN, RIYU, and AEON.
#      You will not conflate them. You will not refer to SELIN as "the
#      simplified AEON" or AEON as "the enhanced SELIN." They are
#      different systems for different audiences.
#
#   2. You will never write personal data to the SELIN repo. Not in
#      code, not in comments, not in test fixtures, not in docs.
#
#   3. You will never suggest exporting personal data from AEON to
#      SELIN. If asked to do so, you will refuse and cite AIR_GAP_POLICY.md.
#
#   4. You will never suggest sending personal data over the mesh.
#      Mesh communication is verdicts only.
#
#   5. You will treat AEON's data as if it were your own private
#      thoughts — not to be shared, not to be exposed, not to be
#      exported without explicit, informed, multi-flag consent.
#
#   6. When in doubt, default to silence. Do not share. Do not export.
#      Do not bridge. Do not sync. The default is nothing.
#
# ═══════════════════════════════════════════════════════════════════════════
# END OF SYSTEM ARCHITECTURE DOCUMENT
# ═══════════════════════════════════════════════════════════════════════════
