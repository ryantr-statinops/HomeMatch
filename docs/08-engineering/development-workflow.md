# Development workflow

## Setup mục tiêu

1. Cài runtime được khóa trong toolchain/lockfiles của từng workspace.
2. Copy file env example; dùng database/object storage local hoặc fixture an toàn.
3. Chạy frontend, gateway, FastAPI và ML adapter qua lệnh workspace được định nghĩa trong giai đoạn foundation.
4. Crawler chỉ chạy với fixture/mock source mặc định; network crawl phải bật tường minh trong môi trường cho phép.

Command thực tế, phiên bản compiler và cách bootstrap database sẽ được ghi sau khi lựa chọn và kiểm chứng, không đoán trước từ codebase hiện tại.

## Nguyên tắc thay đổi

- Mỗi service sở hữu package/dependency và kiểm thử riêng.
- API contract thay đổi phải cập nhật OpenAPI/client/contract checks cùng commit.
- Không truy cập database từ frontend hoặc Gateway.
- Không đưa source credentials, crawl raw data, PII hoặc model binaries vào Git.
- Dùng fixtures nhỏ có license/source rõ cho test.
- Một thay đổi nên có task ID trong `task/rebuild-plan/` và nêu kết quả đo/verification.
