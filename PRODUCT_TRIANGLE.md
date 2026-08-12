# Product triangle — Chyren-Archon lane

This repository is the **public** lane of a three-product geometry.

| Lane | Name | Repo | Visibility |
|------|------|------|------------|
| Private full OS | **Chyren-Aeon** | `chyren-aeon` | Private — owner only |
| Public RIYU node | **Chyren-Archon** (this repo) | `chyren-selin` | Public |
| Standalone verifier | **MVPC-X** | `MVPC-X` | Public |

```text
MVPC-X  ◄── optional local CLI ──  Chyren-Archon (you are here)
   ▲
   └── optional local CLI ──  Chyren-Aeon (private, not this repo)

MVPC-X also runs with zero Chyren installed.
```

## Public name vs git name

- **Product / docs name:** Chyren-Archon (ARCHON runtime, SELIN series philosophy)
- **GitHub repo (current):** `Mega-Therion/chyren-selin`  
  (Rename to `Chyren-Archon` is optional later; binary may remain `selin`.)

## What Archon is

- Local-first RIYU: identity basepoint, ADCCL govern loop, three-tier gate, myelin run log
- Optional formal path: `selin verify-artifact` → local [MVPC-X](https://github.com/Mega-Therion/MVPC-X)
- **Not** the owner's private AEON memory, research corpus, or personal Chyren

## Air gap

Personal AEON/Chyren data must never land in this tree. See [docs/AIR_GAP_POLICY.md](docs/AIR_GAP_POLICY.md).
