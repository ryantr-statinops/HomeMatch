# Decision Log

## Da chot

| ID | Quyet dinh | Trang thai |
|---|---|---|
| D-001 | Giai doan dau dung modular monolith | Accepted |
| D-002 | Public Web va Admin Portal la hai UI boundaries | Accepted |
| D-003 | Supabase PostgreSQL la source of truth | Accepted |
| D-004 | Google Drive tiep tuc luu original images | Accepted |
| D-005 | `ImageCache` tiep tuc mapping image path sang Drive URL | Accepted |
| D-006 | Backend la client-facing business data boundary | Accepted |
| D-007 | Production tiep tuc deploy tu `main` | Accepted |
| D-008 | Implementation thuc hien tren branch rieng | Accepted |
| D-009 | Public Web tam thoi giu tai repository root | Accepted |

## Da chot trong implementation kickoff

### D-010 - Backend runtime

Accepted:

- Dung Python 3 + FastAPI + Pydantic trong `services/api`.
- Deploy FastAPI thanh Vercel project rieng.
- Dung pytest cho backend tests.
- Dung OpenAPI do FastAPI sinh ra lam API contract source.
- Generate TypeScript API client cho Public Web va Admin.

Status: Accepted.

### D-011 - Workspace tooling

De xuat:

- Tiep tuc dung `npm` trong foundation commit dau.
- Chuyen sang npm workspaces de tranh thay package manager va architecture cung
  mot luc.
- Chi can Turborepo khi workspace scripts va build graph bat dau phuc tap.

Ly do: repository hien tai dang dung `package-lock.json`; doi ngay sang pnpm se
tao lockfile churn va tang rui ro cho Vercel build.

Status: Accepted.

### D-012 - Vercel deployment model

De xuat:

- Ba Vercel projects cung mot Git repository.
- Public Web tiep tuc lay root repository trong migration.
- API lay `services/api`.
- Admin lay `apps/admin`.
- Chi `main` la Production Branch.
- Feature branches chi tao Preview Deployments.

Status: Accepted.

### D-013 - Staging data

De xuat:

- Dung Supabase project rieng cho staging neu co the.
- Khong cho Preview API dung service role cua production.
- Neu chua co staging project, foundation chi implement health/contracts va mock
  data; chua chay write integration tests.

Status: Accepted.

### D-014 - Role matrix

De xuat:

| Operation | SALE | ADMIN |
|---|---:|---:|
| Xem room, roommate va lead | Yes | Yes |
| Cap nhat thong tin van hanh | Yes | Yes |
| Nhan va cap nhat lead duoc giao | Yes | Yes |
| Tao room/roommate post | Yes | Yes |
| Xoa hoac archive du lieu | No | Yes |
| Quan ly user va role | No | Yes |
| Thay doi system settings | No | Yes |

Status: Accepted.

### D-015 - API defaults

De xuat:

- Base path: `/api/v1`.
- Pagination: `page=1`, `pageSize=12`, maximum `pageSize=50`.
- Room default sort: active/available first, newest update first.
- Error codes toi thieu:
  - `VALIDATION_ERROR`
  - `UNAUTHENTICATED`
  - `FORBIDDEN`
  - `NOT_FOUND`
  - `CONFLICT`
  - `RATE_LIMITED`
  - `INTERNAL_ERROR`

Status: Pending confirmation.

## Quy tac cap nhat

Sau khi owner xac nhan:

1. Doi status cua decision thanh `Accepted`.
2. Ghi ro neu co dieu chinh so voi de xuat.
3. Chi bat dau phase phu thuoc sau khi decision lien quan da duoc accepted.
