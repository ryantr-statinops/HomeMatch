# Repository and Module Structure

## Target repository

Use a monorepo so public web, admin portal, backend and shared contracts can evolve together.

```text
apps/
├── web/                    # Public Next.js application
├── admin/                  # Sale/admin portal
└── api/                    # Backend modular monolith

packages/
└── shared/                 # Types, Zod schemas, constants, API contracts

docs/
scripts/
docker-compose.yml          # Local orchestration only when needed
```

## Backend modules

```text
apps/api/src/
├── config/
├── common/
│   ├── errors/
│   ├── logging/
│   └── validation/
├── modules/
│   ├── auth/
│   ├── rooms/
│   ├── roommates/
│   ├── leads/
│   └── media/
└── main.ts
```

Each module owns its controller, service, repository/data access and tests. Controllers handle transport; services handle business rules; repositories handle Supabase access.

## Shared package

`packages/shared` contains only items safe to share:

- public TypeScript types;
- Zod request/response schemas;
- enum values and constants;
- API error and pagination contracts.

It must not contain database credentials, Supabase clients or server-only business logic.

## Dependency rules

- Web and Admin may call the API, not Supabase directly, after Phase 2.
- API may access Supabase and Google Drive integration code.
- Modules should not import another module's repository directly.
- Cross-module communication goes through application services or shared contracts.
- Shared code must remain small and domain-neutral.
