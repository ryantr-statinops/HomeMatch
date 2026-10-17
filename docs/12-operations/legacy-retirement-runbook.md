# Runbook thu hồi tích hợp legacy

**Ngày xác minh nguồn chính thức:** 2026-10-16
**Trạng thái:** P01 đã gỡ code tích hợp legacy khỏi repository. Ngày 2026-10-17 owner đã xóa ba project Vercel, hai project Supabase và hai project Apps Script thuộc HomeMatch; bằng chứng theo từng dòng ở mục "Nhật ký thực hiện đợt này" và [evidence log P02](../../task/research-terminal-plan/p02-legacy-status.md). Google Cloud/IAM/keys, OAuth grants, Sheet/Drive/AppSheet, CI secrets và hai bản credential local vẫn `remote-unverified`. Quy trình A–F bên dưới giữ nguyên làm thủ tục dùng lại, **không** tick theo đợt này; xem mục "Kết quả đối chiếu với quy trình" để xem bước nào đã đạt, bước nào lệch.

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

## Kết quả đối chiếu với quy trình

Đối chiếu đợt 2026-10-17 với quy trình A–F. Các ô checkbox trong A–F giữ nguyên trạng thái `[ ]` vì là thủ tục tái sử dụng cho lần sau, không phải nhật ký lần này.

| Bước | Kết quả | Mức đạt | Sai lệch cần lưu ý |
|---|---|---|---|
| A. Inventory — chọn đúng account/org/project | Xác định được Vercel team `ryantr-statinops-projects`, Supabase org, Apps Script project IDs (do owner cung cấp) | Đạt một phần | **Chưa có** Google Cloud Project ID và chưa lập inventory AppSheet |
| A. Inventory — một dòng cho mỗi resource | Có bảng status trong `p02-legacy-status.md` và change log host register | Đạt một phần | Dòng Cloud/AppSheet chỉ ở mức `remote-unverified`, chưa có ID |
| A. Inventory — tìm trigger/executions, OAuth, shares, CI secrets, credential local | Rà được trigger/executions/deployments của hai Apps Script project; Drive lookup theo từ khóa không ra kết quả khớp | Đạt một phần | OAuth grants, IAM, Cloud jobs, AppSheet bots, Vercel env/cron, CI secrets **chưa** rà; Drive không tìm thấy kết quả khớp không phải bằng chứng mọi shared drive trống |
| A. Inventory — xác nhận consumer khác với owner | Chưa có consumer nào được owner xác nhận bằng văn bản | **Chưa đạt** | Việc xóa vẫn dựa trên owner là chủ sở hữu tài nguyên |
| B. Dừng workloads — Apps Script trigger/deployment | Hai project bị xóa nên trigger và deployment gắn về bị gỡ theo project | Đạt (tự động) | Không archive riêng được vì không còn project chứa deployment; consumer gọi endpoint sau thời điểm xóa không được theo dõi |
| B. Dừng workloads — Vercel Git disconnect | Ba project đã disconnect Git ngày 2026-10-16, UI xác nhận | Đạt | Project sau đó đã bị xóa; rollback bằng reconnect không còn áp dụng |
| B. Dừng workloads — AppSheet, Sheet/Drive | Chưa thao tác | **Chưa đạt** | AppSheet automation, quyền share Sheet/Drive vẫn `remote-unverified` |
| C. Backup và retention — Supabase export | Không có backup nào được liệt kê trước khi xóa; staging đang paused | **Lệch quy trình** | Bước C yêu cầu export và retention sign-off **trước** khi delete. Thực tế đã xóa `HomeMatch` production **không có backup**. Dữ liệu và backups không thể khôi phục. Không lặp lại cho tài nguyên khác |
| C. Backup và retention — Google Cloud | Chưa lập inventory nên chưa đánh giá backup | **Chưa đạt** | Project Cloud chưa xác định; chưa đụng tới nhưng vẫn là khoản trống |
| D. Revoke — service-account key, OAuth, IAM, Supabase/Vercel/CI secrets | Không có revoke nào được xác minh. Hai file local `.env.local` và `scripts/homematch-service-account.json` còn tồn tại | **Chưa đạt** | Xóa project **không** revoke credential. Bản sao key/OAuth có thể còn hiệu lực |
| E. Verify trước xóa — quan sát qua một chu kỳ thực | `HomeMatch API` 0 execution/7 ngày; `Supabase_Connection_API` 50 execution/7 ngày | Đạt một phần | Xóa diễn ra **ngay sau** quan sát, chưa có cửa sổ xác nhận "không còn executions sau thời điểm dừng". Usage/billing kỳ kế tiếp chưa theo dõi |
| F. Xóa cuối cùng — điều kiện inventory + backup + retention + owner approval | Ba project Vercel và hai project Apps Script có owner approval. Supabase production **không** có backup | Lệch một phần | Owner approval có, nhưng điều kiện backup/retention của Supabase chưa đạt |
| F. Xóa cuối cùng — cập nhật trạng thái | Bảng status và evidence log đã cập nhật `deleted`/`remote-unverified` | Đạt | Chỉ đánh dấu `deleted` khi có provider UI confirmation |

**Kết luận đợt này:** phần *hosting và code* đã về `deleted`. Phần *identity* — service-account keys, OAuth grants, IAM, CI/hosting secrets và bản sao local — **chưa được thu hồi**, và đó mới là phần có rủi ro bảo mật còn lại. Domain registration `homematch.id.vn` còn hiệu lực đến 24/06/2028 và hosting WordPress WP-H1 còn tồn tại là tài nguyên riêng.

## Nhật ký thực hiện đợt này

Ngày 2026-10-17 (Asia/Saigon), coordinator đã kiểm tra các mục sau. Không có quyền, dữ liệu hay project nào bị xóa hoặc thu hồi trong lượt kiểm tra này.

| Resource | Evidence đã có | Trạng thái | Việc còn thiếu |
|---|---|---|---|
| Vercel `home-match`, `home-match-admin`, `homematchvn-api` | Owner xác nhận xóa cả ba; dashboard chuyển về danh sách chỉ còn project ngoài scope `cluster-landing-page` | `deleted`; Vercel project/deployments/settings/domain bindings đã xóa theo dashboard | Domain registration `homematch.id.vn` không bị xóa bởi project deletion; domain/hosting iNET là tài nguyên riêng |
| Domain `homematch.id.vn`, iNET DNS và hosting | iNET portal ngày 2026-10-17 hiển thị domain `Đang hoạt động`, hết hạn 24/06/2028; owner báo auto-renew đã hủy. Portal ban đầu có `@ A 216.198.79.1` và `www CNAME 2be7d57f713413fb.vercel-dns-017.com`; sau owner xóa, tải lại zone hiển thị `Không có dữ liệu`. OneShield yêu cầu đổi nameserver để zone có hiệu lực; authoritative delegation chưa kiểm tra độc lập. iNET còn liệt kê WordPress Hosting WP-H1 trạng thái `Dùng thử` và panel có một WordPress install cho domain. | Domain registration vẫn đến hạn 24/06/2028 với auto-renew `owner-reported-disabled`; zone iNET đang trống; hosting/WordPress vẫn tồn tại riêng | Nếu muốn retire toàn bộ iNET hosting, xử lý gói WP-H1 và dữ liệu WordPress riêng; việc xóa DNS không hủy hosting. Kiểm tra nameserver delegation để xác nhận hiệu lực public |
| Google Drive trong account connector hiện tại | Tìm metadata theo `HomeMatch`, `homematch`, `imagecache`, `homematch.id.vn`, `Supabase`, `Google Apps Script`; không có kết quả phù hợp. Root listing đầu tiên không cho thấy tên project | Chưa xác định file/folder Drive thuộc dự án; đây không phải bằng chứng mọi shared drive hoặc account khác đều trống | Owner cung cấp account/project/folder cụ thể hoặc đường dẫn/ID từ Apps Script/Drive cũ để đối chiếu |
| Local ignored credential/config | Inventory trước cleanup ghi nhận `scripts/homematch-service-account.json` và `.env.local`; nội dung chưa được mở. Yêu cầu xóa hai file bị chặn bởi auto-review vì chưa xác minh ownership/consumer và trạng thái revoke upstream. `gcloud`, `vercel`, `supabase`, `clasp` CLI không có trong PATH hiện tại | `workspace-present; deletion pending owner confirmation`; revoke upstream `unverified` | Xác nhận đúng hai file local có thể xóa; map consumer/owner và revoke key upstream trước khi xóa bản sao |
| Apps Script `HomeMatch API` (ID che: `1-ohEko…`) | Owner xác nhận đã xóa project Apps Script ngày 2026-10-17. Trước khi xóa, UI cho thấy 0 trigger, 0 execution trong 7 ngày và 4 deployment active: hai web app (version 23, deploy 2026-06-19; version 12 mô tả `v11`, access `Anyone`) cùng hai library deployment. | `deleted` theo xác nhận owner; xóa project đồng thời gỡ web app và library deployments. Consumer traffic ngoài cửa sổ quan sát chưa xác minh. | Nếu phát hiện consumer còn gọi endpoint, cần chuyển consumer sang đích mới; không còn deployment trong project để archive riêng. Kiểm tra project khác/credential copies theo inventory. |
| Apps Script `Supabase_Connection_API` (ID che: `1L0ppU…`) | Owner xác nhận đã xóa project Apps Script ngày 2026-10-17. Trước khi xóa, project có trigger time-driven `pollSupabaseChanges` mỗi 10 phút (UI error rate 10.03%) và spreadsheet on-edit `installedOnEdit`; history có 50 lần trong 7 ngày, phần lớn hoàn thành và có một số timeout. | `deleted` theo xác nhận owner; xóa project đồng thời gỡ cả hai trigger. Trạng thái chạy trước khi xóa không chứng minh Supabase sync thành công. | Kiểm tra có bản sao script/trigger hoặc consumer độc lập nào còn tồn tại; kiểm tra credential/script properties còn bản sao theo inventory, không ghi secret vào log. |
| Supabase `HomeMatch` (ID che: `rccszq…`) và `HomeMatch Staging` (ID che: `nawypm…`) | Dashboard org ban đầu liệt kê hai project; staging đang paused. Sau xác nhận của owner, dashboard hiển thị toast `Successfully deleted` riêng cho từng project; danh sách hiện không còn project và database size usage về 0 | `deleted` theo dashboard; dữ liệu và backups của project production không thể khôi phục; staging cũng đã xóa | Theo dõi usage/billing kỳ hiện tại; revoke/rotate credential còn bản sao; kiểm tra local/runner env sau consumer inventory |
| Google Cloud, AppSheet | Project Cloud cụ thể và AppSheet resources chưa được xác định bằng owner | `remote-unverified` | Lập inventory riêng cho project, consumer, backup/retention, keys và usage trước khi pause/revoke/delete |

### Điểm dừng cần thông tin owner

Không tự chọn Cloud project từ tên HomeMatch hoặc đoán theo file local. Bước tiếp theo là xác định Google account và **Project ID** chứa service account (hoặc mở trực tiếp tài nguyên liên quan trong Cloud Console). Apps Script project IDs đã được owner cung cấp qua link; ghi nhận trên đây chỉ để inventory, không suy ra Cloud project hay quyền truy cập. Khi có Project ID, kiểm tra danh sách service accounts và key metadata trước; không tải hay in private key. Nếu owner chưa biết ID, kiểm tra danh sách project trong account và chỉ ghi tên/ID để owner xác nhận trước khi thay đổi.

**Ghi nhận trước khi xóa cloud, 2026-10-17:** khi đó `HomeMatch API` có web app deployment `Anyone` dù không thấy execution trong cửa sổ 7 ngày; khoảng trống này không chứng minh không còn consumer. `Supabase_Connection_API` đang polling định kỳ và có spreadsheet edit trigger.

**Cập nhật sau đó, 2026-10-17:** owner xác nhận đã xóa ba project Vercel HomeMatch và hai project Supabase HomeMatch qua dashboard; project Vercel `cluster-landing-page` ngoài scope được giữ. Owner đã xóa hai DNS records Vercel khỏi zone iNET; sau khi tải lại, zone hiển thị `Không có dữ liệu`. Domain registration còn hạn đến 24/06/2028 và auto-renew do owner báo đã tắt; WordPress Hosting WP-H1 cùng một WordPress install vẫn còn. Owner xác nhận đã xóa cả hai Apps Script projects `HomeMatch API` và `Supabase_Connection_API`; do đó deployments, triggers và các thành phần gắn với các project đó đã bị gỡ. Việc xóa project chưa xác minh có bản sao hoặc credential còn lại ở Cloud, Sheet/Drive, OAuth, máy local hay runner; tiếp tục inventory các phần này.

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
