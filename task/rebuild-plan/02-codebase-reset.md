# P01 — Codebase reset

**Status:** Not started. **Depends on:** P00 accepted.

## Goal

Inventory and replace the old implementation so repository matches target architecture while retaining only reviewed reusable UI/ideas and Git history. No production data deletion or live deployment change is included.

## Work packages and ownership

- Coordinator: inventory matrix, deletion list, migration sequence, root tooling and integration.
- Web agent owns `apps/web/**` and frontend assets/routes.
- Go agent owns `services/gateway/**` and `services/crawler/**`.
- Python agent owns `services/api/**` and `services/ml/**`.
- CI/docs agent owns workspace scripts, CI and setup docs. No overlapping edits; coordinator accepts shared contracts first.

## Inputs/outputs

Input: current repo inventory, P00 architecture and UI decisions. Output: clean target workspace, runnable services with deterministic fixtures, dependency lockfiles, env examples and CI scaffold. Existing production credentials/data are never copied into fixtures.

## Acceptance and verification

- Old Next.js/Admin/AppSheet/Supabase legacy paths are removed or explicitly retained only by a documented dependency decision.
- Web shell, Go gateway, FastAPI, crawler CLI and Python ML package start/test with mock/fixture data.
- No crawler network access or production database required for default local setup.
- Secret scan and env boundary check pass; no real crawl dumps committed.
- CI installs locked toolchains and runs placeholder checks.

## Rollback/handoff

Changes are grouped by bounded subsystem; revert a subsystem commit without losing accepted docs. Hand off target workspace commands/contracts to P02.
