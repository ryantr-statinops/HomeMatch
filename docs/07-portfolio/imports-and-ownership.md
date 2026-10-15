# Nhập liệu và account ownership

**Trạng thái:** thiết kế mục tiêu, chưa triển khai.

## Manual và CSV

CSV UTF-8 có header cố định:

```csv
external_id,type,occurred_at,sequence,instrument_id,quantity,price,fee_amount,fee_currency,cash_amount,cost_basis
trade-001,buy,2026-10-16T01:00:00Z,1,binance:spot:BTCUSDT,0.001,65000,0.065,USDT,,
```

`instrument_id` dùng identity canonical có venue/market. `cash_amount` dùng cho deposit/withdraw; `cost_basis` là tổng USDT của opening/transfer-in. Các trường không áp dụng để trống, không điền zero giả. Decimal dùng dấu chấm; timestamp bắt buộc offset/UTC. Không đoán locale ngày hoặc currency từ tên cột. Với trade, `fee_currency` bắt buộc là `USDT` kể cả fee zero; preview reject BTC/ETH/BNB hoặc currency khác, không tự quy đổi v1.

Luồng: upload → parse/validate → preview row errors, cash/inventory cuối và warnings → user commit import. Upload/preview không thay ledger. Commit kiểm tra lại ledger revision; nếu ledger đã đổi trả conflict và yêu cầu preview lại. File không được thực thi, parse theo schema, giới hạn bytes/rows khóa P02; quá giới hạn reject trước replay.

Idempotency key giữ cùng request không tạo import/giao dịch mới. `external_id` unique trong `(portfolio, source)`; cùng ID khác nội dung là conflict. Nếu không có ID, tính fingerprint trên các field canonical; đánh dấu duplicate để user review, không âm thầm bỏ các giao dịch giống nhau nhưng có thể hợp lệ. Hai giao dịch cố ý trùng cần external IDs/sequence khác và xác nhận rõ.

Commit toàn import nguyên tử: có lỗi thì không ghi một phần. Trả import ID, số row accepted/rejected và mapping row → event. Raw CSV có retention giới hạn và quyền riêng; không đưa nội dung vào log. Lỗi chỉ nêu row/field/reason, không lộ tài khoản khác.

## Sửa sai và vòng đời

V1 sửa/xóa event qua revision API có expected revision và audit metadata; server replay ledger nguyên tử. Không sửa balances trực tiếp. Snapshot/materialized holdings chỉ là cache có thể dựng lại. Xóa portfolio cần xác nhận trong UI và policy retention được tài liệu hóa ở operations; không ngầm xóa account hoặc experiments.

FastAPI suy account từ JWT, kiểm tra workspace/portfolio ownership trong read/write/import/download. Client gửi `account_id` không được chọn chủ sở hữu. Resource ID thuộc account khác trả `404`; danh sách luôn scope theo account. Export/download và signed object URLs phải có cùng quyền và TTL ngắn; không public bucket cho dữ liệu user.

Logout/expired session dừng live subscriptions, xóa token theo SDK provider, xóa state private trong memory và query caches. Không lưu transaction/experiment results trong cache dùng chung; đổi account phải tạo cache namespace mới. Dữ liệu local phục vụ draft gắn account và được xóa khi logout; không dùng browser storage như cơ chế authorization.

Public demo là sample workspace/report đã tuyển chọn, có asset synthetic/được cấp quyền. Không biến portfolio cá nhân thành public bằng một client flag.

## Nghiệm thu

CSV sai timezone/decimal/fee currency; thiếu opening basis; duplicate ID khác payload; preview trên revision cũ; double submit; backdated negative balance; retry sau timeout; export chéo account; đổi user cùng browser; public demo không chứa CSV/ledger cá nhân.
