# Public market-data access probe

Spike opt-in, không phải ingestion production. Sáu request chỉ đọc public Binance REST cho BTCUSDT/ETHUSDT × 15m/1h/1d, 3 nến mỗi request; không dùng API key, không proxy và không thử endpoint thay thế khi bị chặn. Chỉ lưu status/count/quality metadata, không lưu raw price series.

Từ repo root:

```powershell
python experiments/market-access/probe.py --allow-network
```

Lệnh ghi đè `task/research-terminal-plan/evidence/p02-binance-rest-probe.json` bằng kết quả môi trường chạy hiện tại. Không chạy trong CI mặc định. Evidence gốc ngày 2026-10-16 là shell local của coordinator, không chứng minh browser CORS, hosting region, WebSocket hoặc quyền redisplay/ML.

Kết quả: 6/6 HTTP 200, shape 12 fields, thời gian mở tăng; mỗi response có 2 nến đã đóng và 1 nến chưa đóng tại thời điểm kiểm tra. Adapter nghiên cứu sau này phải lọc nến chưa đóng và kiểm gap/dup/unit; probe này chưa làm backfill/normalization/dataset snapshot.

Contract gốc: [market-data-only](https://github.com/binance/binance-spot-api-docs/blob/master/faqs/market_data_only.md), [REST klines](https://github.com/binance/binance-spot-api-docs/blob/master/rest-api.md#klinecandlestick-data). Kiểm access độc lập với rights; source approval vẫn chưa đạt.
