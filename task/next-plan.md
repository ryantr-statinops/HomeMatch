# Next action

This file is a short pointer, not a second roadmap. The canonical A–Z plan is [task/rebuild-plan/README.md](rebuild-plan/README.md).

## Current state

- Branch: `main`.
- Active phase: P00 — documentation reset complete; awaiting review before P01.
- Target product: personalized rental-listing discovery for renters generally.
- Target architecture and current/target boundary: [docs/README.md](../docs/README.md).
- Codebase reset and product implementation have not started.

## Next work

Review the completed documentation and accept the P00 gate. P01 codebase reset can start only after that gate.

P01 must begin with [legacy integrations inventory](rebuild-plan/legacy-integrations-audit.md): remove old Google Sheet/Drive/Apps Script consumers and separately track credential/resource retirement. Repository audit completed on 2026-10-16; external account state has not been inspected.
