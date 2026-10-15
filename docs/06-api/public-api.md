# API công khai qua Gateway

> **Trạng thái:** mục tiêu, chưa được triển khai. Tài liệu mô tả khả năng và quy tắc; schema chi tiết sẽ được khóa cùng implementation phase sau khi data contracts ổn định.

## Các khả năng

- Tìm kiếm/gợi ý listing theo nhu cầu, bộ lọc bắt buộc, preference có trọng số và vị trí mong muốn.
- Lấy chi tiết tin đăng, gồm trường đã biết, trường thiếu, lần xác minh gần nhất và nguồn được phép công khai.
- Lấy tin tương tự cho một listing còn hợp lệ.
- Lưu hoặc bỏ qua tin qua session ẩn danh; frontend cũng có thể giữ saved listings cục bộ để dùng không cần đăng nhập.
- Nhận thông tin khoảng giá chào thuê nếu model có hỗ trợ khu vực và loại listing đó.

## Request semantics

API dùng version prefix `/api/v1`. Search request mang tập filter cứng, preference mềm, tùy chọn vị trí/điểm đến và tham số phân trang. Không có yêu cầu nào đồng thời được coi là hard filter lẫn sở thích mềm. Backend phải validate kiểu, miền giá trị, kích thước danh sách và tọa độ; input không hợp lệ trả 4xx có mã lỗi ổn định.

Pagination dùng cursor hoặc cơ chế ổn định tương đương; thứ tự tie-break deterministic để không lặp hoặc bỏ qua tin giữa các trang khi dataset ít thay đổi. API giới hạn page size và kích thước query. Sort/ranking mặc định là relevance; client không thể yêu cầu sort tùy ý theo trường nội bộ.

## Kết quả và trạng thái

Response search cần phân biệt tìm thành công có kết quả, thành công không có kết quả, và không thể tạo kết quả. Listing item trả định danh listing, thuộc tính đã chuẩn hóa, điểm/lý do nếu có, trạng thái freshness và chỉ báo missingness cần cho UX. Không cam kết giá hay tình trạng còn phòng nếu chưa xác minh.

Khi ML không sẵn sàng, backend dùng baseline nếu dữ liệu còn phục vụ được và gắn trạng thái kết quả phù hợp. Nếu không thể hoàn tất cả baseline, trả lỗi dịch vụ có thể retry. Khi model/dataset quá cũ, trả baseline hoặc không có estimate theo policy; không ngầm trả output cũ như mới.

## HTTP và lỗi

- Dùng mã HTTP theo loại kết quả: validation/authentication/rate limiting, not found, conflict hoặc lỗi dịch vụ.
- Body lỗi có error code ổn định, message an toàn và request ID; field validation có thể chỉ ra vị trí lỗi.
- `no_results` là kết quả nghiệp vụ hợp lệ, khác với timeout, provider unavailable hoặc dữ liệu không thể đọc.
- Timeout phía client/proxy phải có giới hạn hữu hạn. Search không được chờ crawler hoặc training job.
- Cache chỉ áp dụng khi phù hợp với cá nhân hóa và freshness; không cache phản hồi theo session bằng khóa dùng chung.

## Tương thích

Thay đổi additive có thể thêm field optional mà client cũ bỏ qua. Đổi nghĩa field, loại bỏ field bắt buộc hoặc thay semantics cần API version mới và thời gian chuyển đổi. OpenAPI là artifact sinh/duy trì cùng implementation; tài liệu này không phải căn cứ để giả định endpoint đã tồn tại.
