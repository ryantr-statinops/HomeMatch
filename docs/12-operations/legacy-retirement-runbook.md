# Runbook thu hồi tích hợp legacy

**Ngày xác minh nguồn chính thức:** 2026-10-16
**Trạng thái:** P01 đã gỡ code tích hợp legacy khỏi repository. Ba Vercel Git connections đã được xác minh là ngắt; project, deployment và domain vẫn được giữ. Google Cloud/Workspace, Supabase, workload Vercel còn lại và credential bị ignore chưa được xác minh hay thu hồi. Đây là thủ tục cho account owner, không phải bằng chứng đã xóa.

## Nguyên tắc

1. Xác định chính xác account, resource ID, owner, consumers, lịch chạy, dữ liệu và quyền dùng chung. Không đoán ID. Nếu owner/consumer chưa rõ, dừng ở `needs-owner`.
2. Ghi baseline logs, usage và billing qua khoảng thời gian bao trùm chu kỳ chạy; kiểm tra CI, runner và máy cá nhân ngoài repo.
3. Dừng workload có thể đảo ngược trước; theo dõi lỗi/usage tối thiểu một chu kỳ thực. Nếu nghi credential bị lộ, xử lý disable ngay như incident.
4. Sao lưu dữ liệu/cấu hình cần giữ và chốt retention trước xóa. Xác nhận backup có thể đọc/restore, nơi lưu được bảo vệ và người phê duyệt.
5. Revoke quyền/credential sau khi consumer dừng. Disable/pause trước delete khi có thể. Xóa local key chỉ sau khi key cloud tương ứng đã revoke và mapping bản sao đã xác minh.
6. Evidence chỉ ghi metadata, actor, thời điểm UTC, trạng thái và link log an toàn. Không ghi secret, token, private key, env value, cookie, request header/payload.

## Quy trình

### A. Inventory

- [ ] Chọn đúng Google account/Cloud organization/project, Supabase org/project, Vercel team/project và AppSheet account.
- [ ] Tạo một dòng cho mỗi resource; ghi owner, stable ID, consumers, credential principal, chu kỳ, dữ liệu, backup/retention và phương án rollback.
- [ ] Tìm Apps Script triggers/executions, OAuth clients/grants, AppSheet bots, Cloud jobs/APIs, Drive/Sheet shares, Supabase jobs/webhooks, Vercel deployments/cron/env/domain, CI secrets và các bản credential local/runner.
- [ ] Xác nhận mọi consumer khác với owner. Không sửa resource dùng chung khi chưa có owner approval.

### B. Dừng workloads

- [ ] Apps Script: trong project kiểm tra **Triggers**, đồng thời `script.google.com` > **My Triggers**; trigger do user khác tạo cần review bởi user đó vì trigger chạy dưới quyền người tạo. Xóa installable trigger legacy đã xác nhận. Rà simple triggers `onOpen`, `onEdit`, `doGet`, `doPost` trong source; cần release để bỏ chúng.
- [ ] Apps Script deployment: **Deploy > Manage deployments**, xác nhận consumers rồi archive versioned deployment. Versioned deployments được archive thay vì xóa lịch sử; API executable/add-on/web app có thể phụ thuộc deployment.
- [ ] AppSheet: rà app, bots/tasks và datasource; dừng automation/app, xem audit history. Xóa app là thao tác riêng; xóa app không xóa Google Sheet/Drive datasource.
- [ ] Vercel: dừng cron/automation/promotion/traffic route theo cấu hình đã xác nhận; giữ project và domain cho đến khi traffic/retention rõ.
- [ ] Trước khi merge PR có Vercel Git integration đang tự deploy, owner có thể tạm ngắt auto-deploy theo từng project: Vercel Dashboard > chọn đúng team/project > **Settings > Git > Disconnect**. Ghi lại repository/production branch và người có quyền reconnect; xác nhận trạng thái sau thao tác. Đây là thao tác có thể đảo ngược bằng cách reconnect, nhưng chặn Preview và Production auto-deploy của project đó. Nếu cần giữ Git connection, **Settings > Build and Deployment > Ignored Build Step > Don't build anything** sẽ cancel builds; cancellation vẫn tiêu quota deployment, nên cân nhắc và kiểm tra branch-protection effect trước. Không giả định một cách sẽ biến check đang fail thành success.
- [ ] Supabase: với Free project, có thể **Settings > General > Project availability > Pause Project** để giữ dữ liệu và resume. Tài liệu hiện hành nói paid project không thể pause trực tiếp. Pause không revoke credential.
- [ ] Sheet/Drive: chưa xóa. Rà quyền trực tiếp, kế thừa từ folder/shared drive, general access và service-account access.

### C. Backup và retention

- [ ] Sheet/Drive: quyết định giữ, archive/export hoặc xóa; kiểm tra parent folder/shared-drive membership và quyền kế thừa.
- [ ] Supabase: trước delete, export database và Storage objects cần giữ; lưu cấu hình Auth/provider, functions, webhooks, triggers/policies và retention approval.
- [ ] Google Cloud project: inventory API, buckets, logs, jobs, OAuth clients, IAM, billing, commitments/liens và dependencies. Project shutdown làm project unusable ngay và ngắt billing account liên kết, rồi có cửa sổ restore 30 ngày; một số resource có thể bị xóa sớm hơn. Phí của billing cycle hiện tại vẫn có thể xuất hiện; tắt billing riêng nếu cần sau khi đánh giá impact.
- [ ] Vercel: lưu build/deploy, cron, domain/DNS ownership, integration và tên biến theo environment (không export giá trị vào ticket). Domain removal có thể ảnh hưởng traffic/DNS.
- [ ] Chưa có backup hoặc retention sign-off thì không xóa dữ liệu/project.

### D. Revoke access và secrets

- [ ] Service-account key: đối chiếu service account và `KEY_ID` từ metadata, disable trước, theo dõi logs/consumers qua chu kỳ chạy, rồi delete sau owner approval. Disable có thể enable lại; deleted key không thể undelete.
- [ ] Nếu cần chặn khẩn cấp cả identity, owner có thể disable toàn service account; điều này làm mọi workload của account mất access ngay.
- [ ] OAuth grant: đúng Google Account > **Security > Connections to third-party apps and services** (tên mục có thể thay đổi) > app > remove access. Revoke không xóa dữ liệu app đã copy; xử lý retention với nhà cung cấp.
- [ ] IAM và Drive/Sheet: gỡ role/share cho đúng principal/scope sau consumer check; xem policy kế thừa và shared-drive membership.
- [ ] Supabase/Vercel/CI: rotate hoặc revoke credential upstream; bỏ tên biến legacy khỏi Supabase/Vercel/team/CI/runner/máy đã inventory. Vercel env thay đổi chỉ áp dụng deployment mới, cần redeploy theo quy trình đã duyệt. Xóa biến khỏi nơi lưu không vô hiệu credential đã copy.
- [ ] Sau revoke, xóa bản credential local bằng exact path đã inventory, không mở nội dung. Xóa từng bản trên runner/backup theo retention. Xóa file local không revoke credential cloud.

### E. Verify trước xóa

- [ ] Kiểm tra Apps Script execution history, Cloud Logging/audit logs/API metrics/scheduler, Sheets/Drive activity, AppSheet audit, Supabase usage/logs, Vercel functions/cron/deployments/usage và CI history.
- [ ] Xác nhận không còn executions/requests sau thời điểm dừng, ngoài operator probes. Khoảng không có log ngắn không chứng minh không còn consumer.
- [ ] Theo dõi qua chu kỳ đủ để phủ lịch, retries và batch trễ. Kiểm tra billing/usage hiện tại và hóa đơn kỳ kế tiếp vì metrics có độ trễ.
- [ ] Nếu thấy usage, lỗi consumer hoặc chi phí, tìm dependency còn sót và khôi phục theo rollback trước khi tiếp tục.

### F. Xóa cuối cùng

- [ ] Chỉ xóa resource khi inventory, backup, retention và owner approval hoàn tất. Ghi provider confirmation.
- [ ] Google Cloud project: sau shutdown, có thể restore 30 ngày; billing không tự nối lại, có thể mất dữ liệu sớm ở một số service và có thể mất đến 36 giờ để dịch vụ chạy lại.
- [ ] Supabase project delete là vĩnh viễn, xóa database, backups, Storage, Auth, functions, keys/config. Billing project dừng nhưng usage kỳ hiện tại vẫn có thể được tính.
- [ ] Vercel project delete xóa deployments, domains, env vars và settings. Chuyển domain/traffic cần giữ trước đó.
- [ ] Cập nhật trạng thái: `repo-removed`, `remote-unverified`, `identified`, `stopped`, `disabled`, `revoked`, `deleted`, `retained`. `deleted` chỉ khi có evidence provider.

## Nhật ký thực hiện đợt này

Ngày 2026-10-17 (Asia/Saigon), coordinator đã kiểm tra các mục sau. Không có quyền, dữ liệu hay project nào bị xóa hoặc thu hồi trong lượt kiểm tra này.

| Resource | Evidence đã có | Trạng thái | Việc còn thiếu |
|---|---|---|---|
| Vercel `home-match`, `home-match-admin`, `homematchvn-api` | Owner xác nhận xóa cả ba; dashboard chuyển về danh sách chỉ còn project ngoài scope `cluster-landing-page` | `deleted`; Vercel project/deployments/settings/domain bindings đã xóa theo dashboard | Domain registration `homematch.id.vn` không bị xóa bởi project deletion; domain/hosting iNET là tài nguyên riêng |
| Domain `homematch.id.vn`, iNET DNS và hosting | iNET portal ngày 2026-10-17 hiển thị domain `Đang hoạt động`, hết hạn 24/06/2028; owner báo auto-renew đã hủy. Portal ban đầu có `@ A 216.198.79.1` và `www CNAME 2be7d57f713413fb.vercel-dns-017.com`; sau owner xóa, tải lại zone hiển thị `Không có dữ liệu`. OneShield yêu cầu đổi nameserver để zone có hiệu lực; authoritative delegation chưa kiểm tra độc lập. iNET còn liệt kê WordPress Hosting WP-H1 trạng thái `Dùng thử` và panel có một WordPress install cho domain. | Domain registration vẫn đến hạn 24/06/2028 với auto-renew `owner-reported-disabled`; zone iNET đang trống; hosting/WordPress vẫn tồn tại riêng | Nếu muốn retire toàn bộ iNET hosting, xử lý gói WP-H1 và dữ liệu WordPress riêng; việc xóa DNS không hủy hosting. Kiểm tra nameserver delegation để xác nhận hiệu lực public |
| Google Drive trong account connector hiện tại | Tìm metadata theo `HomeMatch`, `homematch`, `imagecache`, `homematch.id.vn`, `Supabase`, `Google Apps Script`; không có kết quả phù hợp. Root listing đầu tiên không cho thấy tên project | Chưa xác định file/folder Drive thuộc dự án; đây không phải bằng chứng mọi shared drive hoặc account khác đều trống | Owner cung cấp account/project/folder cụ thể hoặc đường dẫn/ID từ Apps Script/Drive cũ để đối chiếu |
| Local ignored credential/config | `scripts/homematch-service-account.json` và `.env.local` tồn tại; nội dung không được mở. `gcloud`, `vercel`, `supabase`, `clasp` CLI không có trong PATH hiện tại | `local-present-unverified`; không chứng minh key còn hiệu lực | Đối chiếu key ID/principal với đúng Cloud project và mọi consumer; revoke upstream trước khi xóa bản local |
| Apps Script `HomeMatch API` (ID che: `1-ohEko…`) | Kiểm tra lại 2026-10-17: 0 trigger, 0 execution trong 7 ngày. Có 4 deployment đang hoạt động: hai web app (version 23, deploy 2026-06-19; version 12, description `v11`) đều chạy bằng owner và access `Anyone`; hai deployment còn lại là library, không có web app URL trong cấu hình. | `identified`; hai endpoint web app vẫn public theo cấu hình, consumers chưa rõ | Đối chiếu consumers và phạm vi dữ liệu trước khi archive hai web app deployment; library deployment cũng cần kiểm tra consumers trước khi archive. Không đưa deployment URL vào tài liệu. |
| Apps Script `Supabase_Connection_API` (ID che: `1L0ppU…`) | Kiểm tra lại 2026-10-17: 2 trigger — time-driven `pollSupabaseChanges` chạy mỗi 10 phút, UI error rate 10.03%, lần gần nhất 10:46:46 hoàn thành trong 23.381 giây; spreadsheet on-edit `installedOnEdit`. Execution history có 50 lần trong 7 ngày xem được, phần lớn hoàn thành và có timeout khoảng 04:06/04:46. Supabase projects đã xóa. | `identified` và vẫn chạy; trạng thái `Completed` của Apps Script không chứng minh đồng bộ Supabase thành công (lỗi có thể được xử lý trong script) | Dừng trigger time-driven và on-edit sau khi xác nhận Sheet/automation không còn cần; kiểm tra consumers/retention và xử lý script properties/credential upstream mà không đọc/ghi secret vào log |
| Supabase `HomeMatch` (ID che: `rccszq…`) và `HomeMatch Staging` (ID che: `nawypm…`) | Dashboard org ban đầu liệt kê hai project; staging đang paused. Sau xác nhận của owner, dashboard hiển thị toast `Successfully deleted` riêng cho từng project; danh sách hiện không còn project và database size usage về 0 | `deleted` theo dashboard; dữ liệu và backups của project production không thể khôi phục; staging cũng đã xóa | Theo dõi usage/billing kỳ hiện tại; revoke/rotate credential còn bản sao, dọn Apps Script trigger và local/runner env sau consumer inventory |
| Google Cloud, AppSheet | Project Cloud cụ thể và AppSheet resources chưa được xác định bằng owner | `remote-unverified` | Lập inventory riêng cho project, consumer, backup/retention, keys và usage trước khi pause/revoke/delete |

### Điểm dừng cần thông tin owner

Không tự chọn Cloud project từ tên HomeMatch hoặc đoán theo file local. Bước tiếp theo là xác định Google account và **Project ID** chứa service account (hoặc mở trực tiếp tài nguyên liên quan trong Cloud Console). Apps Script project IDs đã được owner cung cấp qua link; ghi nhận trên đây chỉ để inventory, không suy ra Cloud project hay quyền truy cập. Khi có Project ID, kiểm tra danh sách service accounts và key metadata trước; không tải hay in private key. Nếu owner chưa biết ID, kiểm tra danh sách project trong account và chỉ ghi tên/ID để owner xác nhận trước khi thay đổi.

**Ghi nhận trước khi xóa cloud, 2026-10-17:** hai Apps Script chưa được dừng. Khi đó `HomeMatch API` có web app deployment `Anyone` dù không thấy execution trong cửa sổ 7 ngày; khoảng trống này không chứng minh không còn consumer. `Supabase_Connection_API` đang polling định kỳ và có spreadsheet edit trigger. Các Apps Script vẫn còn sau khi xóa hosting/database; thao tác xóa trigger, archive deployment hoặc đổi access cần owner xác nhận ngay trước thao tác; nếu consumer/retention chưa rõ thì tiếp tục ở trạng thái `needs-owner`.

**Cập nhật sau đó, 2026-10-17:** owner xác nhận và coordinator đã xóa ba project Vercel HomeMatch cùng hai project Supabase HomeMatch qua dashboard; project Vercel `cluster-landing-page` ngoài scope được giữ. Owner đã xóa hai DNS records Vercel khỏi zone iNET; sau khi tải lại, zone hiển thị `Không có dữ liệu`. Domain registration còn hạn đến 24/06/2028 và auto-renew do owner báo đã tắt; WordPress Hosting WP-H1 cùng một WordPress install vẫn còn. Apps Script `Supabase_Connection_API` vẫn có hai trigger và `HomeMatch API` còn hai web app deployment public; đây là các bước còn lại của Apps Script retirement. Cloud IAM/keys, OAuth, Sheet/Drive/AppSheet và bản sao local/runner vẫn cần inventory riêng.

## CLI templates

Thay placeholder bằng ID đã kiểm chứng; xác nhận account/project context trước lệnh. Không đặt secret/token trong command hoặc history.

```sh
# List metadata, không xuất private key
gcloud iam service-accounts keys list --iam-account=<SERVICE_ACCOUNT_EMAIL> --project=<PROJECT_ID> --managed-by=user

# Reversible first; monitor before deleting
gcloud iam service-accounts keys disable <KEY_ID> --iam-account=<SERVICE_ACCOUNT_EMAIL> --project=<PROJECT_ID>
gcloud iam service-accounts keys delete <KEY_ID> --iam-account=<SERVICE_ACCOUNT_EMAIL> --project=<PROJECT_ID>

# Project shutdown: destructive final step after sign-off
gcloud projects delete <PROJECT_ID>

# List/remove one environment variable without pulling its value to disk
vercel env ls <development|preview|production> --scope <TEAM>
vercel env rm <VARIABLE_NAME> <development|preview|production> --scope <TEAM>

# Destructive, irreversible Supabase project deletion
supabase projects delete <PROJECT_REF>
```

Kiểm tra CLI help/version và project link trước chạy. Supabase delete không thể phục hồi; ưu tiên Pause nếu plan hỗ trợ và cần giữ dữ liệu. Google Cloud project shutdown ảnh hưởng toàn project, không phải thay thế cho việc dừng từng workload.

## Rollback và giới hạn

- Trigger, deployment, automation đã dừng thường có thể bật/deploy lại từ metadata đã ghi; kiểm tra side effect và duplicate run trước khi mở traffic.
- Disabled service-account key có thể enable; deleted key không thể restore. Tạo credential mới theo phê duyệt, cập nhật consumer rồi revoke bản cũ.
- OAuth revoke có thể cần user consent lại; dữ liệu đã được app copy không biến mất tự động.
- Drive permission có thể cấp lại cho principal đã ghi nhận; quyền kế thừa/shared-drive policy có thể tác động nhiều file.
- Supabase paused có thể resume trong restore window nhà cung cấp (docs hiện ghi 1 năm); deleted project không phục hồi.
- Google Cloud shutdown có cửa sổ restore 30 ngày nhưng không bảo đảm mọi resource còn, billing phải nối lại thủ công và một số resource có thời hạn ngắn hơn.
- Vercel project deletion cần tái tạo settings/deploy; secret đã rotate không lấy lại được.
- Git revert chỉ phục hồi tracked source; không phục hồi data, IAM, OAuth, deleted keys, deployment secrets hay ignored files.

## Evidence template

Không đính kèm `.env`, JSON key, token, private key, cookie, raw request, user data hoặc URL có token. Che resource identifiers theo policy.

| Trường | Giá trị |
|---|---|
| Ticket / resource provider + type | `<ticket> / <provider/type>` |
| Tên hiển thị / ID đã che | `<label> / <[redacted] hoặc ID>` |
| Account/project scope | `<label>` |
| Owner / operator / thời gian UTC | `<owner> / <actor> / <timestamp>` |
| Consumers, chu kỳ, retention approval | `<summary + link an toàn>` |
| Backup và restore check | `<ticket/path được bảo vệ/result>` |
| Trạng thái trước → hành động | `<active → paused/disabled/revoked/deleted>` |
| Evidence an toàn | `<console page, audit filter, deployment ID>` |
| Usage/cost interval | `<metric + từ/đến UTC>` |
| Rollback path/limit | `<cách và thời hạn>` |
| Kết luận | `<remote-unverified/stopped/...>` |

## Nguồn chính thức đã kiểm tra 2026-10-16

- Google Cloud: [disable/enable key](https://docs.cloud.google.com/iam/docs/keys-disable-enable), [create/delete key](https://docs.cloud.google.com/iam/docs/keys-create-delete), [gcloud disable key](https://docs.cloud.google.com/sdk/gcloud/reference/iam/service-accounts/keys/disable), [delete/restore project](https://docs.cloud.google.com/resource-manager/docs/delete-restore-projects).
- Apps Script: [installable triggers](https://developers.google.com/apps-script/guides/triggers/installable), [manage deployments](https://developers.google.com/apps-script/concepts/deployments), [deployment API warning](https://developers.google.com/apps-script/api/how-tos/manage-deployments).
- Google Account/Drive: [remove connected app access](https://support.google.com/accounts/answer/14012355), [Drive sharing and inherited access](https://support.google.com/drive/answer/2494822).
- AppSheet: [delete apps and datasource behavior](https://support.google.com/appsheet/answer/10104498).
- Supabase: [project pausing](https://supabase.com/docs/guides/platform/free-project-pausing), [delete project and backup precautions](https://supabase.com/docs/guides/platform/delete-project).
- Vercel: [env CLI](https://vercel.com/docs/cli/env), [project pause/delete effects](https://vercel.com/docs/projects/managing-projects), [domain removal](https://vercel.com/docs/domains/working-with-domains/remove-a-domain).
- Vercel Git safeguards: [disconnect Git repository](https://vercel.com/docs/project-configuration/git-settings), [Ignored Build Step](https://vercel.com/docs/project-configuration/project-settings).
