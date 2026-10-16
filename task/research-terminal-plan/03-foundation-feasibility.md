# P02 — Foundation và feasibility
**Trạng thái:** đang thực hiện các spike độc lập; chưa hoàn tất provider/account/storage integration hoặc browser lifecycle acceptance. Xem [execution board](p02-execution-board.md), [Auth](p02-auth-feasibility.md), [browser](p02-browser-feasibility.md), [legacy status](p02-legacy-status.md).

## Mục tiêu và phụ thuộc
P01; canonical ADR/API/model/data contracts.

## Ownership
Coordinator owns ADR/provider/limits. Agents độc quyền web/browser spike, FastAPI/auth/storage, Go Gateway/ingestion scaffold.

## Phạm vi
Managed Auth/JWT và account/workspace isolation; lock toolchains, OpenAPI/worker manifests. Spike direct public Binance WS từ browser và Pyodide models trong module Worker. Chưa claim nguồn approved hoặc user models server-verified.

## Input/output contracts
Output: runnable fixture stack, provider ADR với email/quota/token/cost evidence, browser/runtime report và caps, CI offline fixtures. Metadata DB/object adapter không truy cập legacy project mặc định.

## Tasks
RT-FOUND-01 managed Auth/provider ADR; -02 tenant/JWT checks; -03 WS region/CSP/lifecycle spike; -04 Pyodide package/solver spike; -05 toolchains/CI/quotas.

## Kiểm thử và nghiệm thu
Owner spoof/JWT issuer/audience/expired; no secret in client; hash/version errors. Browser test 5k/25k/50k rows, cold/warm/memory/cancel/UI responsiveness; WS visible/hidden/reconnect/account switch. Không coi 50k là supported trước đo.

Khóa providers, versions, dataset/features/artifact limits, support browsers và grace/timeout bằng report. Nếu Pyodide/WS không đạt, dừng gate và trình ADR alternative; không tự chuyển training server.

## Rollback và handoff
Feature flag/browser unsupported view-only; revert scaffold/migration additive. Handoff P03/P04/P05/P06/P07 verified contracts và budgets.
