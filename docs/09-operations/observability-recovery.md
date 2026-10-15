# Observability and recovery

## Signals

- Gateway/API: request count, latency, error rate, timeout, rate limiting and trace/request ID.
- Crawler: run duration, source outcomes, 429/5xx/parser failures, records new/changed/expired, duplicate rate and last successful observation.
- Data: required-field completeness, geocode confidence, freshness by source/region, invalid values and dedup review queue.
- ML: model/dataset version, inference latency/error, fallback rate, ranking engagement by cohort and offline metrics by segment.
- Storage: database availability, migration state, object write/read errors, cost and retention volume.

## Recovery

- A failed crawl can retry/replay idempotently without erasing the last valid snapshot.
- Suspected bad normalization can be rebuilt from retained eligible raw snapshots.
- Bad model release can switch to prior evaluated artifact or deterministic ranking baseline.
- Database migration requires backward compatibility and documented backup/restore rehearsal.
- Stale data is surfaced or suppressed according to freshness policy; never silently presented as verified current.

Thresholds and alert routing are set after baseline operation establishes normal ranges. Do not invent SLOs before measurement; each release phase must define measurable limits before production exposure.
