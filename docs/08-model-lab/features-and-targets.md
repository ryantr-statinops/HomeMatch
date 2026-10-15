# Form, features và targets

**Trạng thái:** contract mục tiêu, chưa triển khai. Các phép tính được version hóa; thay đổi định nghĩa tạo feature/target version mới.

## Form experiment

| Nhóm | Dữ liệu người dùng chọn |
|---|---|
| Dataset | Snapshot đã được phép dùng, BTCUSDT hoặc ETHUSDT, timeframe 15m/1h/1d, khoảng ngày |
| Features | Price-only, news-only hoặc combined; lookbacks theo preset |
| Target | Direction, forward return hoặc forward volatility; horizon và research mode |
| Model | Logistic regression hoặc Ridge tương ứng; preset regularization và seed |
| Evaluation | Walk-forward preset, train/validation/holdout, fee/slippage, initial capital USDT |

Form preview số dòng đủ điều kiện, warm-up, khoảng label tương lai bị loại và lý do thiếu dữ liệu trước khi chạy. Không tự thay symbol, thời gian hoặc feature set để ép cấu hình chạy được. Sai timeframe/horizon/model, dữ liệu rỗng hoặc vượt giới hạn runtime trả lỗi có hướng sửa; chưa lưu kết quả thành công.

Research mode `intraday` và `multi-day` có preset/metrics riêng. Horizon được lưu bằng số bar lẫn duration: ví dụ intraday 1h/4h trên nến 15m hoặc 1h; multi-day 1d/7d trên nến 1h hoặc 1d. Duration phải chia hết interval; không coi 1 bar của mọi timeframe là cùng một bài toán. Preset chính thức khóa trong P07 sau khi có độ phủ dataset.

## Features và tính khả dụng

Tại decision time `t`, chỉ dùng bar đã đóng và quan sát được trước hoặc tại `t`. Returns, momentum, rolling realized volatility, volume abnormal đều là trailing windows; rolling normalization không được nhìn phần tương lai. Window thiếu đủ bars hoặc có gap bị đánh dấu thiếu, không tự forward-fill giá/volume để tạo lịch sử giả.

News count, event type và novelty được tính từ phiên bản bài/sự kiện có `available_at <= t`. `available_at` dựa trên first-seen/evidence và latency policy của snapshot, không lấy ngày xuất bản làm bằng chứng nhận tin. Bài backfill và sửa sau `t` không được rót vào feature cũ. Novelty/dedup model cũng có version; bộ từ điển/scaler/encoder học từ train hoặc tài nguyên cố định đã khai báo.

Missing news coverage khác với count bằng 0: không có feed đủ điều kiện thì feature unavailable; feed khỏe và không quan sát tin mới thì count 0. Thêm coverage/freshness flags; không suy ra sentiment 0 từ tin chưa có. Chỉ dùng nội dung có quyền ML, không coi metadata/link là quyền train toàn văn.

## Targets và thời điểm giao dịch

Direction là dấu của forward return; return là `P_exit / P_entry - 1`. Target volatility là căn tổng bình phương log returns trong horizon tương lai, đơn vị unannualized; mọi annualization ở báo cáo phải ghi rõ convention crypto 24/7. Direction ties xác định `non-positive` cho target nhị phân; lưu tỷ lệ ties để tránh che phân bố.

Decision được tạo sau đóng bar `t`. Benchmark OHLCV dùng giá mở bar kế tiếp làm entry proxy và giá mở sau đúng `h` bars làm exit; đây là giả định execution lý tưởng cần cộng slippage/latency sensitivity. Không dùng close vừa quan sát làm fill bảo đảm. Nếu latency policy không cho phép next-open, dời sang next executable bar theo preset và lưu timestamps thực tế. Loại sample thiếu entry/exit, có gaps hoặc chưa đủ horizon; không rút horizon âm thầm.

Mỗi row giữ `decision_at`, `entry_at`, `label_end_at`, feature availability và snapshot ID. Label interval được dùng để purge cross-split samples. Live prediction không có label tương lai; nhãn chỉ được bổ sung khi cửa sổ kết thúc.

## Nghiệm thu

Fixture phải chứng minh đổi một bar/tin tương lai không đổi feature tại `t`; bar mở, tin sửa muộn và backfill không lọt vào quá khứ. Kiểm tra target h=1/h>1, boundaries, missing exits, zero return, timeframe mismatch và warm-up. So sánh ba feature groups dùng cùng eligible sample và [evaluation protocol](backtest-and-evaluation.md).
