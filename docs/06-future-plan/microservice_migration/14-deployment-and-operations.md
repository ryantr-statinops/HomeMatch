# Deployment and Operations

## Environments

Use three environments when the backend work starts:

- Local: developer machine and test Supabase project/local instance.
- Staging: integration and smoke testing.
- Production: real public website and operational data.

## Deployment targets

- Public Web: Vercel.
- Admin Portal: Vercel or the same managed frontend platform.
- Backend API: Python FastAPI deployed from `services/api` as a separate Vercel
  project; container deployment to another managed platform remains a future
  option.
- Database: Supabase PostgreSQL.
- Images: Google Drive with `ImageCache` mapping.

Do not introduce Kubernetes for this project phase.

## Operational requirements

- `/health` endpoint for the API.
- Structured application logs.
- Error monitoring for API and frontend.
- Audit trail for admin mutations.
- Database backup and migration procedure.
- Documented rollback for each deployment.
- Monitoring for lead creation failures and image-resolution failures.

## Release flow

```text
feature branch → checks → staging deploy → smoke tests → production deploy
```

Database changes must be backward-compatible with the currently deployed application during rollout.
