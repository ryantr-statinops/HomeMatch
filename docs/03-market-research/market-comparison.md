# So sánh thị trường

**Trạng thái:** quyết định sản phẩm mục tiêu; evidence tại 2026-10-16. Chưa có benchmark latency, completeness hay chi phí thực tế.

| Thị trường | Giá lịch sử/intraday | News và dữ liệu bổ sung | Rủi ro chính | Vai trò |
|---|---|---|---|---|
| Crypto | Public exchange API và archive; mỗi chuỗi theo venue | Announcements, regulator, project blogs; coverage phân mảnh | Quyền dữ liệu, region, news history point-in-time | MVP |
| Mỹ | Free tiers có khác biệt IEX/SIP | SEC filings, issuer releases, fundamentals | Corporate actions, survivorship, licensing feed/news | Expansion ứng viên đầu |
| FX | Broker feed cho intraday; reference daily | Central-bank/statistical releases | Broker specificity, revisions, thiếu consensus history | Expansion macro research |
| Việt Nam | Broker API/SDK cần kiểm tra tài khoản/quota | RSS tiếng Việt, disclosures | Redisplay, intraday history, corporate actions và phiên | Expansion tiếng Việt |

Chọn Binance Spot BTCUSDT/ETHUSDT vì phạm vi nhỏ, có public-only market endpoints và bulk archive có tài liệu. Đây là lựa chọn để kiểm chứng pipeline, không khẳng định chất lượng hay quyền public display đã được duyệt. News là lớp thu thập tiến tới; price-only baseline giúp xây nghiên cứu trước khi có đủ news history.

Không xếp hạng alpha giữa các thị trường khi chưa có experiment. Mỗi thị trường mới phải vượt gate: access ở vùng deploy, quyền store/train/display, độ phủ point-in-time, handling calendar/actions, chi phí và bộ acceptance fixtures. Nếu nguồn bị chặn theo khu vực, báo unavailable và xem lại source/venue qua ADR; không proxy để vượt hạn chế.

Nguồn bằng chứng chi tiết và URL nằm trong từng báo cáo và [register](source-register.md).
