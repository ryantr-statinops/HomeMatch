# P02 Auth feasibility — bằng chứng và ứng viên ADR

**Ngày nghiên cứu:** 2026-10-16  
**Trạng thái:** đã rà soát bằng chứng; chưa chọn nhà cung cấp, tạo project hoặc kiểm tra cấu hình nhà cung cấp.  
**Phạm vi:** managed email authentication cho client React/Vite và API FastAPI. Đây là tài liệu đầu vào cho coordinator P02; không thay đổi runtime và không cho phép provision.

## Đề xuất đưa vào ADR

Thực hiện một spike triển khai ngắn với **Clerk là ứng viên auth-only ưu tiên**, đồng thời so sánh với **Auth0**. Không mặc định chọn Supabase Auth. Clerk công bố mức miễn phí Hobby gồm 50.000 monthly retained users (MRU) mỗi app, hỗ trợ password, email code và email link, và cho phép production email dùng domain của ứng dụng. Clerk có hướng dẫn xác minh JWT thủ công qua public key/JWKS; SDK Backend chính thức có `verifyToken()` là JavaScript. Tài liệu đã tra cứu chưa xác nhận SDK Python chính thức hoặc một tích hợp FastAPI cụ thể, vì vậy spike phải kiểm tra JWT Clerk thực tế bằng thư viện JOSE Python và đối chiếu format/claims. Cấu trúc này phù hợp với kiến trúc hiện tại: managed auth được chọn riêng, còn nơi lưu dữ liệu chưa quyết định.

Auth0 có mức miễn phí công bố là 25.000 monthly active users (MAU), nhưng email sender tích hợp chỉ dành cho kiểm thử, tối đa 10 email/phút và có thể âm thầm bỏ thư vượt mức; production cần cấu hình email provider riêng. Supabase có 50.000 MAU trong Free và có thể phù hợp nếu sau này chọn Postgres của họ, nhưng SMTP mặc định chỉ gửi tới địa chỉ đã cấp quyền của thành viên team, hiện giới hạn 2 email/giờ; project Free có thể bị pause sau một tuần không hoạt động.

Đây là ứng viên ADR, chưa phải quyết định được duyệt. Trước khi chốt, hãy xác nhận luồng React/Vite không phụ thuộc Next.js, xác minh chữ ký/claims ở FastAPI, email xác minh đăng ký và khôi phục mật khẩu, vòng đời session/reset, nghĩa vụ xóa tài khoản và tổng chi phí tháng qua một project mới riêng biệt. Nếu chọn storage độc lập, cần ghi rõ ranh giới quyền sở hữu và xóa dữ liệu thay vì giả định database thuộc nhà cung cấp auth.

## Bằng chứng chính thức theo nhà cung cấp

| Nhà cung cấp | Gói hiện công bố và email | Token và độ phù hợp nền tảng | Đánh giá |
|---|---|---|---|
| **Clerk** | Hobby có giá $0 và gồm 50.000 MRU mỗi app. Người dùng được tính khi quay lại sau ít nhất 24 giờ, nên không thể so trực tiếp với MAU. Có password, email code và email link. Email production dùng domain riêng của app và cần cấu hình SPF/DKIM. Email development có giới hạn; lỗi trả về metadata về giới hạn workspace, cần xác nhận chính xác trong dashboard. | `verifyToken()` của Backend SDK Clerk xác minh JWT và hỗ trợ kiểm tra audience, authorized parties. Session token có subject, issuer; có thể dùng JWKS hoặc public key tĩnh. Tài liệu hướng dẫn không xác nhận SDK chính thức cho Python/FastAPI. | Ứng viên hàng đầu hiện tại cho dịch vụ auth độc lập. Cần kiểm tra email production/domain, giá theo MRU thực tế và thư viện Python. |
| **Auth0** | Trang giá hiện liệt kê tối đa 25.000 MAU ở mức $0. Email provider tích hợp chỉ dùng cho kiểm thử cơ bản, giới hạn 10 email/phút và thư vượt mức có thể bị bỏ. Gửi email production cần bên thứ ba và thường phát sinh tài khoản/chi phí riêng. | Access token cho custom API là JWT với audience của API; issuer phụ thuộc domain Auth0 dùng để yêu cầu token. API xác minh chữ ký bằng JWKS của Auth0. Tách rời database và hosting. | Ứng viên so sánh tốt nếu nhóm cần OAuth/API configuration và OIDC tiêu chuẩn; phải rà soát email provider và điều kiện gói trả phí. |
| **Supabase Auth, chỉ project mới** | Pricing hiện liệt kê Free ở mức 50.000 MAU; project Free pause sau một tuần không hoạt động và tối đa 2 project hoạt động. SMTP mặc định chỉ gửi cho địa chỉ team đã cấp quyền, hiện ở mức 2 email/giờ. Sau khi cấu hình SMTP riêng, giới hạn khởi đầu là 30 email/giờ cho tới khi tăng. Pro hiện từ $25/tháng và không pause do thiếu hoạt động. | JWT có issuer `https://<project>.supabase.co/auth/v1`, `aud=authenticated`, `sub`; asymmetric signing keys công bố JWKS theo project. Tài liệu khuyến nghị asymmetric keys và cảnh báo không xác minh HS256 bằng shared secret. | Chỉ nên chọn nếu có quyết định rõ ràng về ranh giới Supabase Auth/Postgres. Giá trị tích hợp phụ thuộc lựa chọn database của họ; P01 đã gỡ schema Supabase cũ và cấm tự ý tái dùng. |

Nguồn trang chính thức được kiểm tra ngày 2026-10-16: [Clerk pricing](https://clerk.com/pricing), [Clerk token verification](https://clerk.com/docs/reference/backend/verify-token), [Clerk manual JWT verification](https://clerk.com/docs/guides/sessions/manual-jwt-verification), [Clerk email deliverability](https://clerk.com/docs/guides/development/troubleshooting/email-deliverability), [Clerk email limits errors](https://clerk.com/docs/guides/development/errors/backend-api), [Auth0 pricing](https://auth0.com/pricing), [Auth0 email provider guidance](https://support.auth0.com/center/s/article/Emails-to-Gmail-from-Auth0-never-arrive), [Auth0 access tokens](https://auth0.com/docs/secure/tokens/access-tokens/get-access-tokens), [Auth0 signing keys](https://auth0.com/docs/get-started/tenant-settings/signing-keys/customer-signing-keys), [Supabase pricing](https://supabase.com/pricing), [Supabase SMTP](https://supabase.com/docs/guides/auth/auth-smtp), [Supabase production checklist](https://supabase.com/docs/guides/deployment/going-into-prod), [Supabase JWTs](https://supabase.com/docs/guides/auth/jwts), và [Supabase signing keys](https://supabase.com/docs/guides/auth/signing-keys).

## Triển khai và phân quyền

- Giữ topology mục tiêu hiện tại: static React/Vite trên Vercel, FastAPI phía sau Go Gateway, managed auth riêng. Vercel không giữ trạng thái auth. Cấu hình chính xác origin production và preview được duyệt trong provider. Nghiên cứu này không đổi domain, DNS, deployment hoặc provider project.
- API hiện dùng same-origin, không dùng cross-origin cookie/CORS. Ưu tiên bearer access token qua `Authorization` bằng SDK chính thức. Cấu hình issuer, audience API, danh sách thuật toán và JWKS URI cố định ở phía server. Không tìm issuer/JWKS từ request và không đặt provider secret trong biến Vite.
- FastAPI vẫn là nơi quyết định authorization dù Gateway có lọc request. Ánh xạ `(issuer, subject)` đã xác minh sang UUID tài khoản nội bộ. Không nhận account/owner ID hoặc `email_verified` trong request body làm bằng chứng identity. Chỉ dùng trạng thái email xác minh từ claim đã xác thực nếu provider định nghĩa rõ semantics; trạng thái đó không thay thế kiểm tra ownership.
- Route market/news công khai có thể tiếp tục public nếu policy sản phẩm cho phép. Mọi route portfolio, import, experiment, artifact, download và export thuộc tài khoản phải lấy ownership từ identity đã xác minh ở server. Signed download URL phải ngắn hạn và giới hạn theo tài khoản.
- Với hosting tĩnh, chỉ khai báo origin production và từng preview origin được duyệt trong provider và deployment secrets. Không dùng wildcard origin cho credentials. Kiểm tra claim authorized-party/allowed-party ở API bằng allowlist riêng, tách với CORS.
- Nếu chọn Supabase Storage về sau, dùng user JWT/RLS hoặc server-only service credential; không gửi service role key cho client. P01 hiện không có Supabase runtime và schema đã gỡ không phải bằng chứng đã chọn project.

## Công việc triển khai sau khi ADR được duyệt

1. Thêm cấu hình auth tường minh gồm issuer, audience API, JWKS URL, thuật toán cho phép và origin trình duyệt. Production thiếu cấu hình phải fail startup; local chỉ chạy trong chế độ development/fixture được khai báo rõ.
2. Viết FastAPI dependency đọc bearer token, xác minh chữ ký bằng thư viện JOSE được duy trì và JWKS đã cache, kiểm tra issuer, audience, expiration/not-before, thuật toán; trả về claims bất biến gồm `iss`, `sub`, và các claim email tùy chọn. Từ chối `none`, `kid` lạ, claims sai dạng và key type không hỗ trợ. Định nghĩa cache/refresh key cùng clock skew.
3. Thêm ánh xạ account nội bộ theo `(issuer, subject)` với UUID ổn định. Tạo khi đăng nhập lần đầu hoặc webhook provider theo transaction, có uniqueness và xử lý race. Không dùng owner field do client gửi.
4. Thêm dependency `current_account`. Mỗi truy vấn và mutation private phải lọc ownership ở database; áp dụng policy theo tài khoản cho object storage. Phân loại rõ tài nguyên dùng chung.
5. Tích hợp client theo SDK hỗ trợ Vite/React hoặc luồng framework-neutral được tài liệu provider hướng dẫn. Không giữ token trong localStorage trừ khi threat model của SDK đã chọn yêu cầu; đồng bộ refresh/logout với hủy request và cache client theo tài khoản như `auth-and-http.md`.
6. Cập nhật OpenAPI security scheme và yêu cầu cho route, env example chỉ gồm tên biến, tài liệu security/privacy/deletion, hướng dẫn local, lockfile CI và deployment config. Không thêm giá trị provider thật.
7. Kiểm tra email trong sandbox project đã provision riêng với địa chỉ nhận được kiểm soát. Ghi nhận limit thực, retry, branding/template, yêu cầu domain/DNS và tier production trước khi mở đăng ký công khai.

## Contract test cần có khi triển khai

- Thiếu bearer token, token sai dạng, sai chữ ký, issuer sai, audience API sai, `exp` hết hạn, `nbf` ở tương lai, thuật toán bị cấm, `kid` lạ, thiếu `sub` hoặc refresh cache/key rotation không hợp lệ đều fail closed thành `401`.
- Token đúng ánh xạ về tài khoản nội bộ ổn định; nhiều request đăng nhập đầu tiên không tạo account trùng. Cùng subject từ issuer khác nhau vẫn là hai identity riêng.
- User A không thể đọc, cập nhật, xóa, export, upload hoặc download portfolio/import/experiment/artifact của user B khi đoán ID hoặc gửi `owner_id`, `account_id`, `sub`, hay `email_verified` giả. Trả `404`/`403` theo policy đã ghi.
- Route public/shared theo policy tường minh; private route không thể public do quên dependency. Route nội bộ không được bypass auth qua URL backend/gateway trực tiếp.
- Đổi account và logout trên browser phải hủy import/result/upload đang chạy, xóa cache theo account và không gắn draft/result của A sang B. Token hết hạn không được upload/download.
- Lỗi token/JWKS/provider trả error an toàn có request ID; response/log không có token, dump claims, key material, SMTP credential hoặc dữ liệu của tài khoản khác.
- Luồng signup, verify email, login, refresh, reset password, logout/revocation, xóa/retention được chạy qua sandbox provider; không dùng dữ liệu portfolio cá nhân thật.

Đây là kịch bản đề xuất. Spike cục bộ đã kiểm tra chữ ký JWT, issuer, audience, expiration, not-before, thuật toán, `kid`, key rotation, ánh xạ issuer/subject và quyền sở hữu tổng quát; chưa chạy auth của provider hay test email.

## Gate còn mở cho coordinator

- Duyệt provider và chiến lược issuer/audience sau spike Vite + FastAPI; tài liệu này chưa phải quyết định cuối.
- Chọn login email/password, email OTP/link hay social. Với launch, kiểm tra code so với link trên mailbox mục tiêu và lập rate limit/CAPTCHA chống abuse.
- Xác nhận region/điều khoản xử lý dữ liệu, DPA, subprocessors, xóa/retention, support/SLA và yêu cầu khôi phục tài khoản.
- Xác nhận domain gửi email production, DNS ownership, throughput mỗi giờ, template/branding, suppression và chi phí. SMTP mặc định Supabase không phù hợp user production phổ thông; sender tích hợp Auth0 chỉ dành cho test; Clerk production cần cấu hình domain.
- Xác nhận hosting API/Gateway và app tĩnh, cách cấp secrets, cô lập preview, HTTPS, khả năng truy cập issuer/JWKS cố định, CORS/CSP và rollback deployment. `docs/12-operations/hosting-scheduling.md` hiện mới là trạng thái mục tiêu.
- Ước tính signup/user hoạt động và tổng phí auth/email; so Clerk MRU với MAU của Auth0/Supabase trên cùng dự báo. Trang giá có thể thay đổi; xác nhận dashboard/checkout trước khi mua.
- Chỉ tạo project provider mới, riêng biệt sau khi coordinator duyệt ứng viên ADR. Không đọc hoặc tái dùng env bị ignore, credential, hay remote project cũ.

## Spike cục bộ

- Mã độc lập, không gọi mạng và không cần provider credential nằm ở [experiments/auth-feasibility](../../experiments/auth-feasibility/README.md). PyJWT 2.15.1 được ghim; test dùng RSA key tạo tạm trong RAM.
- Đã chạy 21 test contract: chữ ký, token sai dạng, claim bắt buộc bị thiếu, issuer, audience, expiration, not-before, iat ở tương lai, algorithm, kid, key rotation (khóa cũ bị từ chối sau thay khóa), ánh xạ issuer/subject và đường đi từ token đã xác minh tới chặn truy cập chéo tài khoản. Kết quả: 21 passed trên Python 3.11.15, PyJWT 2.15.1 và pytest 9.0.2.
- [Tài liệu PyJWT](https://pyjwt.readthedocs.io/en/stable/) yêu cầu cấu hình allowlist `algorithms` cố định; không suy ra từ header token. Đây là hành vi trong spike.
