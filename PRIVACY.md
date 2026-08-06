# Archon Selin Privacy Policy

## Sovereign Privacy Principles

Archon Selin is engineered for zero-trust, local-first sovereign intelligence:

1. **Zero External Data Exfiltration**:
   - All prompt histories, evaluation vectors ($V, J, \chi$), and proof traces are stored locally in the encrypted SQLite Myelin store (`~/.selin/myelin.db`).
   - Archon Selin does not collect analytics, telemetry, or user behavior metrics.

2. **API Endpoint Privacy**:
   - Outbound LLM requests are directed solely to user-configured endpoints (e.g. local Ollama or private inference nodes).
   - No third-party tracking scripts or remote analytics dependencies exist within the binary.

3. **Data Retention & Erasure**:
   - Users maintain complete ownership of their local Myelin store.
   - Deleting `~/.selin/myelin.db` or invoking `selin init` wipes all localized history permanently.
