# Research Terminal — documentation

**Trạng thái:** phần nghiệp vụ là kiến trúc mục tiêu. Code hiện tại là scaffold fixture React/Vite, Go Gateway, FastAPI và CLI; xem [setup hiện tại](../README.md). Auth, feed thật, portfolio và browser Model Lab chưa triển khai. Runtime fixture không chứng minh source access/rights hoặc khả năng model.

## Bắt đầu

1. [Glossary](glossary.md) và [sản phẩm](01-product/README.md).
2. [Kiến trúc và ADR](02-architecture/README.md).
3. [Khảo sát bốn thị trường](03-market-research/README.md).
4. [Dữ liệu](04-data/README.md), [news ingestion](05-news-ingestion/README.md), [market data](06-market-data/README.md).
5. [Portfolio](07-portfolio/README.md), [Model Lab](08-model-lab/README.md), [API](09-api/README.md).
6. [UI/UX](10-ui-ux/README.md), [engineering](11-engineering/README.md), [operations](12-operations/README.md).
7. [Roadmap](../task/next-plan.md).

## Nguồn sự thật

Mỗi domain sở hữu định nghĩa trong thư mục tương ứng. Glossary sở hữu thuật ngữ; architecture sở hữu boundaries/ADR; data sở hữu timestamps/manifest; portfolio sở hữu ledger; Model Lab sở hữu experiment/evaluation; API sở hữu wire contracts; roadmap sở hữu trạng thái triển khai. Khi thay contract, cập nhật tài liệu chủ sở hữu và các consumers cùng thay đổi.

## Mục tiêu đã chốt

Crypto trước: Binance Spot BTCUSDT/ETHUSDT, UI tiếng Việt, candles 15m/1h/1d, intraday và vài ngày/tuần. Multi-account với workspace riêng; portfolio manual/CSV base USDT. Training/backtest chạy trong browser Web Worker; Pyodide phải qua feasibility spike. Live public WebSocket theo tab hoạt động; news/history ingestion theo lịch độc lập.

## Cách đọc bằng chứng

Tài liệu ghi rõ accepted scope, documented source, chưa access-tested, quyền chưa xác nhận và implementation chưa bắt đầu. Không đồng nhất API miễn phí với quyền train/display hoặc hosting miễn phí. Ba thị trường còn lại là nghiên cứu mở rộng, không phải tính năng MVP.
