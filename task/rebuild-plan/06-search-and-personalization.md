# P05 — Search and personalization

**Status:** Not started. **Depends on:** P04.

## Goal and ownership

Deliver useful search without a trained model: hard filters, transparent weighted ranking and reason strings. Search/product agent owns ranking behavior; API coordinator owns exposed contract.

## Inputs/outputs

Input: structured renter criteria (budget, areas/location, room type, move timing and amenities), listing quality/freshness, optional anonymous-session preferences. Output: eligible listing IDs, stable rank, matched/missing criteria, freshness and explanation codes.

## Behavior

Hard constraints remain hard; soft preferences affect ranking and are visible to users. Empty result does not silently relax constraints. Cold start works from explicit preferences; unprovided fields remain unknown. Feedback may update anonymous session preference only with privacy-approved behavior.

## Tests and exit criteria

Test filter/rank determinism, tie break, missing values, no results, stale listing exclusion, cold start, preference update, explanation fidelity, fairness across source/area, and fallback when ML is unavailable. Offline ranking has a documented baseline/curated relevance set before model integration.

## Rollback/handoff

Feature flag new ranking and return to deterministic baseline. P07 consumes stable API and explanations; P06 may propose a ranker behind same interface.
