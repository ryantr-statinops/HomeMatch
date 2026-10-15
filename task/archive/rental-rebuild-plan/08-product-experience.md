# P07 — Product experience

**Status:** Not started. **Depends on:** P05 accepted API; P06 baseline/fallback contract.

## Goal

Implement the end-user journey in React/Vite: express needs, browse ranked listings, understand why, inspect details, compare/save and provide optional feedback.

## Ownership

Web/product agent owns routes/components/accessibility; API agent owns integration compatibility; coordinator resolves shared UX/API changes.

## Acceptance

Responsive keyboard-usable flow works without account; session/local save behavior is explained and privacy-reviewed. Results show freshness/unknown fields and recommendation reasons. Price estimate includes range/context only when supported. No-results, source stale, loading, API failure, ML unavailable and image unavailable have designed states. Listing detail links to its source where allowed. User is not told listing availability is verified unless freshness supports that statement.

## Tests and rollback

Automated E2E covers preference-to-result, filter editing, detail, compare/save, anonymous feedback and all degraded states. Feature flags allow reverting recommendation detail to baseline listing search.
