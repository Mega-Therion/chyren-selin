# Archon Selin Security Policy

## Security & Verification Guarantees

Archon Selin operates on a strict **Fail-Closed** security architecture:
1. **ADCCL Gate Enforcement**: All candidate model outputs must satisfy the canonical chiral invariant ($\chi = \sqrt{(V^2 + (1-J)^2)/2} \ge \frac{1}{\sqrt{2}} \approx 0.70710678$).
2. **Local Storage Privacy**: Myelin proof records and SQLite identity stores remain strictly localized on-device. Zero telemetry or sensitive trace logs are transmitted to external services.
3. **API Key Authentication**: When running in network mode (`selin serve`), endpoints are secured via Bearer or `X-API-Key` headers matching `ARCHON_API_KEY`.
4. **Input Boundaries**: Prompts are constrained to 32KB and sanitized against hidden zero-width Unicode injection vectors prior to governance preflight.

## Reporting a Vulnerability

If you discover a potential security flaw or vulnerability within Archon Selin:
1. **Do NOT** open a public issue.
2. Email security reports directly to: `security@chyren.org` or submit an encrypted report.
3. Provide steps to reproduce, impact assessment, and any relevant payload snippets.
4. The security team will acknowledge receipt within 24 hours and issue a CVE advisory upon verification and patching.
