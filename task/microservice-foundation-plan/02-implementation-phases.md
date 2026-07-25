# Implementation Phases

## Phase 0 - Decision Gate and Baseline

### Cong viec

- Chot Python FastAPI backend runtime va npm workspace boundaries.
- Chot Vercel deployment model.
- Chot role matrix cua `ADMIN` va `SALE`.
- Chot staging data strategy.
- Chot API pagination, sorting va error taxonomy.
- Ghi lai environment variable ownership.
- Chay production build baseline.

### Trang thai

- [x] Tao implementation branch rieng.
- [x] Production build baseline pass.
- [x] Giu Public Web tai repository root.
- [x] Hoan thanh cac decision dang cho xac nhan.
- [ ] Xac nhan Vercel Preview Deployment.

### Exit criteria

- Tat ca decision trong `03-decision-log.md` co trang thai `Accepted`.
- Build hien tai pass.
- Khong co thay doi production configuration.

## Phase 1 - Foundation

### Trang thai

- [x] npm workspaces giu Public Web tai repository root.
- [x] FastAPI service va health endpoint hoat dong doc lap.
- [x] Standard data/error response models va environment-driven CORS.
- [x] OpenAPI artifact va generated TypeScript client.
- [x] `apps/admin` skeleton tich hop typed health contract.
- [x] Local lint, typecheck, API tests, Public Web build va Admin build pass.
- [x] Quality Gates build ca Public Web, Admin Portal, API va contracts.
- [x] Vercel Preview cua Admin Portal duoc tao va smoke test.
- [x] Vercel Preview cua API duoc xac nhan voi response envelope moi.

### Cong viec

- Cau hinh workspace ma khong lam hong root application.
- Tao `services/api` voi FastAPI va Pydantic.
- Tao `packages/api-spec`.
- Tao `packages/api-client`.
- Them `GET /api/v1/health`.
- Them standard response va error models.
- Sinh OpenAPI va TypeScript API client.
- Them CI commands cho build, typecheck va tests.
- Chuan bi `apps/admin` skeleton sau khi API foundation pass.

### Exit criteria

- Public Web root build pass.
- API build pass doc lap.
- Health endpoint chay tren Vercel Preview.
- OpenAPI duoc sinh tu FastAPI.
- Generated TypeScript client build thanh cong.
- Khong thay doi public production behavior.

Phase 1 da hoan tat sau khi repository implementation, Production smoke test va
hai Preview Deployment deu duoc xac nhan.

## Phase 2 - Room Read API

### Cong viec

- Trich xuat room query rules tu `src/services/room.service.ts`.
- Tao Rooms module trong API.
- Implement `GET /api/v1/rooms`.
- Implement `GET /api/v1/rooms/:id`.
- Chuan hoa filter, pagination, sorting va response shape.
- Them parity tests giua output cu va moi.
- Chuyen Public Web sang API sau khi preview duoc verify.

### Exit criteria

- Room listing va detail giu nguyen behavior.
- Image gallery van resolve dung.
- Public Web khong query bang room truc tiep.
- Co rollback path trong migration window.

## Phase 3 - Roommate Read API

### Cong viec

- Tao Roommates module.
- Implement listing va detail endpoints.
- Bao toan expiration va public status rules.
- Chi kich hoat giao dien khi co data that duoc Sale xac nhan.

### Exit criteria

- API contracts va tests pass.
- Khong lo private customer fields.
- Public behavior phu hop trang thai data thuc te.

## Phase 4 - Lead Write Path

### Cong viec

- Implement `POST /api/v1/leads`.
- Validate source type, source ID va public status.
- Them rate limiting va duplicate/spam protection.
- Them structured logging va failure monitoring.

### Exit criteria

- Lead hop le duoc ghi dung.
- Request khong hop le bi tu choi an toan.
- Sale/Admin co the truy vet lead.
- Loi tao lead duoc theo doi.

## Phase 5 - Authentication and Admin Portal

### Cong viec

- Cau hinh Supabase Auth cho Admin Portal.
- Verify token tai Backend API.
- Enforce role `ADMIN` va `SALE`.
- Build room management.
- Build roommate management.
- Build lead review va assignment.
- Ghi audit log cho mutations.

### Exit criteria

- Login va logout hoat dong.
- Backend tu quyet dinh authorization.
- Sale khong thuc hien duoc Admin-only operations.
- Tat ca mutations quan trong co audit record.

## Phase 6 - Media Hardening

### Cong viec

- Chuyen `ImageCache` lookup vao Media module.
- Giu Google Drive lam original media storage.
- Chuan hoa missing-cache fallback.
- Giu image download o server-side route.
- Them monitoring cho resolution failures.

### Exit criteria

- Browser khong can Google Drive credentials.
- Image listing, gallery va download van hoat dong.
- Missing mapping co fallback duoc tai lieu hoa.

## Phase 7 - Operations and Cutover

### Cong viec

- Them health monitoring, request ID va structured logs.
- Kiem tra backup, rollback va migration procedure.
- Chay staging smoke tests.
- Xac nhan Public Web khong con business query truc tiep Supabase.
- Chuyen root Public Web vao `apps/web` trong mot migration rieng.
- Doi Vercel Root Directory chi sau khi deployment moi duoc verify.

### Exit criteria

- Ba deployment units co the deploy doc lap.
- Production smoke tests pass.
- Rollback da duoc kiem tra.
- Public Web, Admin Portal va API co environment ownership ro rang.

## Phase 8 - Service Extraction Review

Sau mot giai doan van hanh, danh gia tung module dua tren:

- nhu cau scale doc lap;
- nhu cau deploy doc lap;
- reliability boundary;
- team ownership;
- asynchronous workload;
- bottleneck do duoc.

Neu chua co bang chung, tiep tuc giu modular monolith. Neu co, tach module phu
hop thanh service doc lap trong mot ke hoach rieng.
