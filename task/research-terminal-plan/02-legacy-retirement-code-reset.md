# P01 — Legacy retirement và code reset
**Trạng thái:** repository reset đã qua checks local; [inventory](p01-inventory.md) và [evidence/commit map](p01-completion-report.md). Remote CI/review và credential/resource retirement còn pending, không được coi đã decommission toàn phase.

## Mục tiêu và phụ thuộc
P00 complete; đọc legacy integration audit trước removal.

## Ownership
Coordinator: inventory/retirement/shared tooling. Web agent: reusable UI và web reset; Go agent: gateway/ingestion skeleton; Python agent: API/research skeleton. Giới hạn 3 workers, tooling do coordinator tích hợp.

## Phạm vi
Xác định giữ/xóa/viết lại theo target. Gỡ Next.js/Admin/rental/domain/tích hợp Google legacy và dependencies không còn consumer. Không xóa dữ liệu/live Cloud project theo suy đoán; không thêm features sản phẩm trong reset.

## Input/output contracts
Input: code inventory + audit legacy. Output: target workspace chạy fixture, env examples sạch, lockfiles và setup. Credentials/data legacy không vào fixture mới.

## Tasks
RT-RESET-01 inventory exact paths/dependencies; -02 validate active consumers/remote state; -03 web reset; -04 service/tooling reset; -05 verify/archive handoff. Dùng thêm LEG-01..07 của audit.

## Kiểm thử và nghiệm thu
Local fixture không cần Google/legacy DB; lint/typecheck/build/unit đúng phần đổi. Rà imports/dependencies/env và secret boundaries; source app chưa dùng nguồn thật mặc định.

Code reset có evidence; remote resource chưa xử lý phải ghi pending riêng, không gọi đã decommission. Không có secret value trong commit/log.

## Rollback và handoff
Git revert theo subsystem; không khôi phục key đã revoke. Handoff P02 command/toolchain inventory và outstanding remote tasks.
