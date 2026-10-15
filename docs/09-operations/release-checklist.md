# Release checklist

- [ ] CI, unit, contract, integration and frontend E2E checks pass.
- [ ] Public API and database migration are backward compatible or have a rehearsed rollback.
- [ ] Preview uses isolated credentials/data; secrets are not present in client bundles or logs.
- [ ] Crawl source remains approved; request limits and retention policy are configured.
- [ ] Listing freshness, expiry, missing-data and no-result states are visible and truthful.
- [ ] Model has evaluated version, dataset snapshot, baseline comparison and fallback behavior; otherwise ranking baseline remains active.
- [ ] Request API runtime and batch jobs have been exercised in their target environments.
- [ ] Observability covers errors, stale data, crawler runs, inference fallback and spend.
- [ ] Release owner records deploy, data/model versions, smoke-test evidence and recovery path.
