# P02 — Platform foundation

**Status:** Not started. **Depends on:** P01.

## Goal and ownership

Make the empty product architecture runnable and define stable request/data boundaries. Coordinator owns service contract and integration. Separate agents own web shell, Go Gateway and FastAPI/PostgreSQL integration; ML/crawler interfaces use mocks until their phases.

## Scope and outputs

- React/Vite/React Router app with build, route shell and API client boundary.
- Go Gateway with health, forwarding, request ID, timeout and bounded request controls.
- FastAPI with health, OpenAPI, configuration and empty domain module contracts.
- PostgreSQL migrations and local fixtures using provider choice documented by ADR.
- Object storage interface and local test adapter; no vendor lock until spike.
- CI for locked language toolchains, lint/typecheck/build/unit/contract tests.

## Tests and exit criteria

Service health and API roundtrip pass locally; CORS/origin and timeout behavior verified; unknown secrets fail closed; database migration up/down or documented forward-only recovery is rehearsed; CI does not access internet sources or production credentials. API owner, request trace, errors and versioning align with `docs/06-api/`.

## Rollback/handoff

Migrations remain additive; remove unused scaffold through focused commits. Hand off runnable contracts to P03 and P08 preview setup.
