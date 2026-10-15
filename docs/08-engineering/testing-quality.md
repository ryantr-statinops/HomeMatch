# Testing and quality

## Test layers

- Unit: parser/normalizer, dedup rules, ranking, price features, API validation.
- Contract: FastAPI OpenAPI, Gateway forwarding/error mapping, ML request/response compatibility.
- Integration: PostgreSQL constraints/migrations, object storage adapter, crawler idempotency.
- Evaluation: temporal and grouped splits, per-region/category metrics, baseline comparisons.
- Product E2E: preference input through search/results/detail/save/compare and degraded ML states.
- Operations: crawl retry/replay, model rollback, freshness alert and restore rehearsal.

## Required scenarios

Test unknown/missing values distinctly from zero; duplicate and expired listings; partial address; no results; cold-start user; stale/unavailable model; crawler timeout/429/changed HTML; repeated crawl; provider outage; and historical leakage from the same listing/room across train and evaluation sets.

Quality gates must never present synthetic-fixture metrics as production model quality. Every model report records dataset snapshot, split, baseline, metrics, segment sizes and uncertainty. CI should run deterministic tests without internet crawl or secrets.
