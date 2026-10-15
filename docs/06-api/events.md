# Hợp đồng sự kiện

> **Trạng thái:** mô hình khái niệm, chưa có event broker hoặc pipeline hành vi được xác nhận.

## Mục đích

Sự kiện tách rời ghi nhận crawl và phản hồi sử dụng khỏi request path. Chúng hỗ trợ freshness, điều tra dữ liệu và đánh giá recommendation khi được bật; không phải nhãn sự thật tự động.

## Nhóm sự kiện

- Crawl: run started/completed/failed, listing observed, parse outcome, source status.
- Product interaction: listing impression, detail viewed, saved, compared, dismissed hoặc contact intent nếu tính năng đó được triển khai.
- Data/model operations: dataset snapshot accepted, model candidate evaluated, model activated/rolled back.

## Envelope tối thiểu

Mỗi sự kiện cần event ID duy nhất, event type/version, occurred-at UTC, producer, correlation/request ID khi có, và payload theo schema version. Sự kiện tương tác dùng session ID ngẫu nhiên không định danh, listing ID, action và placement context cần thiết. Không chứa tên, email, điện thoại, token, hay toàn bộ URL có credential.

Consumers phải chịu được at-least-once delivery qua idempotency/event ID, sự kiện đến trễ và schema version chưa hỗ trợ. Sự kiện không hợp lệ được cách ly/đếm lỗi; không âm thầm diễn giải thành hành vi khác. Thời hạn lưu, quyền xóa session và consent/notice phải được chốt trước khi dùng interaction làm dữ liệu train.

## Không đồng bộ với request

Ghi event không được làm search fail nếu analytics sink tạm thời unavailable. Hành vi cần thiết cho response phải nằm trong synchronous domain flow; ingestion analytics/crawl monitoring là asynchronous. Broker, serialization format, retention duration và delivery SLA chưa được quyết định và không được coi là đã tồn tại.
