# P04 — Data processing and quality

**Status:** Not started. **Depends on:** P03 accepted source sample.

## Goal and ownership

Transform raw observations into traceable listing records and conservative physical-room clusters. Data agent owns normalization/dedup pipeline; coordinator owns schemas and integration.

## Outputs

- Typed normalized fields preserving raw value, normalized value, confidence and unknown state.
- Listing lifecycle including first/last seen and observed expiry; room cluster links with match confidence/review state.
- Geography normalization with provenance and confidence.
- Quality report by source, category and area; quarantine for malformed/ambiguous records.
- Rebuildable dataset snapshot identified by source runs, transformation version and timestamp.

## Validation

Test unknown versus zero, Vietnamese currency/area/address variants, conflicting repeated observations, changed listing identity, duplicate false positives, stale/expired source, invalid geo and complete reprocessing from raw fixtures. Dedup precision/recall is sampled manually before automatic room-level merging.

## Exit, rollback and handoff

No record loses source lineage; every serving record has quality/freshness state. Reprocessing a snapshot is deterministic. Roll back by selecting prior transform/dataset version, not mutating raw. P05/P06 consume a frozen accepted snapshot.
