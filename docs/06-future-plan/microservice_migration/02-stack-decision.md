# Stack Decision

## Decision Summary

The recommended stack is a **modular monolith backend + two frontend apps**.
This is the best fit for the current project size and product scope.

## Recommended Stack

### Frontend

- `Next.js`
- `TypeScript`
- `Tailwind CSS v4`
- `shadcn/ui`

### Backend

Choose one of these two, with a preference for the first:

1. `NestJS`
2. `Fastify`

Recommendation: `NestJS` if you want stronger module structure, guards, decorators, and long-term maintainability.
If speed and low ceremony matter more, `Fastify` is acceptable.

### Data

- `Supabase PostgreSQL`
- `Google Drive` for media files
- `ImageCache` table for mapping image path to Drive URL

### Shared Layer

- shared types
- shared Zod schemas
- shared constants
- shared API response contracts

## Why Not Full Microservice Split Yet

- The project still has one dominant domain.
- Team/process overhead would grow faster than product value.
- Separate services would add deployment and observability work too early.
- The admin portal only needs a clean boundary, not many independently scaled services.

## Why Keep Google Drive

- already aligned with the current document flow
- lower migration risk
- keeps image handling stable during the backend refactor
- avoids changing both storage and app architecture at the same time

## Stack Rules

- Do not let public UI read Supabase directly.
- Do not let admin UI write to DB directly.
- Keep backend as the only integration point for data and media resolution.
- Avoid introducing a message queue until there is a real async use case.

