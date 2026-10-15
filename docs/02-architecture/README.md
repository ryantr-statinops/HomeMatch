# Kiến trúc

Tài liệu trong thư mục này mô tả kiến trúc đích, ranh giới chịu trách nhiệm và quyết định kỹ thuật. Đây là kế hoạch, chưa phản ánh code đã migrate.

- [System architecture](system-architecture.md): thành phần, ownership và luồng dữ liệu/request.
- [Technology stack](tech-stack.md): runtime đích và lý do chọn.
- [Repository structure](folder-structure.md): cấu trúc workspace dự kiến.
- [Architecture decisions](decisions.md): quyết định và điều kiện cần xem xét lại.

## Quy tắc

Frontend không truy cập trực tiếp database hoặc crawler. Gateway không chứa domain logic. FastAPI là chủ sở hữu nghiệp vụ sản phẩm và public/internal API; Python ML là provider có thể lỗi độc lập. Crawl và training là batch workload. Hợp đồng phải cho phép thay nhà cung cấp lưu trữ mà không đổi khái niệm dữ liệu.
