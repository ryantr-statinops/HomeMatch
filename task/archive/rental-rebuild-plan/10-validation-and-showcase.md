# P09 — Validation and showcase

**Status:** Not started. **Depends on:** P07 and P08 acceptance.

## Goal

Demonstrate a repeatable renter journey and honest end-to-end data/ML system, with evidence of usefulness, data limits and operational recovery.

## Validation work

- Run full unit/contract/integration/E2E checks on locked fixture/sample snapshot.
- Independently review source compliance, provenance, expiry, duplicates and geography coverage.
- Compare ranking against deterministic baseline; report metrics and sample sizes.
- Validate asking-price interval/calibration by supported region/category or hide unsupported slices.
- Exercise cold start, no result, all-stale input, API timeout, ML offline, crawler failure/replay and rollback.
- Prepare seeded demo that does not imply synthetic records are live listings.
- Document reproducible local commands, environment requirements, known limitations and next measured milestone.

## Ownership, acceptance and handoff

Coordinator owns acceptance record; reviewer agent checks claims against evidence; product agent checks user-visible wording. Complete only when demo is reproducible, critical scenarios pass, limitations are visible, and a recovery path is exercised. If any gate fails, record blocker and return to owning phase; do not claim MVP complete.
