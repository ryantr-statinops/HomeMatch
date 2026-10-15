# Auth và HTTP conventions

**Trạng thái:** contract mục tiêu; provider/token SDK chốt bằng ADR P02.

Managed Auth xử lý đăng ký, xác minh email, login, reset password và refresh theo SDK chính thức của provider được chọn; không tự lưu/hash password. FastAPI kiểm chữ ký JWT, issuer, audience, expiry và accepted algorithms theo cấu hình tin cậy; không lấy issuer/JWKS tùy ý từ request. Provider subject ánh xạ account nội bộ; account ID trong payload không ghi đè identity.

Gateway tạo/kiểm request ID, giới hạn body/rate, timeout và routing. FastAPI là điểm quyết định authorization cho mọi read/write/export/download; không chỉ dựa vào kiểm tra Gateway. Internal API không public bypass auth; service credentials không gửi browser. News/instruments có thể shared nhưng delivery vẫn theo source policy; portfolio/experiments luôn private.

## HTTP và lifecycle

- Version `/api/v1`; thay đổi breaking dùng version mới và migration note. OpenAPI từ implementation phải được so với contracts này khi xây P02.
- JSON UTF-8; timestamp RFC3339 UTC; decimal tiền/quantity là string. Null khác zero và khác field không được gửi.
- Lists dùng cursor opaque, `limit` bounded theo cấu hình, stable order và response `{items,next_cursor}`. Empty list là `200`, không phải lỗi. Không hứa snapshot consistency khi dataset mutable; snapshot endpoint ghi version rõ.
- `Idempotency-Key` cho tạo ledger/import/experiment-result; scope theo account + route, cùng key khác payload trả `409`; retention key khóa P02.
- `expected_revision` cho mutate ledger/config; conflict `409`, không last-write-wins âm thầm.
- Response có `X-Request-ID`; error `{error:{code,message,details},request_id}`. Details chỉ gồm field/row safe, không token, raw news có hạn chế hay dữ liệu account khác.

| Status | Ý nghĩa |
|---|---|
| `400` / `422` | Request không hợp lệ / schema-domain validation fail |
| `401` | Token thiếu/hết hạn/không hợp lệ; refresh theo SDK rồi retry an toàn |
| `403` | Identity hợp lệ nhưng capability/source grant không cho phép |
| `404` | Không tồn tại hoặc resource private ngoài ownership |
| `409` | Revision/idempotency/data-state conflict |
| `413` | Body/artifact/CSV vượt giới hạn |
| `429` | Quota/rate exceeded; trả retry guidance |
| `503` | Upstream/dataset tạm không khả dụng; không thay bằng dữ liệu giả |

Logout dừng requests/subscriptions và Worker đang chạy; xóa state private/cache khỏi memory, draft account-scoped theo policy. Token expired khóa sync/download; config đã lưu có thể tiếp tục sau đăng nhập lại, nhưng không tự nhận output cũ thuộc user khác. UI phân biệt empty, forbidden, stale, offline và provider failure.

## Nghiệm thu

JWT sai issuer/audience/expiry/signature; IDOR trên mọi route và signed download; logout trong import/result upload; user switch cùng browser; cursor sửa; body quá lớn; duplicate retry; error không lộ secret; internal route không thể truy cập trực tiếp từ internet.
