# Evaluation & security report (Phase 5)

**Trạng thái:** audit completed 2026-10-17 (idea-new foundation). Scope limited to frontend foundations required for Phase 2.

## 1. Source rights (Binance public market data)

- **MVP scope:** Binance Spot BTCUSDT/ETHUSDT, candles 15m/1h/1d (RT-ADR-005).
- **Access:** Public REST/WebSocket, no API key required (RT-ADR-006).
- **Rights gate:** Source eligibility/access/rights must be verified before production ingestion (RT-ADR-003). Current implementation uses synthetic fixtures only (`source_id=fixture-only`, `is_synthetic=true`).
- **Conclusion:** Fixture-only. No real Binance data ingested. Source rights verification deferred to Phase 6 (live stream) gate.

## 2. Credential / legacy scan

- **Secret scan:** No private keys, AWS keys, OpenAI keys, or GitHub tokens found in tracked source (excluding check script itself).
- **Legacy references:** Zero matches for `homematch`, `phongtro`, `supabase`, `apps.script`, `google.console`, `oauth.grant`, `service.account`, `HomeMatch`, `retirement` in tracked source.
- **Ignored files:** `.env.local`, `scripts/*.json` ignored per `.gitignore`. No credential files present in repo.
- **Environment boundaries:** `npm run security:env-boundaries` passes — only `VITE_API_BASE_URL` approved public env var; no dynamic server env access; no credential markers.

## 3. Dependency audit

- **npm audit:** 0 vulnerabilities after `npm audit fix` (2 high fixed: brace-expansion, js-yaml — both dev deps).
- **Frontend deps:** React 19, Vite 8, Tailwind 4, React Router 7, TanStack Query 5, @base-ui/react 1.5. No known high-severity issues.
- **Python:** FastAPI/Pydantic via uv lock (frozen). No audit tool run (safety not installed); recommend `pip-audit` before production.
- **Go:** Not available in this environment (Go 1.27.2 not on PATH). Tests not run locally; CI runs them.

## 4. Accessibility verification

| Check | Status | Evidence |
|-------|--------|----------|
| Keyboard navigation | ✅ | Interactive elements use `<button>`/`<a>` with native tab order |
| Focus visibility | ✅ | `a:focus-visible` outline in styles.css; buttons rely on browser default + `focus-visible` |
| Reduced motion | ✅ | `@media (prefers-reduced-motion: reduce)` disables transitions/animations |
| Color not sole indicator | ✅ | Market up/down use text color + numeric sign (±); watchlist uses ★/☆ |
| Semantic HTML | ✅ | `<table>`, `<thead>`, `<tbody>`, `<article>`, `<section>`, `aria-labelledby`, `role="tablist"` |
| ARIA labels | ✅ | Filter tabs have `aria-selected`; watchlist toggle has `aria-pressed`/`aria-label` |
| Contrast | ⚠️ Not measured | Need axe/Lighthouse audit; recommend before production |
| Screen reader tables | ⚠️ Partial | Tables lack `<caption>`; add in Phase 6 polish |

## 5. State coverage

All six states defined in `design-tokens.md` and implemented where applicable:

| State | MarketPage | NewsPage | PortfolioPage |
|-------|-----------|----------|---------------|
| Loading | ✅ skeleton | ✅ skeleton | — (localStorage sync) |
| Error | ✅ + retry | ✅ + retry | — |
| Empty | ✅ | ✅ | ✅ |
| Stale | — (Phase 6) | — | ⚠️ valuation time shown |
| Refreshing | — (Phase 6) | — | — |
| Partial | — | — | — |

## 6. Chart cleanup

No chart components implemented yet (Phase 6). Cleanup pattern documented in `design-tokens.md` §Chart cleanup. Must be verified when TradingView Lightweight Charts is added (RT-ADR-017).

## 7. Unresolved issues

1. **Contrast ratios not measured** — need axe/Lighthouse audit before production.
2. **Table captions** missing for screen readers — add in polish phase.
3. **Python/Go audits not run** locally (tooling not installed).
4. **Source rights** for Binance public data not formally verified (fixture-only).
5. **No auth provider selected** — RT-ADR-008 deferred (managed auth, provider TBD).

## 8. Conclusion

Frontend foundations (Phase 1–4) pass all available checks. No secrets in repo. No high-severity dependency vulnerabilities. Accessibility basics in place; contrast and table captions need polish. Ready for Phase 6 (live stream) and Phase 7 (Model Lab) when source rights and browser feasibility are confirmed.
