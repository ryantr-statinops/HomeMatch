# Urgent Admin Rooms CRUD MVP

## Muc tieu

Uu tien mot vertical slice co the su dung duoc cho Sale va Admin de quan ly
du lieu phong ma khong cho browser ghi truc tiep vao Supabase.

Day la mot phan cua Phase 5 duoc keo len truoc Phase 2 vi nhu cau van hanh gap.
Public Web va room read path hien tai van duoc giu nguyen trong suot MVP.

## Pham vi da chot

- `SALE` duoc xem, tao va cap nhat phong.
- `ADMIN` co quyen cua Sale va duoc publish/archive phong.
- Khong hard delete phong trong MVP.
- Anh duoc upload len Google Drive qua Backend API.
- `ImageCache` tiep tuc mapping image path sang Google Drive URL.
- Dung Supabase Auth voi mot nhom tai khoan duoc tao san.
- Khong hardcode hoac commit plaintext password.
- FastAPI la authorization va business-data boundary.
- Admin UI tuan thu `docs/04-ui-ux/`.

## Ngoai pham vi

- Public self-registration.
- Forgot-password UI.
- User/role management UI.
- Roommate CRUD.
- Lead management.
- Public Web cutover sang FastAPI.
- Hard delete room hoac image goc tren Google Drive.
- Tach Auth, Rooms hoac Media thanh microservice doc lap.

## Kien truc

```text
Admin Portal
    |
    | Supabase Auth access token
    v
FastAPI
    |-- Auth/RBAC
    |-- Admin Rooms
    |-- Media
    `-- Audit
          |
          |-- Supabase PostgreSQL
          |     |-- phongtro
          |     |-- hinhanh
          |     |-- imagecache
          |     `-- admin_audit_log
          |
          `-- Google Drive
```

Admin Portal khong duoc nhan Supabase service-role key hoac Google Drive
credentials. Cac secret nay chi nam trong Backend API environment.

## Role matrix

| Operation | SALE | ADMIN |
|---|---:|---:|
| Xem danh sach va chi tiet phong | Yes | Yes |
| Tao draft room | Yes | Yes |
| Cap nhat room | Yes | Yes |
| Quan ly danh sach anh | Yes | Yes |
| Upload anh len Google Drive | Yes | Yes |
| Publish room | No | Yes |
| Archive room | No | Yes |
| Hard delete room | No | No |
| Quan ly user va role | No | No |

Backend bat buoc enforce matrix nay. Frontend chi an/hien action de cai thien UX,
khong phai security boundary.

## Trang thai room

Can audit schema truoc khi chot enum database. API nen chuan hoa toi thieu:

```text
DRAFT
ACTIVE
RENTED
ARCHIVED
```

- Room moi do Sale tao bat dau o `DRAFT`.
- Chi Admin duoc chuyen `DRAFT` sang `ACTIVE`.
- Archive la soft-delete va khong xoa du lieu lien quan.
- Public Web chi tiep tuc doc cac trang thai public theo behavior hien tai.

## API contracts du kien

Base path:

```text
/api/v1/admin
```

Endpoints:

| Method | Endpoint | Role | Muc dich |
|---|---|---|---|
| GET | `/rooms` | SALE, ADMIN | List/search/filter/paginate rooms |
| GET | `/rooms/{id}` | SALE, ADMIN | Room detail cho form edit |
| POST | `/rooms` | SALE, ADMIN | Tao draft room |
| PATCH | `/rooms/{id}` | SALE, ADMIN | Cap nhat field duoc phep |
| POST | `/rooms/{id}/publish` | ADMIN | Publish room |
| POST | `/rooms/{id}/archive` | ADMIN | Archive room |
| GET | `/rooms/{id}/images` | SALE, ADMIN | Danh sach anh |
| POST | `/rooms/{id}/images` | SALE, ADMIN | Upload anh len Drive |
| PATCH | `/rooms/{id}/images/{imageId}` | SALE, ADMIN | Sort/cap nhat metadata |
| DELETE | `/rooms/{id}/images/{imageId}` | ADMIN | Go mapping, khong mac dinh xoa original |

`DELETE /admin/rooms/{id}` khong duoc implement trong MVP.

## Response va validation

- Tiep tuc dung standard `data`, `meta` va `error` envelope.
- Pagination mac dinh `page=1`, `pageSize=12`, maximum `pageSize=50`.
- Reject unknown fields.
- Gia, dien tich va chi phi khong duoc am.
- Room chi duoc publish khi dat required-field checklist.
- Image mutation phai kiem tra image thuoc dung room.
- Update phai co concurrency guard dua tren `updated_at` hoac version.
- Validation error khong duoc tra stack trace hoac secret.

## Auth va account bootstrap

Dung Supabase Auth thay vi custom password database:

1. Owner tao mot tap tai khoan `ADMIN` va `SALE` bang Dashboard hoac bootstrap
   script chay mot lan.
2. Password chi duoc nhap qua kenh an toan va do Supabase hash/luu tru.
3. Admin Portal sign in bang email/password.
4. Frontend gui access token trong `Authorization: Bearer`.
5. FastAPI verify token server-side.
6. FastAPI doc role tu profile/role source do backend kiem soat.
7. Moi protected endpoint enforce role.

Khong commit account password vao repository, `.env.example`, fixture hoac docs.

## Google Drive media flow

```text
Admin selects files
    -> multipart upload to FastAPI
    -> validate MIME type, size and count
    -> upload original to configured Drive folder
    -> write hinhanh metadata
    -> write/update ImageCache mapping
    -> return resolved image record
```

Safety defaults:

- Chi nhan JPEG, PNG va WebP.
- Gioi han kich thuoc moi file va tong so file moi room.
- Server tao ten file; khong tin filename tu browser.
- Drive folder ID va service-account credential la server-only.
- Neu database write that bai sau Drive upload, ghi log cleanup/reconciliation.
- Xoa mapping khong dong nghia xoa original ngay lap tuc.

## Admin UI/UX

Tuan thu `docs/04-ui-ux/ui-spec.md` va
`docs/04-ui-ux/ux-animation-plan.md`:

- Royal Blue `#1E40AF` la primary color.
- White background va dark gray text.
- Mobile-first, responsive.
- Don gian, ro action va trang thai.
- CSS/`tw-animate-css` truoc; khong them Framer Motion neu khong can.
- Micro-interaction 150-200ms; component enter 300-500ms.
- Chi animate `transform` va `opacity` khi co the.
- Ton trong `prefers-reduced-motion`.

Routes:

```text
/login
/rooms
/rooms/new
/rooms/{id}
```

Desktop dung data table; mobile dung room cards. Form duoc chia thanh:

1. Thong tin co ban.
2. Dia chi.
3. Gia va chi phi.
4. Tien ich va noi quy.
5. Anh.
6. Trang thai va publish.

Save, upload, publish va archive phai co loading, success va error feedback.
Archive va publish can confirmation dialog.

## Audit trail

Moi mutation phai ghi:

- actor user ID;
- actor role;
- request ID;
- action;
- entity type va ID;
- before/after snapshot da loai secret;
- timestamp;
- result thanh cong/that bai khi phu hop.

Audit write nen cung transaction voi database mutation neu Supabase access layer
cho phep. Neu khong, failure phai duoc log va monitor.

## Implementation slices

### Slice 1 - Schema and safety audit

Status: Complete.

Artifact:

```text
task/microservice-foundation-plan/05-slice-1-schema-and-safety-audit.md
```

- Map `phongtro`, `hinhanh`, `imagecache`.
- Ghi required fields, status mapping va foreign keys.
- Xac dinh backward-compatible migrations.
- Tao backup/export procedure truoc write smoke test.

Exit:

- Co schema mapping duoc review.
- Khong co migration destructive.

### Slice 2 - Backend Supabase boundary

Status: Complete.

Verification:

- FastAPI Supabase client boundary tests pass (`4 passed` total API tests).
- Supabase CLI migration dry-run passed against HomeMatch Staging.
- Three versioned migrations applied to Staging and local/remote history match.
- Staging contains two fake rooms, two fake image records and two fake cache
  mappings.
- `admin_profile` and `admin_audit_log` exist and remain empty.
- Room lifecycle columns and four RLS policies were verified through metadata.
- Production was not linked, migrated or seeded.
- `ADMIN_MUTATIONS_ENABLED` remains `false`.

- Them server-only Supabase settings/client.
- Tach read/write repository.
- Them startup configuration validation.
- Them test bang mocked Supabase boundary.

Exit:

- Browser khong nhan server credential.
- API boot/test pass khi dung placeholder CI config.

### Slice 3 - Auth and RBAC

- Admin login bang Supabase Auth.
- FastAPI token verification.
- Profile/role lookup.
- Permission dependencies cho `SALE` va `ADMIN`.
- Unauthorized/forbidden tests.

Exit:

- Anonymous request bi `401`.
- SALE khong publish/archive duoc.
- ADMIN co the thuc hien protected actions.

### Slice 4 - Admin room reads

- List/search/filter/pagination.
- Room detail.
- Mapping giu duoc behavior va field hien tai.
- OpenAPI va generated client.

Exit:

- Admin xem duoc du lieu room that tren Preview an toan.

### Slice 5 - Create, update and archive

- Tao room o `DRAFT`.
- PATCH allowlist.
- Publish/archive transitions.
- Concurrency protection.
- Audit log.

Exit:

- CRUD khong hard delete.
- Mutation tests va role tests pass.
- Co rollback/restore procedure.

### Slice 6 - Google Drive upload

- Multipart validation.
- Drive upload adapter.
- `hinhanh` va `ImageCache` persistence.
- Preview, sort va remove-mapping UI.
- Reconciliation logging.

Exit:

- Upload Preview thanh cong.
- Browser khong co Drive credential.
- Existing Public Web images khong bi anh huong.

### Slice 7 - Admin Rooms UI

- Login.
- Protected shell.
- Responsive list.
- Create/edit form.
- Image manager.
- Publish/archive controls.
- Loading/error/empty states.

Exit:

- Desktop va mobile smoke tests pass.
- UI tuan thu `docs/04-ui-ux/`.

### Slice 8 - Production rollout

- Local tests.
- Preview with non-production/staging data.
- Backup/export.
- Owner-only Production smoke test voi mot draft room.
- Mo quyen cho Sale sau khi audit duoc xac nhan.

Exit:

- Create, read, update, upload va archive pass.
- Khong thay doi Public Web behavior.
- Rollback duoc tai lieu hoa va test.

## Environment ownership

Admin Portal public configuration:

```text
NEXT_PUBLIC_API_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Backend API server-only configuration:

```text
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
GOOGLE_DRIVE_FOLDER_ID
GOOGLE_SERVICE_ACCOUNT_JSON
```

Service-role va Google credential khong duoc dat trong Admin/Public Web project.
Preview khong duoc dung Production service-role key.

## Quality gates

- Backend unit tests.
- Auth/RBAC negative tests.
- Room repository integration tests.
- Mutation and state-transition tests.
- Media validation tests.
- OpenAPI artifact diff check.
- Generated TypeScript client typecheck.
- Admin lint, typecheck va production build.
- Public Web production build.
- Mobile/desktop Preview smoke test.
- Production owner-only CRUD smoke test.

## Git workflow

Implementation branch du kien:

```text
codex/urgent-admin-rooms-crud
```

Moi slice duoc commit va push rieng. Database migrations, API contracts, generated
client, Admin UI va docs khong duoc squash vao mot commit lon.

## Dieu kien bat dau implementation

- Plan va decision log duoc merge vao `main`.
- Co Supabase environment rieng cho Preview hoac mot read/write sandbox an toan.
- Account bootstrap va role source duoc chot.
- Google Drive test folder duoc tao.
- Backup/export procedure cho cac bang room duoc xac nhan.
