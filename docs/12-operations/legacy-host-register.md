# Legacy Vercel host register

Ngày kiểm tra: 2026-10-16 (Asia/Saigon). Owner yêu cầu giữ đầy đủ thông tin host để tracking và tạm ngắt Git auto-deploy trước merge P01. Không xóa project, domain, deployment hoặc secret.

## Team và repository
- Team hiển thị: `ryantr-statinops' projects`, slug `ryantr-statinops-projects`, plan hiển thị Hobby.
- Repository: `ryantr-statinops/HomeMatch`.
- PR P01: [#18](https://github.com/ryantr-statinops/HomeMatch/pull/18), branch `codex/p01-repository-reset`, head `fbad1a498c641ad9eed37a0db9c8436ad69a383f`.
- GitHub CI web, FastAPI/OpenAPI và Go: success. Ba Vercel Preview: Error; chưa kiểm tra build logs, không kết luận nguyên nhân.

## Project registry
| Vai trò | Project / Dashboard | Production domains/aliases | Git auto-deploy |
|---|---|---|---|
| Public web legacy | [home-match](https://vercel.com/ryantr-statinops-projects/home-match) · `prj_uM5yfVeAONdaan79W1Qru6j0Xchb` | `homematch.id.vn`, `www.homematch.id.vn`, `homematch-vn.vercel.app`; deployment hiện tại `home-match-gxwjf5lmb-ryantr-statinops-projects.vercel.app` | **Đã ngắt**, xác nhận UI thành công 2026-10-16 |
| Admin legacy | [home-match-admin](https://vercel.com/ryantr-statinops-projects/home-match-admin) · `prj_IWAfBU43pm3e0IL0GYbLOnIQwqa8` | `homematchvn-admin.vercel.app`; deployment hiện tại `home-match-admin-7d6hygkqy-ryantr-statinops-projects.vercel.app` | **Đã ngắt**, xác nhận UI thành công 2026-10-16 |
| API legacy | [homematchvn-api](https://vercel.com/ryantr-statinops-projects/homematchvn-api) · `prj_bYal2MmaehyFUcANcp4H3UoXWTI0` | `homematchvn-api.vercel.app`; deployment hiện tại `homematchvn-er18uvu73-ryantr-statinops-projects.vercel.app` | **Đã ngắt**, xác nhận UI thành công 2026-10-16 |

Baseline Vercel đã kiểm chứng cho cả ba: repository `ryantr-statinops/HomeMatch`, production branch `main`, framework Next.js, Node.js `24.x`; build/install/output/dev dùng mặc định (không override), Ignored Build Step Automatic, Include files outside root directory bật, Skip deployments when there are no changes bật. Root Directory lần lượt `./`, `apps/admin`, `./`. Không phát hiện deploy hooks ở ba Git settings. Không ghi environment values, credential hoặc URLs chứa token. Redirect/DNS/traffic chưa được kiểm chứng.

## Hosts từng được ghi trong tài liệu lịch sử
Git baseline `cac773f` có các địa chỉ sau. Đây là **historical candidates**, chưa xác nhận assignment/ownership/DNS/traffic hiện tại trong Vercel; không mặc định gán chúng cho project cùng tên gần giống.

| Host | Vai trò ghi trong lịch sử | Bằng chứng |
|---|---|---|
| `homematchvn.vercel.app` | Public web | [Legacy overview](../../task/archive/legacy-mvp-plan/00-overview.md), [session 016](../../task/current-session/session-016.md) |
| `homematch.id.vn` | Custom domain public | [Legacy overview](../../task/archive/legacy-mvp-plan/00-overview.md) |
| `homematchvn-admin.vercel.app` | Admin | [Legacy microservice plan](../../task/archive/legacy-microservice-plan/README.md) |
| `homematchvn-api.vercel.app` | Backend API | [Legacy microservice plan](../../task/archive/legacy-microservice-plan/README.md) |

`homematch.vercel.app` trong session cũ được ghi dưới dạng ví dụ cấu hình/test, vì vậy chưa coi là resource của dự án. Sau đăng nhập, đối chiếu Settings > Domains và redirects cho cả ba project; giữ nguyên những host không còn gắn project với trạng thái `historical-unverified`, không xóa khỏi log tracking.

## Preview hosts đã quan sát
Các host dưới xuất hiện trong Vercel Deployment Overview của đúng commit PR18. Đây là Preview thất bại, không được gọi production hoặc endpoint đang phục vụ tốt.

| Project | Deployment ID / dashboard | Branch alias | Immutable deployment host |
|---|---|---|---|
| home-match | [dpl_4s5ueA7K5Mra9otHSov6sG6ntQZm](https://vercel.com/ryantr-statinops-projects/home-match/4s5ueA7K5Mra9otHSov6sG6ntQZm) | `home-match-git-codex-p01-repos-379979-ryantr-statinops-projects.vercel.app` | `home-match-ji1v0rz0y-ryantr-statinops-projects.vercel.app` |
| home-match-admin | [dpl_CE3B8NVxbLp6Hm5JFLuTbBoZSk5S](https://vercel.com/ryantr-statinops-projects/home-match-admin/CE3B8NVxbLp6Hm5JFLuTbBoZSk5S) | `home-match-admin-git-codex-p01-f248be-ryantr-statinops-projects.vercel.app` | `home-match-admin-mqglxqk2e-ryantr-statinops-projects.vercel.app` |
| homematchvn-api | [dpl_2je9C5xRaGBj9BXr3dJBji3ywjfS](https://vercel.com/ryantr-statinops-projects/homematchvn-api/2je9C5xRaGBj9BXr3dJBji3ywjfS) | `homematchvn-api-git-codex-p01-4ae7e8-ryantr-statinops-projects.vercel.app` | `homematchvn-d9zpvd8rq-ryantr-statinops-projects.vercel.app` |

## Change log và xác nhận
| Thời điểm | Project | Hành động | Evidence / kết quả |
|---|---|---|---|
| 2026-10-16 | Cả ba | Owner cho phép tạm ngắt auto-deploy, giữ host để tracking | Chỉ thị trực tiếp trong chat |
| 2026-10-16 | home-match | Đã ghi domains, Project ID, baseline build/Git và ngắt Git | Settings > Domains/General/Build and Deployment/Git; UI báo project không còn kết nối repository |
| 2026-10-16 | home-match-admin | Đã ghi domain, Project ID, baseline build/Git và ngắt Git | Settings > Domains/General/Build and Deployment/Git; UI báo project không còn kết nối repository |
| 2026-10-16 | homematchvn-api | Đã ghi domain, Project ID, production deployment, Git baseline và ngắt Git | Settings > Domains/General/Git; UI toast `Disconnected Git Repository successfully` |

Disconnect được xác minh trong giao diện Vercel ngày 2026-10-16 (giờ địa phương Asia/Saigon); repository và production branch trước đổi là `ryantr-statinops/HomeMatch`/`main`. Không lưu screenshot có dữ liệu account trong Git. Kiểm tra deploy hooks/cron/CLI integrations riêng: disconnect Git không chứng minh mọi cách deploy hoặc workload đã dừng. Giữ deployment/domain hiện tại; không đồng nghĩa website đã offline hoặc hết chi phí.

Rollback: chọn đúng project → Settings > Git → reconnect repository/production branch đã ghi sau khi build/hosting mới sẵn sàng; kiểm tra preview trước khi cho production auto-deploy. Không reconnect cả ba theo mặc định nếu chỉ web mới còn được dùng. Quy trình rộng hơn: [retirement runbook](legacy-retirement-runbook.md).
