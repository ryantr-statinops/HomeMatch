# Historical ingestion

**Trạng thái:** contract mục tiêu; chưa tải dữ liệu thực tế.

Go ingestion tải Binance bulk archive cho lịch sử và public REST cho phần gần hiện tại/reconcile. REST/archives là nguồn canonical cho research snapshots; giá WebSocket trong browser không tự thành warehouse history. Lịch ingestion độc lập đăng nhập và lifecycle tab.

## Adapter và identity

Instrument bắt buộc venue=Binance, market_type=spot, base=BTC/ETH, quote=USDT và native_symbol. Tập interval mục tiêu 15m/1h/1d. Không dùng perpetual candle/funding/OI trong cùng table identity như spot; derivatives deferred.

Adapter giữ request range, source URL, retrieved_at, response schema version, original timestamp unit và checksum. [Archive documentation](https://github.com/binance/binance-public-data) ghi Spot timestamps từ 2025-01-01 dùng microseconds; parser chọn unit theo evidence/product version và fixture quanh transition. REST/WS units kiểm tra theo endpoint options, không áp unit của archive sang mọi response.

## Quy trình

1. Policy/access gate và kiểm tra source coverage/instrument metadata.
2. Enumerate expected files/ranges, download có bounded concurrency theo evidence quota.
3. Verify checksum; failed object vào quarantine và retry có giới hạn.
4. Parse decimals/times, kiểm OHLCV, key uniqueness và bar closure.
5. Reconcile daily/monthly overlap và REST overlap cùng venue; khác payload tạo revision.
6. Publish normalized coverage report và immutable snapshot manifest khi quality gates pass.

Checkpoint theo file/range và content hash, không chỉ “last timestamp”. Archives có thể được sửa; revalidation tạo revision, không ghi đè snapshot cũ. Không hứa archive lịch sử có latency evidence; [availability policy](../04-data/lifecycle-and-quality.md) phân biệt bar-research assumption và observed feed.

Missing range là gap được ghi nhận. Không vá bằng venue khác, không zero-fill volume hoặc forward-fill để giả nến. Dữ liệu thiếu ảnh hưởng feature windows và evaluation coverage. Dùng nến đóng cho features; cutoff decision time và trade execution phải theo Model Lab contract.

## Vận hành và acceptance

Quota/interval/retention chốt bằng P03 tests, headers và current provider docs. 429/backoff có jitter; auth/region/terms error dừng và alert. Không bypass restriction bằng proxy. Tests: checksum sai, partial zip, replay, REST pagination overlap, out-of-order, corrected file, timestamp unit, candle còn mở, symbol mismatch và coverage gap. Price precision/quote currency phải giữ đúng; USDT không là USD.
