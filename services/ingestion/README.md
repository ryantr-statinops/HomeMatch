# Go ingestion scaffold

Trạng thái P01: chỉ đọc fixture synthetic local; không kết nối mạng, scheduler hoặc nguồn live.

Yêu cầu Go 1.27.2. Từ repository root:

```powershell
go -C services/ingestion run ./cmd/ingest
go -C services/ingestion run ./cmd/ingest -fixture ../../data/fixtures/news.json
go -C services/ingestion test ./...
```

Đường dẫn fixture được tính từ thư mục `services/ingestion` khi dùng `go -C`. File phải có `schema_version="1"`, `is_synthetic=true`, `source_id="fixture-only"`, mảng `articles` và ID bài viết không trùng. JSON không hợp lệ hoặc nguồn khác bị từ chối với exit code 1.

Stdout thành công: `mode=fixture-only source=fixture-only articles=N synthetic=true`, với N là số bài trong fixture. Không xuất nội dung bài hoặc credentials. Chưa có dữ liệu thị trường thật; source approval và ingestion live thuộc giai đoạn sau.
