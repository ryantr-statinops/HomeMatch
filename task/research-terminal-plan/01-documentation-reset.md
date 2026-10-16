# P00 — Documentation reset
**Trạng thái:** complete — documentation; chưa triển khai runtime mới.

## Mục tiêu và phụ thuộc
Không có; accepted scope từ người dùng và kết quả khảo sát 4 thị trường.

## Ownership
Coordinator sở hữu glossary/ADR/index/roadmap; ba agent sở hữu source/data, portfolio/API và Model Lab theo paths độc quyền.

## Phạm vi
Thay docs rental bằng 12 domain Research Terminal. Archive roadmap rental, chuyển legacy audit sang kế hoạch mới; cập nhật README/task pointers. Không chỉnh source, credential, DB hay deployment.

## Input/output contracts
Input: repo/plan hiện tại và nguồn chính thức. Output: target docs có current/target boundaries, 4 survey/source register, phase plans và navigation.

## Tasks
RT-DOC-01 khóa glossary/ADR; RT-DOC-02 parallel authoring; RT-DOC-03 integration/review; RT-DOC-04 link/terminology/scope checks; RT-DOC-05 focused commits.

## Kiểm thử và nghiệm thu
Links/index resolve; 4 surveys có official citations/date/status; không còn renter scope hiện hành; browser-only training, multi-account, tab live nhất quán. Diff chỉ docs/task/README.

Domain docs/roadmap đã được rà links/index, thuật ngữ và scope; chưa coi feed/runtime đã được test. Bằng chứng và commit map ở [completion report](completion-report.md).

## Rollback và handoff
Revert các commit docs riêng nếu cần; legacy history vẫn trong Git. Handoff P01 với inventory và các deferred source/provider gates.
