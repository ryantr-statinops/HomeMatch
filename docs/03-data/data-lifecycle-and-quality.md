# Vòng đời và chất lượng dữ liệu

> **Trạng thái: mục tiêu, chưa triển khai.** Các lớp dữ liệu là contract logic; cách triển khai vật lý sẽ được quyết định ở giai đoạn platform foundation.

## Các lớp dữ liệu

| Lớp | Nội dung | Quy tắc |
|---|---|---|
| Raw | Payload hoặc artifact nguồn, headers/metadata được phép lưu, thời điểm crawl, source và checksum | Append-only theo lần thu thập; chỉ cho collector ghi; hạn chế truy cập; giữ nguyên bằng chứng cần thiết. Không lưu field bị chính sách nguồn cấm. |
| Normalized | Listing/snapshot, field chuẩn hóa, trạng thái parse/validation, provenance tới raw | Có thể tái tạo từ raw trong giới hạn retention; mỗi transform/schema/taxonomy có version; giữ source value cạnh canonical value. |
| Serving | Bản đọc tối ưu cho search/recommendation: giá, vị trí, tiện ích, availability/freshness và quality flags | Được rebuild từ normalized; không phải nguồn sự thật cho raw; chỉ xuất field đã qua policy và quality gates. |
| ML dataset/artifacts | Dataset version, feature definitions, label provenance, split assignment, evaluation report và model artifact | Tái lập được từ snapshot/transform version; tách dữ liệu train, validation và test theo thực thể/thời gian để hạn chế leakage. |

Luồng tổng quát: `Source → CrawlRun → RawArtifact → ListingSnapshot/Normalized → Quality gates → Serving/DatasetVersion`.

## Provenance và snapshot

Mỗi field chuẩn hóa cần truy vết được tối thiểu tới listing snapshot, source, crawl run và thời điểm quan sát. Với giá trị suy diễn, cần thêm transform version, parse confidence và evidence span/reference khi khả thi. Ghi nhận cả `observed_at` (hệ thống thấy) và `source_updated_at` (nguồn khai báo); không thay thế hai thời điểm cho nhau.

Snapshot được tạo khi có quan sát mới hoặc khi một nội dung quan trọng đổi theo canonical comparison. Hệ thống phải giữ cách so sánh/version để tránh snapshot trùng không cần thiết. Raw artifact trùng bytes có thể content-address bằng checksum nhưng metadata provenance từng lần vẫn được giữ.

## Freshness, availability và expiry

- Độ mới được tính từ lần quan sát thành công gần nhất; hiển thị độ mới ở mức phù hợp cho người thuê.
- Phân biệt `active/available`, `unavailable`, `expired`, `unknown` và trạng thái nguồn khai báo. Mapping cụ thể cần theo nguồn và phải ghi evidence.
- Listing không xuất hiện trong một crawl run có thể do lỗi truy cập, pagination, giới hạn nguồn hoặc bị gỡ; không tự đóng listing ngay.
- Chỉ đánh dấu stale/expired theo chính sách được đo trên từng nguồn, có thời hạn chờ và audit event. Khi không còn tin cậy, ngừng đề xuất listing theo product policy.
- Không tuyên bố “còn phòng” chỉ vì URL vẫn phản hồi hoặc tin còn trong database.

## Kiểm tra chất lượng và cổng xuất bản

Mỗi crawl/transform cần đo và lưu:

- tỷ lệ fetch thành công, parse thành công, timeout/rate limit và dữ liệu mới/cũ;
- completeness của field thiết yếu (giá, vị trí, diện tích, loại hình), tỷ lệ giá/diện tích hợp lệ và đơn vị có thể hiểu;
- duplicate candidate, conflict giữa snapshot, URL lỗi, media lỗi và tỷ lệ tọa độ theo độ chính xác;
- freshness theo source/area, phân phối tuổi tin và số listing còn đủ điều kiện serving.

Gate tối thiểu trước khi đưa một source/area vào sản phẩm: danh tính tin ổn định đủ để upsert; parser có thể phát hiện schema drift; đơn vị giá và vị trí có thể diễn giải; trạng thái freshness/expiry có cách xác minh; dữ liệu có lineage; không có vi phạm điều kiện nguồn đã review. Ngưỡng số cụ thể phải được xác lập từ mẫu khảo sát, không bịa trước khi có dữ liệu.

Nếu gate không đạt, quarantine batch/source hoặc giữ record ở trạng thái không phục vụ. Không âm thầm bỏ field, chuyển sai đơn vị hoặc phát hành dữ liệu lỗi.

## Deduplication và conflict

- Dedup trong một source dùng định danh nguồn/URL trước, fingerprint sau; phiên bản fingerprint được lưu để tái chạy.
- Candidate cross-source dùng bằng chứng kết hợp như vị trí, hình ảnh, diện tích và mô tả. Giá giống nhau hoặc địa chỉ gần giống không đủ một mình.
- Không gộp listing snapshots: lịch sử của mỗi listing giữ riêng kể cả khi chúng có khả năng mô tả cùng room.
- Conflict giữa các nguồn giữ từng assertion với provenance, không ghi đè thành một “sự thật” không có nguồn. Serving có thể chọn/ẩn giá trị theo policy có phiên bản.

## Kiểm thử dữ liệu và tiêu chí nghiệm thu

Fixtures cần bao phủ HTML/JSON đổi cấu trúc, trường vắng mặt, field sai kiểu, giá dạng khoảng/“thỏa thuận”, phí miễn phí/đã gồm, diện tích đổi đơn vị, nội dung trùng và nội dung cập nhật một phần.

Nghiệm thu data pipeline khi:

1. Mỗi record serving truy vết được về snapshot/source/crawl run và transform version.
2. Re-run cùng raw input và cùng transform version tạo kết quả deterministic (trừ metadata chạy được loại trừ rõ).
3. Mất một crawl run không làm listing tự hết hạn; expiry cần evidence hoặc policy source-specific.
4. Thiếu giá/phí/diện tích được giữ khác 0; unknown khác false và not applicable.
5. Duplicate candidate không làm mất lịch sử; conflict giữ được các giá trị nguồn.
6. ML train/test split không chia snapshot của cùng listing/room qua hai tập; báo cáo xác nhận leakage checks.

