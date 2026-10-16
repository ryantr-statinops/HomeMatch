# Capability contracts v1

**Trạng thái:** thiết kế route mục tiêu; payload chi tiết được OpenAPI triển khai trong phase sở hữu, không coi endpoint đã chạy.

| Capability / route đề xuất | Hành vi tối thiểu |
|---|---|
| `GET /me`, `GET /workspaces` | Identity và workspace thuộc account; onboarding tạo workspace riêng idempotently |
| `GET/POST /workspaces/{id}/watchlists` | List/create watchlist owner-scoped |
| `PUT/DELETE /watchlists/{id}/items/{instrument_id}` | Thêm/xóa instrument được hỗ trợ; idempotent |
| `GET /instruments` | Venue, spot/base/quote/native symbol, supported intervals và source status |
| `GET /news`, `GET /news/{id}` | Metadata/link/content theo grant, asset/event filters, revisions, source/time |
| `GET /market/candles` | Instrument/interval/range, nến đóng và coverage/gaps; dữ liệu được quyền phân phối |
| `GET /market/quotes` | Snapshot có source/observed_at/stale, phục vụ reconnect và valuation |
| `GET/POST /workspaces/{id}/portfolios` | List/create portfolio base USDT |
| `GET/POST /portfolios/{id}/transactions` | Ledger/revision; create validate replay nguyên tử |
| `PATCH/DELETE /portfolios/{id}/transactions/{event_id}` | Sửa/xóa với expected revision và replay |
| `GET /portfolios/{id}/summary`, `GET /portfolios/{id}/equity` | Cash/holdings/P&L/cashflows, valuation source và incomplete/stale |
| `POST /portfolios/{id}/imports/preview` | Schema validation, duplicate report và preview token gắn owner/revision |
| `POST /portfolios/{id}/imports/{import_id}/commit` | Commit nguyên tử, idempotency, reject preview cũ |
| `GET /datasets`, `GET /datasets/{id}/manifest` | Snapshot metadata, eligibility và quyền user trước delivery |
| `POST /datasets/{id}/download-grants` | URL ngắn hạn/stream có scope, expiry, bytes và integrity hash |
| `GET/POST /workspaces/{id}/experiments` | Private configs; schema version, revision và runtime versions |
| `GET/PATCH /experiments/{id}` | Read/update config riêng, optimistic revision |
| `POST /experiments/{id}/results`, `GET /experiments/{id}/results` | Sync/read client-computed result; không thực thi model |
| `GET /demo/reports`, `GET /demo/reports/{id}` | Chỉ sample reports được server tuyển chọn/publication policy |

Không có `POST /train` như contract mặc định. Dataset không đủ quyền trả source-policy error; không âm thầm trả raw full text vào browser. Watchlist không tự mở rộng instrument scope ngoài BTCUSDT/ETHUSDT v1. Portfolio payload tuân [ledger](../07-portfolio/ledger-and-valuation.md) và [CSV](../07-portfolio/imports-and-ownership.md).

Mỗi response aggregate ghi `as_of`, nguồn/version và coverage khi có giá trị thời gian. API UI news có thể lọc theo published time; export nghiên cứu phải dùng availability policy của snapshot, không suy ra point-in-time từ date filter UI.
