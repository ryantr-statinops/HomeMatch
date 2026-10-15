# Recovery và release gates
**Trạng thái:** chưa diễn tập.

## Recovery
Immutable raw/dataset manifests cho phép replay theo quyền retention. Corrections tạo version mới, không đổi âm thầm dataset của experiment cũ. Ledger correction có history; migrations cần backup/restore rehearsal. Revoke leaked secret theo service, không tái kích hoạt key cũ làm rollback.

Live reconnect dùng backoff/resubscribe/snapshot, không dùng tick đến muộn sửa lịch sử mà không version. Browser worker fail thì terminate/reinitialize; run interrupted có config lưu, không hứa auto resume. Result sync retry idempotent theo owner/run.

## Release checklist
- [ ] API/ownership/JWT, ledger/CSV và worker contract checks pass.
- [ ] Pyodide/browser stream feasibility report có device/region/runtime evidence.
- [ ] Source register đủ quyền train/display/retention cho dữ liệu release; demo fixtures được ghi nhãn.
- [ ] News timestamps/corrections, closed-bar labels, no lookahead và strategy costs được review.
- [ ] Client-computed report không có trusted badge từ user input.
- [ ] Managed Auth/email, quotas, preview isolation, CSP và secrets boundaries đã chốt.
- [ ] Recovery runbook, monitoring/cost owner và release IDs có bằng chứng.
- [ ] UI tiếng Việt, source/quote/timezone/stale labels và accessibility smoke pass.

Nếu thiếu gate, phát hành capability giới hạn hoặc demo synthetic có nhãn; không chuyển pending thành complete bằng sửa copy.
