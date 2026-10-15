# P03 — Source discovery and crawling

**Status:** Not started. **Depends on:** P02.

## Goal

Choose an initial source and prove a compliant, useful and reproducible batch collection before choosing launch geography.

## Tasks and ownership

- Coordinator records candidate source evidence and approval state.
- Data/crawler agent builds a source eligibility matrix and Go adapter behind the accepted source contract.
- Independent reviewer checks source terms, access restrictions, robots guidance, rate limits, retention/display rights, PII and operational stability.

## Output contract

Each crawl run records source, code/config version, start/end, outcome, counts, errors and cursor. Each observation stores source identity, source URL, captured time, content hash and raw artifact reference. Repeated runs are idempotent; raw snapshots are immutable within retention policy.

## Tests and exit criteria

Fixture replay, pagination/incremental cursor, duplicate replay, timeout, 429, 5xx, parser drift, malformed content and partial run are tested. Source decision records evidence and allowed use. A bounded sample meets completeness/quality thresholds agreed after sample inspection; coverage is measured by location/category and time. Stop if rights/access conditions are unresolved.

## Rollback/handoff

Disable a source adapter without dropping historic observations. P04 receives a versioned source sample and data dictionary; P06 receives only an approved snapshot.
