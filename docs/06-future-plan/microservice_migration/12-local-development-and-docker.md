# Local Development and Docker

## Default local workflow

The first backend iteration should be runnable without a large infrastructure stack:

```text
apps/web
apps/admin
services/api
Supabase project or local Supabase
```

Each app has its own `.env.local`/environment configuration. Secrets are never committed.

## Docker decision

Docker is optional for the first implementation. Add Dockerfiles for Web,
Admin and FastAPI when environment parity or a future container deployment
requires them.

Docker Compose may orchestrate the applications locally, but the initial stack does not include Redis, Traefik or Zipkin.

## Local checks

```text
npm install
npm run lint
npm run test
npm run build

cd services/api
python -m venv .venv
python -m pip install -e ".[dev]"
python -m pytest
uvicorn app.main:app --reload
```

`npm workspaces` manage JavaScript and TypeScript applications and packages.
Python dependencies and commands remain scoped to `services/api`.

## Environment groups

- Public URL and API URL.
- Supabase URL and anon key.
- Server-only Supabase service key.
- Supabase Auth configuration.
- Google Drive/ImageCache integration credentials.
- Zalo URL and analytics configuration.
