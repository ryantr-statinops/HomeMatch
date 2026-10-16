# P03 — Historical market data
**Trạng thái:** chưa bắt đầu.

## Mục tiêu và phụ thuộc
P02 + source eligibility/access/rights gate theo source register.

## Ownership
Data/Go ingestion agent owns adapters/snapshots; coordinator accepts grants/schema/freshness.

## Phạm vi
Binance Spot BTCUSDT/ETHUSDT, 15m/1h/1d historical REST/bulk. Pin venue/symbol/time units, checksums/revisions; independent scheduled acquisition. Derivatives/execution ngoài phase.

## Input/output contracts
Input: approved source permissions và data dictionary. Output: raw lineage, canonical closed candles, dataset manifest/hash/rights versions; browser delivery theo source grant.

## Tasks
RT-MKT-01 source access/rights evidence; -02 bulk/REST adapter; -03 gaps/dedup/corrections; -04 immutable dataset; -05 download contract.

## Kiểm thử và nghiệm thu
ms/µs conversion, checksum mismatch, revisions, duplicate/missing/open bars, pagination/rate limits, unsupported symbol, range/interval and grant denied. Re-run deterministic; no cross-venue merging.

History snapshot eligible cho training/display theo quyền riêng; gaps/corrections có report. Source documented không tự approved; nếu thiếu quyền chỉ dùng synthetic fixture có nhãn.

## Rollback và handoff
Pause source/revert dataset pointer, giữ immutable revisions theo retention. Handoff P05/P06/P07 source-aware snapshots.
