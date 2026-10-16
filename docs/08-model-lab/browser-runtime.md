# Browser runtime và feasibility gate

**Trạng thái:** Web Worker là boundary được chấp nhận; Pyodide là ứng viên đầu tiên, chưa benchmark. Người dùng không cần cài môi trường local.

## Luồng chạy

UI lưu cấu hình trước, tải snapshot được cấp quyền rồi tạo một module Web Worker. Worker nạp runtime/packages khi mở Model Lab, kiểm tra manifest/hash, tạo features/splits, fit model, backtest và trả kết quả. UI nhận progress theo stage; không hiển thị phần trăm giả nếu một solver không cung cấp tiến độ. Mỗi message có run ID để loại output từ run cũ.

Pyodide hướng dẫn chạy Python trong worker để tách công việc tính toán khỏi UI. Khả năng tải package không chứng minh mọi dependency CPython đều tương thích WebAssembly; P02 phải test đúng package và solver được chọn. Chỉ tải allowlisted assets phiên bản cố định, không cài package theo chuỗi user nhập. Nguồn kiểm tra ngày 16/10/2026: [official worker guide](https://pyodide.org/en/stable/usage/webworker.html), [official package loading](https://pyodide.org/en/stable/usage/loading-packages.html). Không sao chép version của trang `stable` thành version dự án chưa test.

Worker messages chỉ chứa cấu hình JSON và dataset/arrays đã kiểm tra. Runtime chạy pipeline ứng dụng phát hành, không nhận code từ API/user. Worker không có JWT hoặc quyền ghi account trực tiếp; main thread chịu tải/sync qua API có auth. Không tải raw account ledger vào model mặc định.

## P02 spike bắt buộc

Benchmark 5.000, 25.000 và 50.000 rows cho mỗi nhóm features/models trên desktop Chromium và Firefox; đo Safari khi thiết bị/môi trường test sẵn có. Có mobile capability check; thiết bị chưa đạt chỉ xem kết quả đã lưu. Ghi rõ thiết bị, browser, runtime/package/build versions, cold/warm load, asset transfer size, peak memory ước lượng, feature time, fit time, backtest time, UI responsiveness và cancellation.

Thử cả price-only và news-combined, lookbacks dài và dataset có missing values. Báo cáo failures, OOM, package/solver khác biệt và tolerance tái lập. Từ bằng chứng khóa max rows/features, preset timeout và browser support bằng ADR. Không hứa 50.000 rows là giới hạn đã hỗ trợ; nếu Pyodide không đạt thì dừng gate và trình alternative cho coordinator, không âm thầm chuyển training lên server.

## Vòng đời và failures

- Một run active mỗi tab; ngăn double-submit và stale result ghi đè.
- Cancel dùng interrupt khi môi trường hỗ trợ; fallback terminate worker rồi tạo worker mới. Dữ liệu progress không phải checkpoint có thể resume.
- Worker crash/OOM/runtime load fail trả `failed` cùng stage và lỗi an toàn; không sync partial metrics như final.
- Tab đóng/reload có thể ngắt run; khi mở lại đánh dấu `interrupted` theo local run record. Không cam kết unload request hoặc tiến trình nền hoàn tất.
- Tab ẩn có thể bị browser throttle. UI cảnh báo khả năng gián đoạn; không gắn lifecycle worker với lời hứa WebSocket vẫn chạy.
- Logout/account switch terminate worker, xóa buffer/cache riêng của account và hủy pending sync. Response muộn không được ghi vào account mới.

Config đã lưu có thể chạy lại từ đầu; checkpoint/resume deferred. Unsupported devices có view cấu hình/kết quả, không có nút run hoạt động. Training dùng tài nguyên thiết bị người dùng nên UI phải cho biết trước khi bắt đầu.
