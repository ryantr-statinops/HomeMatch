# Quotas, chi phí và observability
**Trạng thái:** cần baseline thực để khóa limits.

## Ngân sách
Theo dõi data API calls, scheduled runtime, DB/storage/egress, auth/email, browser runtime asset bandwidth và log retention. Training client tiết kiệm server compute nhưng không loại chi phí dataset delivery và ingestion. Không đưa paid news/LLM thành dependency miễn phí.

P02 benchmark để khóa dataset rows/features, worker concurrency trong tab, payload/artifact caps, hidden-tab grace, download timeouts và supported browsers. P03/P04 chốt request/source/freshness thresholds; P09 quota/account và alerts. Limits chưa đo phải ghi pending, không quảng cáo unlimited.

## Signals
- Ingestion run outcome/lag/429/parser drift/source revisions.
- Market gaps/duplicates/open bars/unit mismatch/reconnect/rest backfill failures.
- News publication-to-seen lag, duplicate clusters, asset mapping confidence.
- Auth/ownership failures, request IDs/latency/rate-limit.
- CSV errors/duplicates, stale valuation.
- Worker capability/load/train duration/cancel/crash/interrupted và result-sync failure (không thu raw personal data mặc định).
- Source grants changes, storage growth và budget usage.

Public client metrics chỉ là telemetry được phép, không bằng chứng kết quả model đúng. Incident dashboard tách source unavailable, application failure và unsupported browser.
