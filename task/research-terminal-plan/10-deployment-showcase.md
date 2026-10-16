# P09 — Deployment và showcase
**Trạng thái:** chưa bắt đầu.

## Mục tiêu và phụ thuộc
P02 preview available; public release depends P05–P08 and source rights.

## Ownership
Operations agent owns environments/runner/monitoring; coordinator owns release decision and spend limits.

## Phạm vi
Vercel web/HTTP APIs, external ingestion schedule, managed Auth/storage, browser runtime assets. Public demo explicit synthetic/licensed samples; no personal workspace.

## Input/output contracts
Output: provider/env manifests, quota/retention/observability, documented costs, rollout/recovery runbooks and reproducible demo.

## Tasks
RT-OPS-01 runtime/deploy spike; -02 scheduled ingestion/alerts; -03 budgets/secrets/source policies; -04 recovery; -05 release evidence.

## Kiểm thử và nghiệm thu
Preview isolation, migrations/restore, source failure/cost alerts, stale data, revoked session/grant, package delivery fail and rollback. Public price/news rights checked distinct from private API access.

Source/region/support/claims gates pass or capability limited with labels. No training server job fallback. Record code/data/runtime/source policy versions.

## Rollback và handoff
Rollback web/API separately, pause source, select prior dataset; do not revive revoked credentials. Handoff support/known limitations và P10 readiness.
