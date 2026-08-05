# Security Policy

## Reporting a Vulnerability

SELIN is a security-first project. We take vulnerability reports seriously.

### How to Report

**DO NOT open a public GitHub issue for security vulnerabilities.**

Instead, please report vulnerabilities by emailing the repository owner directly through GitHub's private vulnerability reporting feature:

1. Go to the [Security tab](https://github.com/Mega-Therion/chyren-selin/security) of this repository
2. Click "Report a vulnerability"
3. Provide a clear description of the issue, steps to reproduce, and potential impact

### Response Timeline

- **Acknowledgment:** Within 48 hours
- **Initial Assessment:** Within 7 days
- **Fix or Mitigation:** Within 30 days for high-severity issues

### Scope

Vulnerabilities in scope:
- Bypass of the ADCCL chiral invariant gate
- Bypass of the fail-closed verification mechanism
- Compromise of the Sovereign Identity Protocol seal
- Injection or manipulation of the verification model's response
- Data leakage from the Myelin store
- Authentication or authorization bypass in the HTTP server

Vulnerabilities out of scope:
- Issues in dependencies (report upstream)
- Issues requiring physical access to the user's machine
- Social engineering attacks
- DoS via excessive prompt length

### Safe Harbor

We will not take legal action against security researchers who:
- Make a good-faith effort to avoid privacy violations and data destruction
- Give us reasonable time to respond before public disclosure
- Do not access or modify data that does not belong to them

## Security Architecture

SELIN's security model is built on three principles:

1. **Fail-Closed Verification:** If verification is missing, unparseable, or fails, the output is rejected. No exceptions. Missing verification = failed verification.

2. **Sovereign Identity:** Each RIYU has a cryptographically unique identity seal (CSPRNG + HKDF-SHA256). No central authority can impersonate, revoke, or override your node.

3. **Local-First:** All data stays on your machine. No telemetry, no phone-home, no cloud dependencies. Your prompts, your audit logs, your identity - all local.

See [docs/SYSTEM_ARCHITECTURE.md](docs/SYSTEM_ARCHITECTURE.md) for the full architecture and [docs/AIR_GAP_POLICY.md](docs/AIR_GAP_POLICY.md) for the bilateral air gap contract.
