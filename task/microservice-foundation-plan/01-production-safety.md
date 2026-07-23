# Production Safety Plan

## Muc tieu

Website `homematch.id.vn` dang duoc Vercel deploy tu `main`. Migration phai
cho phep phat trien API va Admin Portal ma khong thay doi hanh vi cua production
cho den khi tung capability duoc kiem tra.

## Implementation status

Repository controls were implemented and verified on
`codex/microservice-foundation`:

- [x] Public Web remains at the repository root.
- [x] FastAPI runs independently from `services/api`.
- [x] Public Web production build passes.
- [x] FastAPI health test passes.
- [x] OpenAPI drift is checked.
- [x] Public Web and workspace TypeScript checks pass.
- [x] ESLint runs through the supported ESLint CLI.
- [x] Frontend environment boundaries are checked automatically.
- [x] Public and backend environment templates are separated.
- [x] GitHub Actions quality gates are defined for pull requests to `main`.
- [x] Generated Python environments and build artifacts are ignored.

The following owner-controlled Vercel and GitHub settings must be confirmed
before this plan can be marked fully enforced:

- [ ] Require the `Quality Gates` GitHub check before merging to `main`.
- [ ] Disable force pushes and branch deletion for `main`.
- [ ] Keep `main` as the Production Branch for Public Web and Backend API.
- [ ] Keep Public Web Root Directory at the repository root.
- [ ] Keep Backend API Root Directory at `services/api`.
- [ ] Use separate Preview and Production environment variable values.
- [ ] Confirm a previous Vercel production deployment can be promoted for
  rollback.

## Branch strategy

```text
main
  └── agent/finalize-microservice-docs
        └── codex/microservice-foundation
```

- `main`: production branch, khong code truc tiep.
- `codex/microservice-foundation`: implementation branch.
- Feature lon co the tach tiep thanh branch ngan neu can review rieng.
- Chi merge code da pass quality gates.

## Deployment strategy

### Trong giai doan foundation

- Vercel production project tiep tuc build Next.js app tai repository root.
- Khong doi Root Directory cua production project.
- Khong chuyen `src/` va `public/` vao `apps/web`.
- `services/api` va `apps/admin` duoc tao song song.
- Vercel Preview duoc dung de kiem tra branch implementation.

### Deployment units muc tieu

| Project | Root Directory | Vai tro |
|---|---|---|
| `matchhome-web` | repository root, sau nay `apps/web` | Public Web |
| `matchhome-api` | `services/api` | Python FastAPI Backend API |
| `matchhome-admin` | `apps/admin` | Sale/Admin Portal |

## Environment isolation

### Public Web

- Chi su dung public API URL va public configuration.
- Supabase service role key khong duoc ton tai trong project nay.

### Admin Portal

- Su dung Supabase URL va anon key cho login.
- Gui access token den Backend API.
- Khong dung service role key.

### Backend API

- Chay Python + FastAPI trong Vercel Python runtime.
- So huu Supabase service role key.
- So huu Google Drive credentials.
- Verify Supabase access token va role.
- Khong tra secret ve client.

### Dependency boundaries

- npm workspaces chi quan ly Public Web, Admin va TypeScript packages.
- Python dependencies duoc quan ly trong `services/api/pyproject.toml`.
- OpenAPI ket noi hai he sinh; frontend khong import Python source.

Preview, staging va production phai dung cac environment variable sets rieng.
Khong dung production service credentials trong local development neu khong can
thiet.

## Data migration safety

- Khong rename hoac drop cot dang duoc Public Web su dung.
- Them cot moi o trang thai nullable hoac co default phu hop.
- Deploy schema backward-compatible truoc.
- Deploy API moi sau schema.
- Chuyen client sang API sau khi API da verify.
- Chi xoa data path cu trong mot phase cleanup rieng.

## Feature migration pattern

Moi feature duoc chuyen theo thu tu:

```text
Implement API moi
    ↓
Contract va integration tests
    ↓
Deploy Preview/Staging
    ↓
So sanh output cu va moi
    ↓
Chuyen client co rollback path
    ↓
Theo doi production
    ↓
Loai bo path cu sau khi on dinh
```

Thu tu capability:

1. Health check.
2. Room listing.
3. Room detail.
4. Roommate listing/detail.
5. Lead creation.
6. Authentication va RBAC.
7. Admin operations.
8. Media hardening.

## Quality gates truoc merge

- `npm run build` hoac workspace build pass.
- TypeScript pass.
- Lint pass.
- Unit va integration tests lien quan pass.
- Vercel Preview build pass.
- Smoke test cac route public hien tai pass.
- Khong co secret trong Git diff.
- Database change co rollback hoac forward-fix procedure.

## Rollback

- Frontend deployment co the rollback ve deployment Vercel truoc.
- API endpoint cu khong bi xoa trong cung release chuyen client.
- Database schema moi phai chap nhan ca payload cu va moi trong migration window.
- Neu API moi loi, Public Web phai co kha nang quay lai data path da verify.
