# Repository and Module Structure

## Target repository

Use a monorepo so public web, admin portal, backend and shared contracts can evolve together.

```text
apps/
├── web/                    # Public Next.js application
└── admin/                  # Sale/admin portal

packages/
├── api-spec/               # Generated OpenAPI artifact
├── api-client/             # Generated TypeScript client
└── config/                 # Shared frontend tooling configuration

services/
└── api/                    # Python FastAPI modular monolith

docs/
scripts/
docker-compose.yml          # Local orchestration only when needed
```

## Backend modules

```text
services/api/
├── app/
│   ├── main.py
│   ├── config/
│   ├── common/
│   │   ├── errors/
│   │   ├── logging/
│   │   └── security/
│   ├── infrastructure/
│   │   ├── supabase/
│   │   └── google_drive/
│   └── modules/
│       ├── auth/
│       ├── rooms/
│       ├── roommates/
│       ├── leads/
│       ├── media/
│       └── audit/
├── tests/
└── pyproject.toml
```

Each module owns its router, Pydantic schemas, service, repository/data access
and tests. Routers handle HTTP transport; services handle business rules;
repositories handle Supabase access.

## Shared package

The cross-language contract layer contains:

- FastAPI-generated OpenAPI in `packages/api-spec`;
- generated TypeScript types and client in `packages/api-client`;
- frontend-only constants and tooling configuration in `packages/config`.

It must not contain database credentials, Supabase clients or server-only
business logic. Pydantic models in the API remain authoritative; generated
frontend types must not be manually edited.

## Dependency rules

- Web and Admin may call the API, not Supabase directly, after Phase 2.
- FastAPI may access Supabase and Google Drive integration code.
- Modules should not import another module's repository directly.
- Cross-module communication goes through application services or shared contracts.
- Shared code must remain small and domain-neutral.
