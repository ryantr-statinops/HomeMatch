# Session 020

## Session ID

SESSION-020

---

## Date

2026-06-23

---

## Goal

Migrate từ Google Apps Script + Google Sheet sang Supabase (PostgreSQL). Xây dựng ImageCache để resolve path ảnh từ Google Drive.

---

## Context

Các tài liệu liên quan:

* docs/database_structure.md — Cập nhật lên V4 (Supabase)
* docs/tech-stack.md — Cập nhật lên V2 (Supabase)
* docs/api-contracts.md — Cập nhật lên V4 (Supabase SDK)
* docs/diagrams/erd-v1.md — Cập nhật lên V3 (thêm ImageCache)
* docs/diagrams/system-architecture.md — Cập nhật lên V2
* apps-script/* — Toàn bộ code cũ (sẽ xoá)

---

## Scope

1. Setup Supabase client trong Next.js
2. Tạo ImageCache table để mapping path ảnh → Google Drive URL
3. Viết script `scripts/build-image-cache.ts` resolve ảnh từ Drive
4. Rewrite services: `room.service.ts`, `roommate.service.ts`, `lead.service.ts`
5. Xoá code cũ: `api-client.ts`, proxy route, `env.apiUrl`
6. Cập nhật docs: database_structure, tech-stack, api-contracts, diagrams

---

## Out Of Scope

1. Migrate ảnh từ Google Drive sang Supabase Storage
2. Thay đổi cấu trúc database gốc (PHONGTRO, HINHANH, ROOMMATE, ...)
3. Thêm RLS policies cho các table khác (phongtro, hinhanh, roommate)
4. Deploy lên production

---

## Deliverables

### New Files

1. **src/lib/supabase/client.ts** — Supabase client singleton
2. **scripts/build-image-cache.ts** — Script 1 lần: đọc path ảnh từ Supabase, resolve qua Drive API, lưu vào ImageCache
3. **src/services/lead.service.ts** — Service tạo lead mới

### Rewritten Files

4. **src/services/room.service.ts** — Query Supabase + resolve image qua ImageCache
5. **src/services/roommate.service.ts** — Query Supabase (thay Apps Script)
6. **src/app/rooms/[id]/page.tsx** — Dùng `getRoomById()` từ service thay vì fetch Apps Script
7. **src/configs/env.ts** — Thêm supabaseUrl, supabaseAnonKey; xoá apiUrl

### Deleted Files

8. **src/lib/api-client.ts** — Không còn dùng
9. **src/app/api/proxy/route.ts** — Không còn dùng

### Updated Docs

10. **docs/database_structure.md** → V4: Supabase + ImageCache
11. **docs/tech-stack.md** → V2: Supabase, xoá Apps Script
12. **docs/api-contracts.md** → V4: Supabase SDK
13. **docs/diagrams/erd-v1.md** → V3: thêm ImageCache
14. **docs/diagrams/system-architecture.md** → V2: Supabase architecture

---

## Notes

### Image Resolution Strategy

- Database giữ nguyên path gốc (VD: `PHONGTRO_Images/abc.jpg`)
- Tạo bảng phụ `ImageCache(path, drive_url)` để mapping path → Drive URL
- Script `build-image-cache.ts` chạy 1 lần, dùng service account Google Drive API:
  - List tất cả file trong 2 Drive folders (`PHONGTRO_Images`, `HINHANH_Images`)
  - Đọc tất cả path từ Supabase (`phongtro.hinhanhchinh`, `hinhanh.hinhanh`)
  - Match filename → Drive file ID → tạo thumbnail URL
  - Insert vào `ImageCache` (upsert theo path)
- Kết quả: **352 paths resolved**, 0 miss

### Supabase Environment

```env
NEXT_PUBLIC_SUPABASE_URL=https://rccszqpjeikcjrfmbzpl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
SUPABASE_SERVICE_KEY=sb_secret_...    # Script only
```

### RLS Policy Required

```sql
ALTER TABLE imagecache ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_can_read_imagecache"
ON imagecache FOR SELECT TO anon USING (true);
```

### Service Account

- File: `scripts/homematch-service-account.json`
- Email: `homematch-image-migration@homematch-image-migration.iam.gserviceaccount.com`
- Scopes: Drive readonly
- Đã share 2 Drive folders với service account

### Key Technical Decisions

1. **Không dùng Apps Script** — toàn bộ API layer chuyển sang Supabase SDK
2. **Không migrate ảnh** — ảnh vẫn ở Google Drive, chỉ cache mapping path→URL
3. **Không thêm bảng mới vào schema chính** — ImageCache là bảng phụ trợ
4. **Column names lowercase** — PostgreSQL tự động lowercase, service dùng `hinhanhchinh` thay `HinhAnhChinh`

---

## Definition Of Done

* [x] Hoàn thành task
* [x] Không vi phạm project-rules
* [x] Không mở rộng scope
* [x] TypeScript compile sạch (0 errors)
* [x] Docs được cập nhật
