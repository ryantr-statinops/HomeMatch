# Kiểm thử crawler và exit gates

> **Trạng thái: tiêu chí mục tiêu, chưa triển khai.** Không có test evidence hay source approval nào được khẳng định ở đây.

## Các lớp kiểm thử

- **Unit:** URL normalization, parsing tiền/đơn vị, pagination, checkpoint, fingerprint/dedup và phân loại error.
- **Fixture contract:** payload synthetic hoặc đã làm sạch, được phép giữ; nhiều phiên bản cấu trúc, field thiếu, markup hỏng, content đổi thứ tự.
- **Replay/integration:** raw fixture → adapter/normalizer → persistence test double hoặc disposable database/object store; xác nhận idempotency, snapshot và provenance.
- **Fault injection:** timeout, truncated response, 429/throttle, 5xx, 4xx, response quá lớn, storage unavailable, crash giữa fetch/commit và checkpoint lỗi.
- **Policy tests:** candidate/rejected/suspended/expired-review source không được fetch; domain sai bị chặn; rate/concurrency cap được thực thi.
- **Data quality:** thiếu/không parse được giá, giá khoảng hoặc thương lượng, phí bằng 0 có căn cứ/không rõ, vị trí mơ hồ, duplicate/conflict, tin hết hạn và schema drift.

Không gọi production source trong test suite mặc định. Smoke test nguồn thật chỉ được chạy thủ công sau review, trong giới hạn đã duyệt, có owner quan sát và cơ chế dừng.

## Scenarios bắt buộc

1. Chạy lại cùng trang nhiều lần không nhân bản listing hoặc snapshot không đổi.
2. Cùng listing thay giá/ảnh/trạng thái tạo snapshot mới và vẫn truy vết raw/crawl run.
3. Thiếu trường không biến thành false/zero; parse thất bại được quarantine hoặc gắn lỗi.
4. Run partial/failed không expire tin vắng mặt; policy expiry chỉ hoạt động sau successful coverage và evidence.
5. 429 tạo cooldown, retry có giới hạn; lỗi policy/authorization dừng thay vì lặp request.
6. Source đổi schema được phát hiện trước khi dữ liệu sai vào serving.
7. Storage fail giữa quy trình không tạo trạng thái normalized/serving thiếu artifact lineage.
8. Takedown/suspend ngăn fetch và có thể tìm hết downstream records/artifacts theo provenance.
9. URL, query token, contact info và secret không lộ vào log/test output.
10. Không có vùng đủ độ phủ thì report “chưa đạt”; hệ thống không tự công bố địa bàn.

## Exit gate cho crawler đầu tiên

- Source review đã approve/conditional cho chính xác scope triển khai.
- Có adapter contract, fixture suite, retry/rate policy và kill switch.
- Run lặp lại idempotent; resume sau crash không làm mất/nhân bản dữ liệu.
- Mọi record có provenance và quality flags; raw/media retention phù hợp với review.
- Đã đo coverage, freshness, missingness, duplicate rate, parser errors và chi phí từ pilot.
- Data owner/Product chấp nhận giới hạn dữ liệu và cách hiển thị freshness/availability.
- Chỉ bật serving ở khu vực/nguồn vượt gates; phần còn lại vẫn ẩn hoặc gắn rõ chưa được hỗ trợ.

