# Spike cục bộ về JWT và cô lập tài khoản

Thư mục này chứa một spike độc lập, không cấu hình nhà cung cấp, không dùng thông tin xác thực thật và không gọi mạng. Test tạo khóa RSA tạm trong bộ nhớ. Mã chỉ minh họa các kiểm tra hợp đồng cần đánh giá trước khi chọn nhà cung cấp; đây không phải triển khai production.

Verifier nhận một tập khóa công khai đã được lấy từ nguồn cấu hình đáng tin cậy. Nó không nhận URL JWKS hoặc issuer từ request. Nó kiểm tra chữ ký RS256 cùng `kid`, `iss`, `aud`, `exp`, `nbf`, `iat` và `sub`. Registry tài khoản dùng cặp `(issuer, subject)`; API quyền sở hữu lọc tài nguyên theo ID tài khoản nội bộ.

PyJWT 2.15.1 được ghim phiên bản trong project. Tài liệu chính thức yêu cầu danh sách `algorithms` phải đến từ cấu hình tin cậy, không được suy ra từ header không tin cậy của token. Luồng Clerk được tài liệu hóa chủ yếu dùng Backend SDK JavaScript (`verifyToken`); Clerk cũng hướng dẫn xác minh thủ công bằng public key/JWKS. Spike Python này dùng JOSE tổng quát, không phải SDK Clerk chính thức cho FastAPI. Cần xác nhận định dạng và claims với token phiên Clerk trong spike nhà cung cấp.

## Chạy test

Từ thư mục này, khi đã cài `uv`:

```powershell
$env:UV_CACHE_DIR = "$PWD/../../.cache/uv"
$env:UV_PROJECT_ENVIRONMENT = "$PWD/.venv"
uv sync --frozen
uv run --frozen pytest
```

Workflow thông thường chỉ dùng lockfile hiện có. Chỉ chạy `uv lock` khi chủ động cập nhật dependency rồi review và commit cùng lockfile. Spike không mô phỏng test nhà cung cấp hoặc email.
