# Kiểm kê và gỡ tích hợp cũ

**Ngày rà soát:** 2026-10-16. **Trạng thái:** đã kiểm kê repository và tên cấu hình local; chưa gỡ code, thu hồi credential hoặc thay tài nguyên bên ngoài.

Đây là đầu vào bắt buộc của P01. Kiến trúc mới mặc định không phụ thuộc Google Sheet, Apps Script, AppSheet hoặc Google Drive. Nhà cung cấp object storage mới được chọn độc lập theo nhu cầu crawler/ML.

## Kết quả kiểm kê

| Hạng mục | Bằng chứng trong repository | Hướng xử lý P01 |
|---|---|---|
| Apps Script / Sheet | `apps-script/` có `SpreadsheetApp`, `DriveApp`, manifest yêu cầu quyền spreadsheets và Drive readonly | Gỡ toàn bộ thư mục và cấu hình deploy `.clasp.json` sau khi xác định job/deployment còn hoạt động |
| Script tạo mapping ảnh | `scripts/build-image-cache.ts` dùng `googleapis`, Drive API, folder references, key file và Supabase service key | Gỡ script, dependency và cấu hình chỉ phục vụ migration ảnh cũ |
| Service-account key local | Có file JSON key local trong `scripts/`, được ignore; không thấy lịch sử file tại đúng đường dẫn này trong các refs local hiện có | Không ghi giá trị key vào tài liệu/log. Xác định chủ sở hữu và consumers; thu hồi key cũ sau khi ngừng consumer, rồi xóa bản local theo checklist |
| Frontend ảnh | `src/services/room.service.ts` và route download ảnh đọc `imagecache`/`drive_url` | Gỡ resolver/download flow cũ khi UI chuyển sang fixture/media contract mới |
| Backend ảnh | Rooms repository đọc `imagecache`; settings có Google folder/service-account fields | Gỡ repository mapping, settings, env example và test/contract phụ thuộc |
| Database artifacts | Baseline migrations, RLS và seed có bảng `imagecache` | Đưa vào inventory schema legacy; không chạy DROP trên database đang tồn tại trong đợt dọn repo |
| Env bảo vệ client | Env-boundary script liệt kê tên credential Drive cần cấm trên client | Chỉ bỏ các mục legacy khi consumer đã gỡ; vẫn giữ kiểm tra secrets cho kiến trúc mới |
| Google Analytics | Có `NEXT_PUBLIC_GA_ID` và config `gaId`; chưa thấy consumer tracking trong mã nguồn đã rà | Gỡ placeholder nếu không có use case mới; không mặc định giữ tracking |
| Google Fonts | Layout public/admin import `next/font/google` | Xử lý cùng Next.js reset; chọn font assets/license cho web mới độc lập |

Không tìm thấy biến credential Google trong `.env.local` ở thời điểm rà tên biến; điều này không chứng minh các deployment hoặc máy khác không có credential. File env có Supabase service key riêng, cũng phải được đưa vào inventory secrets legacy.

## Những phần chưa kiểm tra từ xa

- Apps Script deployments, installable/time-based triggers, script properties và project Cloud được liên kết.
- Google Cloud service accounts/keys, IAM roles, OAuth clients/consent, enabled APIs, scheduler/jobs, logs và billing.
- Quyền share Sheet/Drive folder/file, AppSheet automation và các tài khoản khác dùng cùng tài nguyên.
- Vercel Production/Preview/Development env, CI secrets và bản credential trên máy/runner khác.

File key bị ignore không đồng nghĩa key đã được thu hồi. Không thấy lịch sử tại một đường dẫn không đủ để kết luận credential chưa từng xuất hiện ở tên file/ref khác. Không xóa Cloud project hoặc dữ liệu Sheet/Drive theo suy đoán: cần xác định tài nguyên chỉ dành cho HomeMatch và tác động tới consumer khác.

## Trình tự và task ownership

| Task | Chủ sở hữu | Đầu ra / điều kiện hoàn tất |
|---|---|---|
| LEG-01 | Coordinator | Inventory mapping consumer → resource → credential → owner; trạng thái `repo-confirmed`, `remote-unverified`, `disabled`, `removed` và bằng chứng |
| LEG-02 | Coordinator / operations | Xác minh job, trigger, deployment và env đang hoạt động; xác định cách dừng legacy workload trước khi thu hồi quyền |
| LEG-03 | Web agent | Gỡ Drive/imagecache UI/download consumers; dùng fixture/media interface mới, không gọi Google khi chạy mặc định |
| LEG-04 | Backend/tooling agent | Gỡ Apps Script, image-cache script, dependency `googleapis`, settings và env entries legacy; đồng bộ lockfiles/contracts/tests |
| LEG-05 | Coordinator / account owner | Thu hồi key/OAuth grants và quyền share không còn dùng, bỏ deployment secrets/trigger legacy sau khi consumers đã dừng; ghi bằng chứng không chứa secret |
| LEG-06 | Coordinator | Dọn file key local và cấu hình local legacy sau thu hồi; giữ quy tắc ignore và secret-boundary checks phù hợp |
| LEG-07 | Reviewer độc lập | Rà lại mã nguồn/config/lockfile và kiểm tra runtime bằng fixture; phân biệt rõ code đã gỡ với remote resources còn chờ xử lý |

LEG-01/02 là dependency của removal; LEG-03/04 có thể song song khi ownership không chồng lấn. LEG-05 chỉ thực hiện trên tài nguyên đã xác định thuộc dự án và không còn consumer cần thiết. Không dùng key đã thu hồi làm phương án rollback.

## Nghiệm thu và rollback

- Không còn import, request, script chạy hoặc cấu hình bắt buộc của Google Sheet/Drive/Apps Script trong đường chạy mới.
- Mỗi secret/resource legacy có owner, trạng thái và quyết định giữ/gỡ; phần chưa kiểm tra từ xa không được đánh dấu hoàn tất.
- Fixture/local build không cần Google credential; không lẫn dữ liệu ảnh legacy vào dataset crawler mới.
- Rà soát chỉ in tên biến và metadata an toàn, không đưa key/token hoặc giá trị env vào Git/log.
- Rollback code bằng Git nếu cần; credential đã thu hồi chỉ được thay bằng credential mới theo nhu cầu được xác nhận. Xóa dữ liệu/database/Cloud project là việc riêng sau khi inventory và retention được chốt.
