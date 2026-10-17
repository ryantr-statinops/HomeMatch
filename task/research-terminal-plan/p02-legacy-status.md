# P02 — trạng thái retirement tích hợp legacy

**Ngày cập nhật:** 2026-10-17
**Trạng thái:** code legacy đã gỡ theo P01; xác minh và retirement tài nguyên từ xa còn chờ account owner. Đây là checklist, không khẳng định thao tác cloud đã hoàn tất.

## Ranh giới bằng chứng

- P01 đã gỡ tracked Apps Script, image-cache/Drive consumer, Supabase migrations/seed/config cũ và dependency legacy khỏi scaffold. Xem [P01 completion report](p01-completion-report.md).
- [Legacy audit](legacy-integrations-audit.md) ghi nhận env và service-account key bị ignore trên máy nhưng không đọc nội dung. File tồn tại không chứng minh key còn hiệu lực hay đã revoke.
- Apps Script được kiểm tra chỉ đọc ngày 2026-10-17 trước khi owner xóa hai project. `HomeMatch API` khi đó có 4 deployments active (hai web app access `Anyone`, hai library); `Supabase_Connection_API` có trigger polling mỗi 10 phút và spreadsheet on-edit. Owner hiện xác nhận đã xóa cả hai Apps Script projects, gỡ deployments/triggers trực thuộc. Việc này chưa xác minh credential copies hoặc project khác. Chi tiết tại [runbook retirement](../../docs/12-operations/legacy-retirement-runbook.md).
- Cloud IAM/key, OAuth grant, Sheet/Drive/AppSheet permissions/automation, Supabase project/keys, Vercel env/cron/traffic/usage, CI secrets và bản sao ở máy/runner khác vẫn chưa được xác minh.
- Drive metadata lookup trong account connector hiện tại dùng các từ khóa `HomeMatch`, `homematch`, `imagecache`, `homematch.id.vn`, `Supabase`, `Google Apps Script` chưa tìm thấy tài nguyên phù hợp. Đây không phải bằng chứng các account/shared drive khác không chứa dữ liệu dự án.
- Local inventory trước cleanup ghi nhận `scripts/homematch-service-account.json` và `.env.local`; chưa đọc nội dung. Yêu cầu xóa hai file bị chặn ở bước auto-review vì chưa xác minh ownership/consumer và trạng thái revoke upstream. `gcloud`, `vercel`, `supabase`, `clasp` CLI hiện không có trong PATH.
- PR18 đã merge; web/API/Go checks và Vercel Preview Comments đều thành công. Các preview errors ban đầu của ba project chưa được điều tra build logs. Cả ba Git connections đã ngắt trước khi project bị xóa; IDs/domains/deployment hosts lịch sử được giữ trong [host registry](../../docs/12-operations/legacy-host-register.md).
- Cập nhật 2026-10-17 sau xác nhận của owner: dashboard Vercel xác nhận xóa ba project `home-match`, `home-match-admin`, `homematchvn-api`; danh sách team còn project ngoài scope `cluster-landing-page`. Dashboard Supabase xác nhận xóa `HomeMatch` và `HomeMatch Staging`; org hiện không còn project. Supabase production không có backup được liệt kê trước khi xóa nên dữ liệu đã bị xóa cùng project. iNET portal hiển thị domain còn hạn đến 24/06/2028; owner xác nhận auto-renew đã hủy. Hai bản ghi Vercel DNS bị owner xóa và sau reload zone iNET hiển thị rỗng; authoritative public delegation chưa được kiểm tra độc lập. iNET còn WordPress Hosting WP-H1 trạng thái trial và một WordPress install.
- Owner xác nhận đã xóa hai Apps Script projects `HomeMatch API` và `Supabase_Connection_API`; deployments và triggers gắn với chúng được gỡ theo project. Credential copies, OAuth grants và các Apps Script project khác vẫn `remote-unverified`.

## Owner checklist

1. Map từng resource tới owner, consumer, credential, data/retention, chu kỳ và rollback. Nếu shared hoặc owner chưa rõ, đánh dấu `needs-owner`.
2. Dừng workload có thể đảo ngược: Apps Script triggers, AppSheet automation, Vercel job/deploy flow; archive deployment sau dependency check; pause Supabase nếu plan hỗ trợ.
3. Backup/export dữ liệu và config cần giữ, xin retention sign-off. Chưa xóa Sheet/Drive, database, Cloud/Supabase/Vercel project hoặc domain trong bước này.
4. Quan sát logs/usage/billing qua ít nhất một chu kỳ thực, bao gồm retries và trễ. Xử lý consumers còn lại.
5. Disable/revoke đúng credential/access: key disable trước rồi theo dõi, OAuth grant, IAM/share permissions, Supabase/Vercel/CI secrets. Xóa credential local sau khi upstream revoke được xác minh.
6. Chỉ xóa resource/data sau retention approval, ghi giới hạn rollback và confirmation của provider.
7. Ghi evidence không chứa secret; cập nhật status cho từng resource, không suy ra remote retirement từ code removal.

### Chặn auto-deploy Vercel trước merge (nếu owner chọn)

Vercel tự tạo deploy cho commits/merge vào production branch khi project còn kết nối Git. Để tránh merge scaffold kích hoạt deploy Production legacy trước khi config được xác nhận, thao tác riêng từng project đã đối chiếu trong Vercel Dashboard: chọn team và project chính xác → **Settings > Git > Disconnect**. Ghi repo/production branch hiện tại và actor; sau khi quyết định kiến trúc/deployment mới, owner có thể reconnect. Việc disconnect chặn Preview và Production auto-deploy của project đó; không tự sửa check failure hiện tại và không cho biết nguyên nhân lỗi.

Các status context cần đối chiếu là `home-match`, `home-match-admin`, `homematchvn-api`. Đây là tên context từ GitHub status; trước khi đổi setting, xác nhận từng context trỏ đến đúng team/project trong Vercel Dashboard. Không suy ra project ID hoặc account từ tên context.

Owner cho phép tạm disconnect và giữ host tracking. Thực hiện xong cho ba projects qua **Settings > Git > Disconnect > Remove Connection**; UI xác nhận repository không còn kết nối. Merge PR18 sau khi checks xanh. Không áp dụng cấu hình chung `vercel.json`/repo. [Host registry và change log](../../docs/12-operations/legacy-host-register.md) ghi metadata đã quan sát. Việc này chưa pause deployment, xóa domains hay chứng minh traffic/chi phí đã dừng.

Nguồn: Vercel [Git settings: disconnect repository](https://vercel.com/docs/project-configuration/git-settings), [Ignored Build Step behavior](https://vercel.com/docs/project-configuration/project-settings), [automatic Git deployments and merge behavior](https://vercel.com/docs/git).

Chi tiết UI/CLI placeholder, rollback và evidence form: [runbook thu hồi tích hợp legacy](../../docs/12-operations/legacy-retirement-runbook.md).

## Bảng trạng thái hiện tại

| Nhóm | Trạng thái | Evidence để cập nhật |
|---|---|---|
| Apps Script source trong repo | `repo-removed` | P01 inventory/report, Git diff |
| Apps Script `HomeMatch API` | `deleted` (owner-confirmed; trước đó có 2 public web app + 2 library deployments) | Nếu cần, inventory consumer độc lập và credential copies; consumer traffic ngoài cửa sổ quan sát chưa xác minh |
| Apps Script `Supabase_Connection_API` | `deleted` (owner-confirmed; trước đó có 2 active triggers) | Inventory script/trigger copies, Sheet consumers và credential copies còn nơi khác |
| Các Apps Script khác / script properties | `remote-unverified` | Xác minh inventory đầy đủ theo account/creator và mapping properties tới consumers; không ghi property values |
| Cloud service accounts/keys/IAM/APIs/jobs/billing | `remote-unverified` | Project inventory, key metadata, IAM policy, usage/audit logs, provider confirmation |
| Google OAuth grants | `remote-unverified` | Account security review và revoke confirmation |
| Sheets/Drive/shares/shared drives | `remote-unverified` | Owner, inherited permission, consumer map, retention decision |
| AppSheet apps/bots/sources | `remote-unverified` | App/bot owner, audit history, source map, stop/delete evidence |
| Supabase schema artifacts in repo / remote projects | `repo-removed` / `deleted` | Git evidence; dashboard xác nhận xóa `HomeMatch` và `HomeMatch Staging`, org list rỗng sau thao tác |
| Vercel HomeMatch projects/Git | `deleted` | Dashboard sau xóa còn `cluster-landing-page` ngoài scope; historical metadata ở [host register](../../docs/12-operations/legacy-host-register.md) |
| Domain registration / DNS | `active-to-2028-06-24, owner-reported-auto-renew-off` / `iNET-zone-empty` | Public authoritative nameserver chưa xác minh độc lập; WordPress hosting/service còn tồn tại riêng |
| Vercel env/cron/traffic/usage | `remote-unverified` | Env names by target (không đọc value), job/traffic map, usage interval, deployment evidence |
| Ignored local env/key and runner copies | `workspace-present; deletion pending owner confirmation` / remote revoke `unverified` | Xác nhận xóa đúng `.env.local` và `scripts/homematch-service-account.json`; inventory copies, revoke proof và runner evidence |

## Evidence log

| UTC date | Resource ID (masked) | Owner | Consumer/retention confirmed | Action/status | Safe evidence link | Usage observed through | Conclusion |
|---|---|---|---|---|---|---|---|
| `<YYYY-MM-DDThh:mmZ>` | `<provider/type/[redacted]>` | `<owner>` | `<yes/no + note>` | `<stop/disable/revoke/delete>` | `<ticket/console log, no secret>` | `<timestamp/range>` | `<status>` |

Không ghi secret value, private key, token, cookie, env dump, raw request hoặc user data. Tài nguyên dùng chung chưa có owner/retention approval ở `remote-unverified` hoặc `needs-owner`. P01 code removal không thay đổi trạng thái đó.
