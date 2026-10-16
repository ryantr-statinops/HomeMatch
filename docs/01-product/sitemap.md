# Sitemap
**Trạng thái:** route định hướng, chưa triển khai.

| Khu vực | Chức năng / quyền |
|---|---|
| / | Giới thiệu sản phẩm và dữ liệu/giới hạn |
| /demo | Workspace mẫu, chỉ đọc, không dữ liệu account |
| /auth/* | Đăng ký/đăng nhập/xác minh/reset theo managed provider |
| /terminal/news | News feed, source/event/time filters |
| /terminal/assets/:instrumentId | Chart, source identity, news và watchlist |
| /workspace/watchlists | Watchlist private |
| /workspace/portfolios | Ledger, imports, valuation, P&L private |
| /workspace/lab | Form, datasets, browser capability và chạy experiment |
| /workspace/experiments/:id | Config, run status, metrics/artifact private |
| /account | Profile/session và xóa dữ liệu theo policy |

Business API không tự public vì biết URL. Public published reports phải có authorization/publishing policy riêng, không chỉ bỏ auth khỏi route private.
