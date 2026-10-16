# Research scaffold — inspection only

Module Python standard library (3.11–3.13), chỉ đọc `data/fixtures/market.json`, kiểm tra synthetic marker và in manifest/counts. Chưa có training engine, model, backtest, ingestion hoặc external connection. Training người dùng theo kiến trúc mục tiêu sẽ chạy browser worker; scaffold này không thay quyết định đó.

Từ `services/research`:

```powershell
python -m research
python -m unittest discover -s tests -v
```

Chọn fixture khác: `python -m research --fixture path/to/market.json`. Fixture sai, thiếu hoặc không synthetic trả exit code 2. Chạy không ghi artifact hoặc đọc secret/env.
