# API nội bộ: FastAPI và ML

> **Trạng thái:** mục tiêu kiến trúc, chưa triển khai theo contract này.

## FastAPI ownership

FastAPI xử lý domain logic, đọc dữ liệu phục vụ, validate business constraints, điều phối recommendation và price estimate, đồng thời áp dụng fallback. Go Gateway không định nghĩa lại semantics. Các route nội bộ không public qua browser; quyền truy cập service-to-service được giới hạn theo môi trường triển khai.

## ML inference contract

FastAPI gọi Python inference bằng input đã chuẩn hóa. Contract tối thiểu gồm operation, feature/query contract version, request ID, model policy/version tùy chọn và dữ liệu đầu vào không định danh. Output gồm kết quả có thứ tự hoặc estimates, trạng thái đủ dữ liệu, model version, thời điểm tạo, uncertainty và lý do/fallback có thể kiểm tra. Chi tiết wire format được định nghĩa khi chốt service interface; không truyền object ORM hoặc schema DB thô qua ranh giới service.

Inference phải kiểm tra feature version và input range, giới hạn batch size, có timeout hữu hạn, không tự tải model mới trong request. Lỗi model được phân biệt khỏi kết quả hợp lệ không có candidate. FastAPI áp dụng baseline fallback theo [recommendation](../05-ml/recommendation.md) và [price estimate](../05-ml/asking-price.md).

## Versioning và an toàn vận hành

Mỗi request/response nội bộ mang trace/request ID. Thay đổi feature contract gây không tương thích cần version contract mới; khi deploy có giai đoạn tương thích để API và model không bị lệch. Log không chứa raw PII hoặc đầy đủ nội dung listing; ghi model version, outcome, latency và mã lỗi ở mức cần thiết.

Internal API không được dùng làm hàng đợi crawl/training. Batch jobs chạy tách biệt và xuất dữ liệu/artifact có version; API chỉ đọc snapshot/model đã được chấp nhận.
