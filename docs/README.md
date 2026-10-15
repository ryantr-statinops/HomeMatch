# HomeMatch — tài liệu dự án

HomeMatch giúp người thuê khám phá tin phòng phù hợp với nhu cầu, so sánh lựa chọn và hiểu mức giá chào thuê trong bối cảnh các tin tương tự. Đây là tài liệu mục tiêu cho lần tái cấu trúc; các hệ thống mới mô tả dưới đây **chưa được triển khai** trừ khi có trạng thái khác ghi rõ.

## Đọc theo thứ tự

1. [Sản phẩm](01-product/README.md): đối tượng, nhu cầu, MVP và tiêu chí thành công.
2. [Kiến trúc](02-architecture/README.md): ownership, stack, luồng hệ thống và quyết định.
3. [Dữ liệu](03-data/README.md): thực thể tin/phòng, provenance, chất lượng và vòng đời.
4. [Crawler](04-crawling/README.md): khảo sát nguồn và thu thập theo batch.
5. [Machine learning](05-ml/README.md): gợi ý, tin tương tự, giá tham khảo và đánh giá.
6. [API](06-api/README.md): hợp đồng giữa frontend, gateway và domain API.
7. [UI/UX](07-ui-ux/README.md): hành trình người thuê và các trạng thái giao diện.
8. [Engineering](08-engineering/README.md): phát triển, kiểm thử và quy tắc cộng tác.
9. [Operations](09-operations/README.md): triển khai, giám sát và khôi phục.
10. [Roadmap implementation A–Z](../task/rebuild-plan/README.md): thứ tự xây dựng và tiêu chí thoát từng giai đoạn.

## Nguồn sự thật

- Mục tiêu, persona và phạm vi: `01-product/`.
- Service ownership và runtime boundary: `02-architecture/`.
- Định nghĩa field, entity và chất lượng: `03-data/`.
- Quy tắc crawl và trạng thái xác minh nguồn: `04-crawling/`.
- Mục tiêu/đánh giá model: `05-ml/`.
- Wire contract: `06-api/`.
- Hành vi và trạng thái hiển thị: `07-ui-ux/`.
- Trạng thái triển khai từng giai đoạn: `task/rebuild-plan/`.

Khi hai tài liệu xung đột, chủ sở hữu domain tương ứng cập nhật tài liệu chuẩn và index trong cùng thay đổi. Không suy diễn “đã hỗ trợ” từ tài liệu mục tiêu; xác minh trạng thái trong repository/deployment trước khi thông báo.

## Trạng thái hiện tại và mục tiêu

Repository hiện có ứng dụng Next.js, Admin Portal, FastAPI, PostgreSQL/Supabase artifacts và public website theo mô hình sản phẩm cũ. Tài liệu mới xác định đích đến là React/Vite, Go Gateway mỏng, FastAPI cho nghiệp vụ, Python cho ML, Go cho crawler batch, PostgreSQL cho dữ liệu cấu trúc và object storage cho artifacts. Chưa có nghĩa là code hoặc dữ liệu hiện tại đã chuyển đổi.

Phạm vi vùng địa lý sẽ phụ thuộc các nguồn crawl được khảo sát và xác minh. Không công bố coverage, độ chính xác mô hình hay khả năng cập nhật khi chưa có bằng chứng đo được.
