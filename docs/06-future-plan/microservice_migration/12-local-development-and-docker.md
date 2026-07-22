# Local Development and Docker

## Default local workflow

The first backend iteration should be runnable without a large infrastructure stack:

```text
apps/web
apps/admin
apps/api
Supabase project or local Supabase
```

Each app has its own `.env.local`/environment configuration. Secrets are never committed.

## Docker decision

Docker is optional for the first implementation. Add Dockerfiles for `web`, `admin` and `api` when environment parity or deployment requires them.

Docker Compose may orchestrate the applications locally, but the initial stack does not include Redis, Traefik or Zipkin.

## Local checks

```text
npm install
npm run lint
npm run test
npm run build
```

The exact workspace commands must be finalized when the monorepo structure is created.

## Environment groups

- Public URL and API URL.
- Supabase URL and anon key.
- Server-only Supabase service key.
- Supabase Auth configuration.
- Google Drive/ImageCache integration credentials.
- Zalo URL and analytics configuration.
