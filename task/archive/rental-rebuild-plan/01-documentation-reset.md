# P00 — Documentation reset

**Status:** Complete; awaiting user review before codebase reset.

## Goal and dependencies

Replace the lead-generation/Admin/roommate documentation with a consistent target system for renter discovery and personalized recommendations. No code, database, crawl or deployment changes in this phase. Starts from the accepted user choices in this conversation and current repository inventory.

## Ownership and work packages

- Coordinator: `docs/README.md`, `docs/02-architecture/**`, `docs/08-engineering/**`, `docs/09-operations/**`, all `task/rebuild-plan/**` and root/task entrypoints.
- Product/UI agent: `docs/01-product/**`, `docs/07-ui-ux/**`.
- Data/crawl agent: `docs/03-data/**`, `docs/04-crawling/**`.
- ML/API agent: `docs/05-ml/**`, `docs/06-api/**`.
- Coordinator owns integration/review and moves obsolete plans; agents do not commit.

## Outputs

Nine indexed docs domains, root navigation, decision log, glossary alignment, A–Z phase plan, archived old execution plans and historical session-log notice. Distinguish current implementation from target/not implemented throughout.

## Checks and acceptance

- All markdown links resolve; every domain README links its documents.
- No old product rule is presented as current; archive is clearly historical.
- Shared terms distinguish listing, physical room, source observation, raw snapshot, recommendation, asking-price estimate and unknown value.
- Service responsibilities and geography/ML limitations agree across docs.
- No unsupported source, crawl permission, coverage or model-quality claim.
- Existing source tree, DB and deploy files unchanged.

## Rollback and handoff

Focused Git commits allow reverting each documentation domain independently. Once index/link review passes, accept P00 and hand off to P01 inventory/reset. Preserve session logs as history.

## Completion evidence

- Nine domain indexes and target documentation authored; shared product/architecture/data/API/ML terminology reviewed.
- Superseded product docs removed and old execution plans moved to `task/archive/`.
- Relative Markdown links validated across 94 docs/task files.
- Source, database and deployment code paths were not edited.
