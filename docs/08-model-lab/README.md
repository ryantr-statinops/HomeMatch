# Model Lab

**Trạng thái:** thiết kế mục tiêu Research Terminal; chưa có runtime, benchmark hoặc model đã triển khai. Owner: agent Model Lab; shared contracts do coordinator duyệt.

Người dùng cấu hình experiment bằng form, chạy training/backtest trong trình duyệt rồi lưu kết quả riêng theo account. Không cần cài Python, CLI hoặc ứng dụng desktop. Kết quả là nghiên cứu, chưa chứng minh alpha hoặc khả năng khớp lệnh thật.

## Thứ tự đọc

1. [Form, features và targets](features-and-targets.md): cấu hình hợp lệ và thông tin được phép biết tại prediction time.
2. [Browser runtime](browser-runtime.md): Web Worker, feasibility gate, cancellation và giới hạn thiết bị.
3. [Backtest và evaluation](backtest-and-evaluation.md): splits, baselines, execution, costs và báo cáo.
4. [Experiment lifecycle](experiment-lifecycle.md): ownership, manifests, artifacts và đồng bộ.

## Ranh giới

- Binance Spot BTCUSDT/ETHUSDT; candles đóng 15m, 1h, 1d; quote USDT.
- Logistic regression cho direction; Ridge cho forward return/volatility. Hyperparameters là preset có version, không tìm kiếm không giới hạn.
- Web Worker thực thi pipeline do ứng dụng phát hành; form không nhận arbitrary Python, model executable, pickle hoặc deep learning.
- Python server phục vụ chuẩn hóa/nghiên cứu pipeline nếu cần; không có user training job trên server trong MVP.
- News-only/combined chỉ bật khi snapshot đáp ứng thời gian khả dụng và quyền ML. Thiếu nguồn hợp lệ thì dùng price-only và giải thích lý do.

## Gates

P02 chứng minh runtime/packages và hiệu năng; P03/P04 cung cấp snapshots đủ điều kiện; P07 tích hợp form/worker; P08 nghiệm thu leakage, backtest và account isolation. Chưa công bố dataset limit hoặc browser support khi chưa có báo cáo spike.

Thuật ngữ theo [glossary](../glossary.md); quyết định theo [ADR](../02-architecture/decisions.md).
