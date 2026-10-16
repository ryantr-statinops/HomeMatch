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
| Public web legacy | [home-match](https://vercel.com/ryantr-statinops-projects/home-match) | Chờ Settings > Domains; không suy ra từ tên project | Owner đã cho phép disconnect; chờ hoàn tất 2FA |
| Admin legacy | [home-match-admin](https://vercel.com/ryantr-statinops-projects/home-match-admin) | Chờ Settings > Domains | Owner đã cho phép disconnect; chưa đổi settings |
| API legacy | [homematchvn-api](https://vercel.com/ryantr-statinops-projects/homematchvn-api) | Chờ Settings > Domains | Owner đã cho phép disconnect; chưa đổi settings |

Production branch, project ID, root/framework/build/output settings, domain redirects và deployment hooks cần ghi sau khi vào được Settings; không dùng giá trị suy đoán. Không ghi environment values, credential hoặc URLs chứa token.

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
| 2026-10-16 | home-match | Mở Settings > Domains để ghi baseline | Vercel yêu cầu đăng nhập và authenticator 2FA; chưa thay settings |

Sau disconnect, ghi thời điểm UTC, repository/production branch trước đổi, UI xác nhận disconnected, snapshot metadata/domain và người thực hiện. Kiểm tra deploy hooks/cron/CLI integrations riêng: disconnect Git không chứng minh mọi cách deploy hoặc workload đã dừng. Giữ deployment/domain hiện tại; không đồng nghĩa website đã offline hoặc hết chi phí.

Rollback: chọn đúng project → Settings > Git → reconnect repository/production branch đã ghi sau khi build/hosting mới sẵn sàng; kiểm tra preview trước khi cho production auto-deploy. Không reconnect cả ba theo mặc định nếu chỉ web mới còn được dùng. Quy trình rộng hơn: [retirement runbook](legacy-retirement-runbook.md).
