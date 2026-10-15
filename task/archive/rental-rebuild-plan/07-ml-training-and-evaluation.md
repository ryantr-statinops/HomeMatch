# P06 — ML training and evaluation

**Status:** Not started. **Depends on:** P04 dataset snapshot; can run parallel with P05 after that gate.

## Goal and ownership

Build evaluated baselines for recommendation, similar listings and asking-price estimates. ML agent owns reproducible pipeline/model artifacts; coordinator accepts serving interface and quality gates.

## Work sequence

1. Establish coverage, label availability and data leakage audit.
2. Compare simple content/attribute ranking against heuristics before learning-to-rank.
3. Similar listings use interpretable feature distance and category/geography constraints.
4. Asking price uses comparable listings and robust regression/quantile range; describe as listing asking-price reference, not transaction/fair-value guarantee.
5. Version dataset, feature code, parameters, model artifact and evaluation report.

## Evaluation and tests

Use time-based holdout and group all observations of the same listing/room cluster to prevent leakage. Report ranking metrics (e.g. Recall/NDCG@k), price MAE/median absolute error and interval coverage, baselines, sample counts and segment metrics by area/category/source. Handle cold start, sparse area, drift and uncertainty. Never publish unsupported accuracy.

## Exit, fallback and handoff

Only expose model when it beats its agreed baseline on a sufficiently sized held-out slice and uncertainty is communicated. Otherwise ship deterministic ranking and hide price estimate for unsupported segments. Roll back by model version. P07 consumes versioned inference contract.
