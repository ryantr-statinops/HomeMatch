# Screen flows
**Trạng thái:** target, UI tiếng Việt.

## News-first terminal
Layout có news feed trung tâm, watchlist và asset panel. Cards ghi nguồn, published/first-seen/update, instrument/event mapping và link gốc. Unknown timestamps/confidence được hiển thị, không thay bằng thời gian ingest giả làm publication. Full text/ảnh/summary chỉ theo source policy; dịch hoặc summary có nhãn suy diễn riêng nếu triển khai sau.

## Asset/live
Chart ghi Binance Spot, symbol, quote USDT, interval và timezone. Nến đang mở khác nến đóng; giá display khác execution. Các trạng thái connecting/live/reconnecting/stale/paused/unavailable có nhãn. Tab trở lại phải đồng bộ snapshot/backfill trước live; không hiển thị dữ liệu cũ như hiện tại.

## Portfolio
Tạo ledger USDT, nhập manual/CSV, preview những hàng lỗi/trùng và fees trước xác nhận. Holdings/P&L/equity history hiển thị valuation time/source. Cashflow không bị gọi là trading profit. Không có nút đặt lệnh hay nhập API secret sàn.

## Model Lab
Form chọn dataset/asset/timeframe, features/target/horizon/model/split/costs. Preview số rows eligible và runtime support. Lưu config trước Run; lazy-load worker với download/runtime progress khác training progress. Khi hoàn thành, hiển thị out-of-sample windows, baseline, net costs, drawdown và client-computed. Không dùng badge verified từ client.

## Account/demo
Managed auth flow có verify/reset/session-expired. Public demo là mẫu chỉ đọc hoặc replay ghi nhãn; không dùng profile thật làm demo. Experiment private mặc định; logout/account switch phải xóa private UI/cache theo policy.
