# Microservice Foundation Implementation Plan

## Muc dich

Thu muc nay la ke hoach thuc thi de chuyen HomeMatch tu mot Next.js application
truy cap Supabase truc tiep sang kien truc modular monolith co backend boundary.

Tai lieu kien truc chinh thuc van nam tai:

- `docs/06-future-plan/microservice_migration/`

Thu muc nay chi quan ly:

- thu tu implementation;
- cac dieu kien bao ve production;
- cac quyet dinh can xac nhan;
- exit criteria cua tung phase;
- trang thai thuc thi.

## Trang thai hien tai

| Hang muc | Trang thai |
|---|---|
| Production branch | `main` |
| Production hosting | Vercel |
| Production public app | Next.js application tai repository root |
| Implementation branch | `codex/phase-1-admin-foundation` |
| Baseline production build | PASS |
| Business database | Supabase PostgreSQL |
| Authentication muc tieu | Supabase Auth |
| Image storage | Google Drive |
| Image mapping | `ImageCache` trong Supabase |
| Backend runtime | Python 3 + FastAPI + Pydantic |
| API contract | FastAPI OpenAPI + generated TypeScript client |
| Workspace | npm workspaces for JavaScript/TypeScript only |
| Migration state | Phase 1 - Repository implementation complete; Preview verification pending |

## Tai lieu trong thu muc

1. `01-production-safety.md`: cach bao ve website dang chay tren Vercel.
2. `02-implementation-phases.md`: thu tu implementation va exit criteria.
3. `03-decision-log.md`: cac quyet dinh da chot va dang cho xac nhan.

## Kien truc muc tieu

```text
Public Web (Vercel) ─┐
                     ├── Backend API (Vercel)
Admin Portal (Vercel)┘       ├── Auth/RBAC
                             ├── Rooms
                             ├── Roommates
                             ├── Leads
                             ├── Media
                             └── Audit
                                  │
                                  ├── Supabase PostgreSQL
                                  └── ImageCache -> Google Drive
```

Giai doan dau la modular monolith, chua phai full microservices. Mot module chi
duoc tach thanh service doc lap khi co nhu cau scale, deployment, reliability
hoac asynchronous workload duoc chung minh.

## Cau truc migration tam thoi

```text
MatchHome/
├── src/                    # Public Web production hien tai
├── public/
├── apps/
│   └── admin/              # Sale/Admin Portal moi
├── services/
│   └── api/                # Python FastAPI backend
├── packages/
│   ├── api-spec/           # Generated OpenAPI
│   └── api-client/         # Generated TypeScript client
├── docs/
└── task/
```

Public Web chi duoc chuyen vao `apps/web` sau khi:

- cac read path da goi Backend API;
- browser khong con truy cap Supabase business tables truc tiep;
- API da chay on dinh tren staging va production;
- rollback procedure da duoc kiem tra.

## Nguyen tac thuc thi

- Khong implementation truc tiep tren `main`.
- Khong thay doi production domain trong cac phase foundation.
- Khong xoa data path cu truoc khi data path moi duoc verify.
- Moi database migration phai backward-compatible.
- Moi phase phai pass build, typecheck, tests va smoke test.
- Chi merge vao `main` sau khi Vercel Preview da duoc kiem tra.
