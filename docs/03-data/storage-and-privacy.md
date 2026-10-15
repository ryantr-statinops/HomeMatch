# Lưu trữ, quyền riêng tư và retention

> **Trạng thái: mục tiêu, chưa triển khai.** Không có nhà cung cấp database/object storage nào được chốt ở tài liệu này.

## Hợp đồng lưu trữ

- PostgreSQL là đích mục tiêu cho entity quan hệ, trạng thái pipeline, metadata, lineage, quality metrics, dataset manifests và các chỉ mục cần cho serving.
- Object storage là đích mục tiêu cho raw artifacts, media được phép giữ, export/dataset lớn và model artifacts. Nội dung ứng dụng tham chiếu object bằng key nội bộ, checksum, mime type, size, retention class và access policy; không phụ thuộc URL công khai của vendor.
- Ranh giới giao tiếp dùng interface có thể thay provider: đọc/ghi object, metadata, checksum, lifecycle/retention và truy cập có kiểm soát. Không để provider-specific URL lan vào domain model.
- Xóa hoặc expire object phải đồng bộ metadata và tham chiếu; tác vụ cleanup có thể retry an toàn và tạo audit record.
- Bản backup, khôi phục, encryption-at-rest/in-transit, secrets và quyền môi trường phải được chốt trong tài liệu operations/security trước production.

Không đưa credentials, URL nội bộ, thông tin liên hệ cá nhân hay bản dump dữ liệu thật vào Git, fixtures công khai, tài liệu hoặc log.

## Quyền riêng tư và điều kiện sử dụng dữ liệu

Listing công khai vẫn có thể chứa tên, số điện thoại, email, tài khoản nhắn tin, biển số hoặc thông tin nhận diện. Trước khi crawl một nguồn phải review điều kiện truy cập và quyền lưu/hiển thị/tái sử dụng; xem [quy trình lựa chọn nguồn](../04-crawling/source-discovery.md). Không coi nội dung truy cập được là mặc nhiên được phép lưu lâu dài hay phát lại.

- Raw layer có thể chứa PII: giới hạn quyền, mã hóa phù hợp, không dùng làm serving trực tiếp, không gửi sang dịch vụ ngoài nếu chưa đánh giá.
- Normalized/serving loại bỏ hoặc che dữ liệu liên hệ không cần cho trải nghiệm tìm phòng. Hành động liên hệ nên dẫn về nguồn theo policy, không tạo kho PII phụ.
- Session ID cho personalization phải ngẫu nhiên, không định danh, có hạn dùng và không ghép với danh tính bên ngoài. Thu thập interaction tối thiểu và công bố mục đích/retention phù hợp.
- Tránh lưu IP đầy đủ hoặc user agent dài hạn; log vận hành cần lọc query strings, headers bí mật và contact text.
- Khi nhận yêu cầu xóa/takedown hợp lệ, xác định source/listing/snapshots/objects/serving/dataset bị ảnh hưởng; chạy quy trình xóa hoặc suppression có thể kiểm toán. Dataset/model có chứa dữ liệu cần đánh giá lại khả năng tái tạo/loại trừ.

## Retention policy cần hoàn tất trước crawl thật

Thời hạn cụ thể phụ thuộc điều kiện source, mục đích, lưu lượng và chi phí; không đặt thời hạn chung khi chưa review. Giai đoạn source discovery phải đề xuất retention riêng cho:

| Loại dữ liệu | Cần quyết định |
|---|---|
| Raw payload | Có được lưu không; retention tối đa; có cần giảm/loại field PII; có được lưu cả nội dung trang hay chỉ fragment cần thiết. |
| Normalized snapshots | Cần bao lâu để freshness/dedupe/analytics; yêu cầu xóa hoặc suppression khi source gỡ tin. |
| Media bytes | Điều kiện tải/lưu/hiển thị, bandwidth/chi phí, thời hạn cache và takedown. |
| Session preferences/interactions | Thời gian đủ cho trải nghiệm và đánh giá; xóa tự động; khả năng opt-out. |
| Logs, backups, datasets, models | Retention phụ, quyền truy cập, thời điểm purge và các bản sao được khôi phục. |

Exit gate: có policy được chủ sở hữu sản phẩm duyệt, cơ chế thực thi tự động và kiểm thử xóa/takedown trước khi lưu dữ liệu crawl production.

