# Glossary — Research Terminal

**Trạng thái:** định nghĩa mục tiêu, chưa xác nhận hệ thống đã triển khai.

| Thuật ngữ | Định nghĩa chuẩn |
|---|---|
| Asset | Tài sản kinh tế, ví dụ BTC, ETH hoặc USDT; không phải cặp giao dịch |
| Instrument | Sản phẩm tại venue, có market type, base/quote và native symbol |
| Venue / Symbol | Nguồn/sàn và nhãn riêng; MVP Binance Spot `BTCUSDT`, `ETHUSDT` |
| Candle | Nến OHLCV gắn instrument, interval, open/close time và trạng thái đóng |
| Quote / live price | Giá phục vụ hiển thị có source/time; không chứng minh fill thực tế |
| Article / Event | Tin tại nguồn và sự kiện suy ra/gom từ một hoặc nhiều tin; giữ phiên bản và confidence |
| published_at | Thời điểm nguồn khai báo xuất bản; có thể thiếu hoặc không chính xác |
| first_seen_at | Lần đầu hệ thống quan sát; không backdate khi backfill |
| available_at | Mốc bảo thủ feature có thể biết, theo policy/evidence |
| updated_at | Thời điểm sửa; không ghi đè lịch sử khả dụng |
| Feature / Target | Biến đầu vào khả dụng tại lúc dự đoán / đại lượng tương lai có horizon, label interval |
| Signal | Output/quy tắc ứng viên; chỉ mô tả hiệu quả khi qua kiểm định ngoài mẫu và chi phí |
| Dataset snapshot | Tập bất biến/tái lập có manifest, source revisions và quyền sử dụng |
| Experiment | Dataset/config, feature/runtime/model versions, seed, split và kết quả một lần thử |
| client-computed | Kết quả browser gửi; schema/ownership được kiểm tra, phép tính chưa được server chứng thực |
| Workspace | Không gian riêng theo account cho watchlist, portfolio, experiments |
| Portfolio | Ledger spot long/cash thủ công/CSV, base USDT; không phải tài khoản sàn |
| Public demo | Workspace mẫu/report đã chọn, không tự công khai dữ liệu user |

## Bất biến

- Không trộn venue hoặc spot/perpetual; USDT không mặc định bằng USD/VND.
- Lưu UTC; UI mặc định Asia/Ho_Chi_Minh và ghi timezone.
- Feature dùng nến đóng; UI có thể hiển thị nến mở với nhãn riêng.
- Managed Auth; FastAPI enforce ownership; browser training dùng Web Worker, không yêu cầu cài Python.
- Browser public Binance WebSocket là ngoại lệ trực tiếp; API nghiệp vụ/account qua Gateway.
- Source flags `documented`, `access-tested`, `rights-confirmed`, `approved` có evidence riêng; truy cập được không chứng minh quyền dùng.
- Config có state draft; run có running/succeeded/failed/cancelled/interrupted. Các state là client-reported; result giữ computation_origin=client-computed và verification_status=unverified theo API/Model Lab.
