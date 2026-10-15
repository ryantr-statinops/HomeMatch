# User journeys
**Trạng thái:** target.

## Từ news đến tài sản
Người dùng mở demo có nhãn mẫu hoặc đăng nhập workspace. Lọc news theo BTC/ETH, thời gian, nguồn và event. Mở tin để xem published/first-seen/updated, link gốc, asset mapping và mức chắc chắn. Mở chart cùng venue/timeframe để đối chiếu diễn biến; không diễn đạt tương quan thành quan hệ nhân quả.

## Theo dõi riêng
Thêm asset vào watchlist, bật live khi tab hoạt động. Kết nối chậm/mất phải hiện stale/reconnecting; khi trở lại tab, đồng bộ snapshot trước khi cập nhật. Logout dừng stream và xóa state private khỏi client.

## Portfolio
Tạo ledger USDT, nhập cash/opening balances hoặc CSV. Xem preview/errors/duplicates trước xác nhận; sau commit xem holdings, cost basis, P&L và timestamp valuation. Sửa ledger bằng phiên bản/correction có audit, không sửa kết quả P&L trực tiếp.

## Model Lab
Chọn dataset snapshot, asset, timeframe, features, target/horizon và baseline/model. Xem dữ liệu hợp lệ/missing và số mẫu sau label/split. Lưu config trước rồi chạy Web Worker. Có progress/cancel; đóng tab có thể làm run interrupted. Kết quả ghi dataset/runtime/seed/split/cost và client-computed.

## Thiếu khả năng
Nguồn chưa đủ quyền: ẩn dữ liệu liên quan hoặc dùng demo được ghi nhãn. Không đủ lịch sử news: cho chạy price-only thay vì bịa feature. Browser không hỗ trợ: xem report và cấu hình nhưng không hứa train được.
