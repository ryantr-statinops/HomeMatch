# Research Terminal

News-first research workspace cho retail trader người Việt: đọc tin theo tài sản, đối chiếu giá, theo dõi danh mục spot và thử nghiệm baseline qua Model Lab form.

## Trạng thái

Idea mới: Binance Spot BTCUSDT/ETHUSDT, candles 15m/1h/1d, UI tiếng Việt, news-first. Không có auth/account legacy, không kết nối exchange trading keys. Codebase hiện tại là fixture shell (React/Vite + FastAPI + Go Gateway) để phát triển giao diện; chưa có feed thật, portfolio hay Model Lab runtime.

## Chạy bản fixture local

Node 22.23.1/npm 10.9.8, Go 1.27.2, Python 3.11–3.13 và uv 0.11.28. Dependencies JS được pin trong `package-lock.json`, API trong `services/api/uv.lock`.

```powershell
npm ci
npm run dev
```

Web: http://127.0.0.1:5173/terminal/news. Routes: `/terminal/market`, `/terminal/news`, `/terminal/portfolio`, `/terminal/model-lab`, `/terminal/account`. Không cần credential hoặc API để xem fixture. Để thử API, chạy riêng [FastAPI theo hướng dẫn](services/api/README.md), rồi terminal khác:

```powershell
go -C services/gateway run ./cmd/gateway
```

Web proxy `/api` qua gateway port 8080 đến API port 8000. Chỉ gọi localhost; dữ liệu synthetic nằm tại [data/fixtures](data/fixtures/README.md).

## Tài liệu

- [Documentation index](docs/README.md) và [glossary](docs/glossary.md).
- [Vision & scope](docs/01-product/vision-and-scope.md).
- [Next action](task/next-plan.md).

## Default MVP

Binance Spot BTCUSDT/ETHUSDT, candles 15m/1h/1d; UI tiếng Việt, news-first. Portfolio manual/CSV base USDT; experiments private, browser Web Worker training/backtest và client-computed results. Live public market stream theo tab hoạt động; ingestion theo lịch riêng.

Không yêu cầu exchange trading keys. Nguồn miễn phí, quyền train/public display và chi phí hạ tầng phải được kiểm chứng riêng. Các thị trường Mỹ/FX/Việt Nam là nghiên cứu mở rộng. Tên thư mục repo và deployment hiện tại chưa đổi.
