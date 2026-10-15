# Research Terminal
News-first research workspace cho retail trader người Việt: đọc tin theo tài sản, đối chiếu giá, theo dõi danh mục spot và thử nghiệm baseline qua Model Lab form.

## Trạng thái
Đây là target documentation. Repository vẫn chứa HomeMatch legacy; chưa migrate code, account, data feed hoặc deployment. Hoàn thiện docs không chứng minh Binance access/rights hoặc Pyodide performance đã test.

## Tài liệu
- [Documentation index](docs/README.md) và [glossary](docs/glossary.md).
- [Bốn thị trường và source register](docs/03-market-research/README.md).
- [Research Terminal roadmap](task/research-terminal-plan/README.md).
- [Next action](task/next-plan.md).

## Default MVP
Binance Spot BTCUSDT/ETHUSDT, candles 15m/1h/1d; UI tiếng Việt, news-first. Accounts có workspace riêng; portfolio manual/CSV base USDT; experiments private, browser Web Worker training/backtest và client-computed results. Live public market stream theo tab hoạt động; ingestion theo lịch riêng.

Không yêu cầu exchange trading keys. Nguồn miễn phí, quyền train/public display và chi phí hạ tầng phải được kiểm chứng riêng. Các thị trường Mỹ/FX/Việt Nam là nghiên cứu mở rộng. Tên thư mục repo và deployment hiện tại chưa đổi.
