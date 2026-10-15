# Hosting and deployment

## Target topology

- React/Vite static frontend on Vercel.
- Go Gateway and FastAPI request APIs targeted for Vercel Functions/Services only after runtime and workload validation.
- Go crawler and Python training run as scheduled/on-demand batch jobs outside interactive request path.
- PostgreSQL and object storage are managed services selected after foundation spike; applications depend on interfaces rather than vendor-specific product behavior where practical.
- Preview environments use isolated non-production data and credentials.

## Release path

Pull request -> CI/unit/contracts/build -> preview smoke test -> reviewed migration/artifact changes -> production deploy -> health/freshness/model checks. Batch deployment is versioned independently and records code/config/source policy versions.

Vercel support for a runtime does not by itself prove suitability. Validate function duration, memory, cold start, payload, concurrency, networking and native dependency constraints before accepting the topology. Long crawl/training work stays in the batch environment.
