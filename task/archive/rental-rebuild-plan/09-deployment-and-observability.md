# P08 — Deployment and observability

**Status:** Not started. **Depends on:** P02 for preview; P07 for production release.

## Goal and ownership

Deploy web/request APIs to validated Vercel configuration and crawl/training to a separate batch runtime. Platform agent owns runtime setup; coordinator owns release gates, secrets and recovery rehearsal.

## Tasks

- Verify Vercel runtime/duration/memory/cold start and package constraints for Gateway and FastAPI.
- Select batch scheduler/runner and object storage from documented spike evidence.
- Provision isolated preview data/secrets; define production secret ownership and rotation.
- Add API, crawler, data freshness, ML fallback/drift and storage/cost signals.
- Define alert thresholds after baseline observations; exercise crawl replay, model rollback and database restore.

## Exit criteria

Preview end-to-end passes without production data. Production path has approved source, migrations/backups, privacy/security review, rollback owner, smoke tests and monitoring. Long-running batch is never triggered synchronously by web request.

## Rollback/handoff

Rollback frontend/API release independently; pause crawler while preserving last valid dataset; revert model artifact by version. P09 receives deployment IDs and recovery evidence.
