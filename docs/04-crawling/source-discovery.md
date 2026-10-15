# Khảo sát và phê duyệt nguồn dữ liệu

> **Trạng thái: cần thực hiện.** Nguồn, quyền truy cập, khả năng crawl và khu vực phủ chưa được xác minh. Không có website nào đang được khẳng định là đã phê duyệt.

## Mục tiêu

Chọn tập nguồn có thể cung cấp tin thuê phù hợp cho người thuê nói chung, đo được độ phủ thực tế, và cho phép hoạt động thu thập/lưu trữ/hiển thị theo điều kiện nguồn. Tên nguồn chỉ được đưa vào source registry sau khi có evidence review và người chịu trách nhiệm.

## Quy trình khảo sát

1. **Lập candidate list:** ghi tên/domain và cách tìm thấy; chưa tự động crawl.
2. **Review điều kiện:** đọc điều khoản sử dụng, chính sách crawl/robots, API nếu có, giới hạn truy cập, quyền lưu nội dung/ảnh, attribution và yêu cầu gỡ bỏ. Nếu không rõ, dừng và xin đánh giá phù hợp trước pilot.
3. **Đánh giá kỹ thuật:** thử truy cập thủ công hoặc qua phương thức được phép; xem pagination, schema stability, ID/URL, field, cập nhật và khả năng nhận biết tin đã gỡ.
4. **Pilot giới hạn:** chỉ trên scope/thời lượng được duyệt, áp dụng rate limit bảo thủ; lưu fixtures nhỏ/đã làm sạch khi được phép.
5. **Đo chất lượng và độ phủ:** completeness, độ mới, duplicate rate, vị trí, phân phối giá, khu vực hành chính và chi phí vận hành. Ghi mẫu số và thời điểm đo.
6. **Quyết định:** approve, conditional (giới hạn field/retention/traffic) hoặc reject; ghi reviewer, ngày, bằng chứng, điều kiện và ngày rà soát lại.

## Checklist source review

| Nhóm | Câu hỏi bắt buộc |
|---|---|
| Điều kiện sử dụng | Điều khoản cho phép truy cập tự động không? Có endpoint/API chính thức hoặc yêu cầu attribution không? Có hạn chế lưu, dẫn lại, sửa đổi hoặc thương mại hóa dữ liệu không? |
| Crawl policy | Robots directives, rate limit, crawl delay, pagination, authentication, anti-automation hoặc yêu cầu liên hệ nào áp dụng? |
| Nội dung và quyền riêng tư | Tin có PII/contact info không? Có thể giữ raw payload, ảnh, mô tả bao lâu? Cách xử lý takedown/xóa là gì? |
| Nhận diện listing | Có ID ổn định không? URL có thay đổi/tái sử dụng không? Nguồn có timestamp hoặc trạng thái không? |
| Data quality | Giá, phí, diện tích, loại hình, vị trí và tiện ích có giá trị parse được? Missing/ambiguous phổ biến đến mức nào? |
| Freshness | Tần suất thay đổi; có thể kiểm tra tin hết hạn không; dấu hiệu nào chứng minh listing còn hiệu lực? |
| Coverage | Khu vực và loại phòng thực tế nào xuất hiện? Có đủ số mẫu và phân bố để phục vụ người thuê không? |
| Reliability/cost | Fetch, parse và quota có ổn định? Hạ tầng, lưu trữ, bandwidth và bảo trì parser tốn bao nhiêu? |
| Exit/takedown | Có cách dừng adapter ngay, xóa/suppress dữ liệu và xác nhận cleanup không? |

## Source registry

Mỗi source registry entry cần tối thiểu: source key, domain, trạng thái review, người chịu trách nhiệm, ngày review, nguồn evidence, phương thức truy cập được cho phép, phạm vi field, tốc độ tối đa/khung crawl được duyệt, retention/takedown rules, khu vực đã quan sát, adapter version, parser version, ngày rà soát kế tiếp và lý do suspend.

Trạng thái `candidate`, `approved`, `conditional`, `suspended`, `rejected` phải tách rõ. Chỉ `approved` hoặc `conditional` trong đúng phạm vi điều kiện mới được schedule. Source không được crawl khi thiếu owner/evidence hoặc quá ngày rà soát bắt buộc.

## Đo độ phủ địa lý

Địa bàn không được quyết định trước khi xem crawl mẫu. Báo cáo theo lần đo phải nêu: thời điểm, candidate sources được phép, listing hợp lệ mới nhất, phân bố theo khu vực hành chính, completeness vị trí, độ tuổi dữ liệu và confidence. Không dùng số lượng URL thô làm coverage; deduplicate candidate và listing stale phải được tính riêng.

Một area chỉ được đưa ra lựa chọn khi có đủ listing đủ mới, trường vị trí/giá/loại phòng dùng được và có thể nêu giới hạn dữ liệu. Ngưỡng tối thiểu được đặt sau pilot cùng Product/ML, dựa trên yêu cầu trải nghiệm và phân bố quan sát được.

## Review lại và dừng

Rà soát lại khi điều khoản thay đổi, nguồn báo cáo vấn đề, cách truy cập thay đổi, lỗi/rate limit tăng, dữ liệu giảm chất lượng hoặc hết review date. Nút dừng phải vô hiệu lịch chạy mới nhanh chóng. Sau khi suspend, vẫn lưu trạng thái/log cần cho audit; xóa/suppress dữ liệu theo điều kiện đã cam kết.

### Exit gate

- Có hồ sơ đánh giá và kết luận được owner ghi nhận.
- Phạm vi fetch, fields, tốc độ, retention, attribution và takedown đã xác định.
- Pilot không vượt giới hạn nguồn; có mẫu đo chất lượng/coverage và kết luận.
- Nếu không có nguồn đạt điều kiện, phase kết thúc bằng quyết định đổi nguồn/chiến lược data, không âm thầm crawl.

