# Phase Exit Criteria

## Phase 0 — Prepare

- Architecture decision accepted.
- Repository structure and ownership documented.
- API versioning and shared contract format documented.
- Environment strategy documented.

## Phase 1 — Foundation

- Public Web root, `apps/admin`, `services/api`, `packages/api-spec` and
  `packages/api-client` exist.
- API health check works.
- CI runs lint, typecheck, tests and build.
- Current public website behavior remains available.

## Phase 2 — Read APIs

- Room listing/detail use backend endpoints.
- Roommate listing/detail use backend endpoints.
- Public clients no longer query Supabase directly.
- Filters, pagination contract and image resolution match current behavior.
- Integration and smoke tests pass.

## Phase 3 — Lead Write Path

- `POST /api/v1/leads` validates source type and source ID.
- Public lead creation is rate-limited.
- Invalid and duplicate/spam requests are handled safely.
- Lead records are visible to authorized operators.

## Phase 4 — Admin Portal

- Supabase Auth login works.
- `ADMIN` and `SALE` permissions are enforced by the backend.
- Roommate and room operations are protected.
- Admin mutations have audit records.

## Phase 5 — Media

- Backend resolves `ImageCache` paths.
- Missing mappings have a documented fallback.
- Image download uses a server-side route.
- No private media credential is exposed to the browser.

## Phase 6 — Hardening

- Health checks, structured logs and error monitoring work.
- Backup and rollback procedures are tested.
- Production smoke tests pass.
- A measured decision confirms whether any module should become an independent service.

## Final migration exit

Migration is complete only when the public site works, Admin Portal operations work, leads are recorded correctly, images resolve, protected endpoints are enforced and clients no longer access the database directly.
