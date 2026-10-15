# HomeMatch

HomeMatch hướng tới nền tảng giúp người thuê khám phá tin phòng theo ngân sách, vị trí và ưu tiên cá nhân. Trải nghiệm dự kiến có tìm kiếm/xếp hạng minh bạch, tin tương tự và khoảng giá chào thuê tham khảo khi dữ liệu đủ điều kiện.

## Trạng thái

Repository hiện chứa ứng dụng của product direction trước đây. Tài liệu mới mô tả target; frontend React/Vite, Go Gateway, crawler batch và các khả năng cá nhân hóa/ML chưa được triển khai theo kiến trúc mới.

## Tài liệu

- [Documentation index](docs/README.md): product, architecture, data, crawling, ML, API, UI/UX, engineering và operations.
- [Rebuild roadmap](task/rebuild-plan/README.md): kế hoạch A–Z, dependencies, task ownership, orchestration và acceptance gates.
- [Current next action](task/next-plan.md): phase đang hoạt động.

## Product principles

- Một tin đăng là dữ liệu của nguồn tại thời điểm quan sát; không đồng nhất mặc định với một phòng vật lý.
- Khu vực được hỗ trợ tùy theo nguồn đã xác minh và độ phủ dữ liệu đo được.
- Giá model ước lượng là giá chào thuê tham khảo, không phải giá giao dịch.
- ML là khả năng có điều kiện; tìm kiếm baseline cần hoạt động khi ML chưa sẵn sàng.
- Không yêu cầu tài khoản người thuê trong giai đoạn đầu.

Để biết trạng thái thực tế của từng khả năng, xem roadmap và kiểm chứng repository/deployment; không xem target docs là bằng chứng tính năng đã chạy.
