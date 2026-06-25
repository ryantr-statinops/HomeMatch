# Hướng dẫn Setup & Cấu hình API

> **Dự án:** HomeMatch — Nền tảng tìm phòng trọ và tìm người ở ghép

---

## Mục lục

1. [Yêu cầu hệ thống](#1-yêu-cầu-hệ-thống)
2. [Cài đặt môi trường local](#2-cài-đặt-môi-trường-local)
3. [Cấu hình biến môi trường](#3-cấu-hình-biến-môi-trường)
4. [Kiến trúc dữ liệu](#4-kiến-trúc-dữ-liệu)
5. [Supabase Setup](#5-supabase-setup)
6. [Google Cloud Console & Drive API](#6-google-cloud-console--drive-api)
7. [Cấu trúc dự án](#7-cấu-trúc-dự-án)
8. [Quy trình phát triển](#8-quy-trình-phát-triển)
9. [Xử lý sự cố](#9-xử-lý-sự-cố)
10. [Phụ lục: Apps Script (Deprecated)](#10-phụ-lục-apps-script-deprecated)

---

## 1. Yêu cầu hệ thống

| Công cụ | Phiên bản | Ghi chú |
|---------|-----------|---------|
| Node.js | >= 20 | Kiểm tra: `node --version` |
| npm | >= 10 | Kiểm tra: `npm --version` |
| Git | >= 2.x | Kiểm tra: `git --version` |
| Google Cloud Account | — | Cần để tạo Service Account + Drive API |
| Supabase Account | — | Free tier, dùng làm database chính |

---

## 2. Cài đặt môi trường local

### Clone dự án

```bash
git clone https://github.com/ryantr-statinops/HomeMatch.git
cd HomeMatch
```

### Cài đặt dependencies

```bash
npm install
```

### Chạy dev server

```bash
npm run dev
```

Mở trình duyệt tại: [http://localhost:3000](http://localhost:3000)

### Build production

```bash
npm run build
npm run start
```

### Kiểm tra code

```bash
npm run lint
```

---

## 3. Cấu hình biến môi trường

Tạo file `.env.local` (đã có trong `.gitignore`, không commit lên Git):

```env
# === Supabase ===
# URL project + Anon key từ Supabase Dashboard → Settings → API
NEXT_PUBLIC_SUPABASE_URL=https://rccszqpjeikcjrfmbzpl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...

# === Zalo (tuỳ chọn) ===
# URL Zalo Official Account để người dùng liên hệ
NEXT_PUBLIC_ZALO_URL=

# === Vercel Analytics (tuỳ chọn) ===
# Tự động sau khi enable trên Vercel Dashboard

# === Site (tuỳ chọn) ===
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Các biến môi trường

| Biến | Bắt buộc | Mô tả |
|------|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ Có | URL Supabase project |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Có | Anon key từ Supabase Dashboard |
| `NEXT_PUBLIC_ZALO_URL` | ❌ Không | Link Zalo OA (để hiển thị nút Liên hệ) |
| `NEXT_PUBLIC_SITE_URL` | ❌ Không | URL production (dùng cho SEO) |

### File tham khảo

- `src/configs/env.ts` — Định nghĩa các biến môi trường
- `src/configs/site.ts` — Cấu hình chung của site

---

## 4. Kiến trúc dữ liệu

### Sơ đồ luồng dữ liệu

```text
AppSheet (Admin Operations)
    │
    ▼
Supabase (PostgreSQL) — Source of Truth
    │
    ├── Website (Next.js) — Supabase SDK trực tiếp
    │
    └── Google Drive — Image Storage (resolve path → URL qua ImageCache table)
```

### Các bảng Supabase

| Table | Mục đích |
|-------|----------|
| `phongtro` | Danh sách phòng trọ |
| `hinhanh` | Hình ảnh các phòng |
| `roommate` | Bài đăng ở ghép |
| `imagecache` | Cache mapping path ảnh → Google Drive URL |
| `lead` | Lead từ website |

Xem chi tiết tại: [docs/database_structure.md](database_structure.md)

## 5. Supabase Setup

### 5.1. Tạo Supabase project

1. Vào [supabase.com](https://supabase.com) → **New project**
2. Điền thông tin:
   - **Name:** `HomeMatch`
   - **Database Password:** (tạo mới)
   - **Region:** Singapor (asia-southeast-1) — gần Việt Nam nhất
3. Chờ vài phút cho project khởi tạo

### 5.2. Cấu hình RLS (Row Level Security)

Sau khi migrate dữ liệu, cần cho phép anonymous read:

```sql
-- Cho phép đọc phòng
CREATE POLICY "anon_read_phongtro" ON phongtro FOR SELECT TO anon USING (true);

-- Cho phép đọc hình ảnh
CREATE POLICY "anon_read_hinhanh" ON hinhanh FOR SELECT TO anon USING (true);

-- Cho phép đọc image cache
CREATE POLICY "anon_read_imagecache" ON imagecache FOR SELECT TO anon USING (true);

-- Cho phép đọc roommate posts
CREATE POLICY "anon_read_roommate" ON roommate FOR SELECT TO anon USING (true);

-- Cho phép insert lead
CREATE POLICY "anon_insert_lead" ON lead FOR INSERT TO anon WITH CHECK (true);
```

### 5.3. ImageCache & Google Drive API

Để resolve path ảnh từ AppSheet (VD: `PHONGTRO_Images/abc.jpg`) → Google Drive URL, hệ thống dùng:

1. **Google Cloud Console** — Tạo Service Account, enable Drive API
2. **Script `scripts/build-image-cache.ts`** — Dùng Service Account để tìm file trong Drive folder, lấy thumbnail URL, insert vào `imagecache` table
3. **Service layer** (`room.service.ts`) — Khi get rooms, tự động query `imagecache` để resolve ảnh

> **Lưu ý:** Cần share folder ảnh (PHONGTRO_Images, HINHANH_Images) với Service Account email.

---



## 6. Kiểm tra kết nối

### 6.1. Kiểm tra Supabase trực tiếp

Vào Supabase Dashboard → **SQL Editor** → chạy:

```sql
SELECT * FROM phongtro WHERE trangthai = 'Trống' LIMIT 5;
```

### 6.2. Kiểm tra local dev

```bash
npm run dev
```

Mở trình duyệt:
- `http://localhost:3000/` — Homepage
- `http://localhost:3000/rooms` — Danh sách phòng
- `http://localhost:3000/rooms/{id}` — Chi tiết phòng

### 6.3. Kiểm tra production

- https://homematchvn.vercel.app/rooms
- https://homematch.id.vn/rooms

---

## 7. Cấu trúc dự án

```
HomeMatch/
├── apps-script/          # Google Apps Script API
│   ├── Code.js           #   Entry point (doGet/doPost)
│   ├── appsscript.json   #   Manifest
│   ├── rooms.js          #   Room API
│   ├── roommates.js      #   Roommate API
│   ├── leads.js          #   Lead API
│   ├── sheets.js         #   Google Sheet connector
│   └── utils.js          #   Helpers
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── page.tsx      #   Homepage
│   │   ├── rooms/        #   Room pages
│   │   ├── roommates/    #   Roommate pages
│   │   └── api/proxy/    #   API proxy route
│   ├── components/       # React components
│   │   ├── layout/       #   Navbar, Footer, Container
│   │   ├── room/         #   Room components
│   │   ├── shared/       #   Shared components
│   │   └── ui/           #   shadcn/ui components
│   ├── configs/          # App configuration
│   ├── constants/        # Constants
│   ├── lib/              # Utilities
│   ├── services/         # API service wrappers
│   └── types/            # TypeScript types
├── docs/                 # Documentation
└── task/                 # Task management
```

---

## 8. Quy trình phát triển

### 8.1. Phát triển Frontend

1. Chạy `npm run dev`
2. Code tại `src/`
3. Frontend gọi Supabase trực tiếp qua service layer (`src/services/`)
4. Service dùng `supabase.from("phongtro").select(...)` từ `src/lib/supabase/client.ts`
5. Image path tự động resolve qua `imagecache` table

### 8.2. Thay đổi database

1. Migrate data từ Google Sheet → AppSheet → Supabase (đồng bộ)
2. Chạy script `scripts/build-image-cache.ts` nếu có ảnh mới
3. Cập nhật docs tại `docs/database_structure.md`

### 8.3. Deploy lên Vercel

Dự án đã deploy trên Vercel. Khi push code mới:

1. Commit & push lên GitHub
2. Vercel tự động rebuild (connected Git repo)
3. Kiểm tra tại: https://homematchvn.vercel.app hoặc https://homematch.id.vn

### 8.4. Commit convention

```
feat: thêm tính năng mới
fix: sửa lỗi
chore: dọn dẹp, cấu hình
docs: cập nhật tài liệu
refactor: tái cấu trúc code
```

---

## 9. Xử lý sự cố

### Không kết nối được Supabase

**Nguyên nhân:** Thiếu hoặc sai env vars.

**Fix:**
1. Kiểm tra `.env.local` có `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY` chưa
2. Vào Supabase Dashboard → **Settings → API** để copy đúng URL + anon key
3. Nếu deploy Vercel: kiểm tra Environment Variables trong Vercel Dashboard

### Ảnh không hiển thị

**Nguyên nhân:** Path ảnh chưa được cache trong `imagecache` table.

**Fix:**
1. Chạy lại script: `npx tsx scripts/build-image-cache.ts`
2. Kiểm tra Service Account có quyền đọc Drive folder không
3. Kiểm tra bảng `imagecache` trong Supabase có dữ liệu không

### Trang /rooms trống

**Nguyên nhân:**
- Supabase không có dữ liệu
- RLS chưa cho phép anon read

**Fix:**
1. Kiểm tra Supabase Dashboard → Table Editor → `phongtro` có dữ liệu không
2. Chạy SQL: `CREATE POLICY "anon_read_phongtro" ON phongtro FOR SELECT TO anon USING (true);`

### Không build được trên Vercel

**Nguyên nhân:** Thiếu env vars trên Vercel Dashboard.

**Fix:**
1. Vào Vercel → Project → **Settings → Environment Variables**
2. Thêm `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_SITE_URL`
3. **Redeploy**

---

> **Ghi chú:** Dự án đã chuyển từ Google Apps Script sang Supabase SDK. Code Apps Script trong thư mục `apps-script/` vẫn được giữ lại để tham khảo.

---

## 10. Phụ lục: Apps Script (Deprecated)

> Dự án đã migrate từ Google Apps Script + Google Sheet sang Supabase (PostgreSQL). Phần này để tham khảo.

### Cấu trúc Apps Script cũ

| File | Mô tả |
|------|-------|
| `Code.js` | Entry point (`doGet`, `doPost`) |
| `sheets.js` | Kết nối & đọc/ghi Google Sheet |
| `rooms.js` | API endpoints cho phòng trọ |
| `roommates.js` | API endpoints cho ở ghép |
| `leads.js` | API tạo lead |
| `utils.js` | Helper functions |
| `appsscript.json` | Manifest (timezone, runtime) |

### API Endpoints cũ

Xem chi tiết tại: [docs/api-contracts.md](api-contracts.md)

| Endpoint | Method | Mô tả |
|----------|--------|-------|
| `?action=getRooms` | GET | Danh sách phòng (có filter) |
| `?action=getRoomDetail&id={ID}` | GET | Chi tiết phòng + hình ảnh |
| `?action=getRoommatePosts` | GET | Danh sách ở ghép |
| `?action=getRoommatePostDetail&id={ID}` | GET | Chi tiết bài ở ghép |
| `?action=createLead` | POST | Ghi nhận lead |

### Kiến trúc cũ

```text
Browser (Client)
    │
    ▼
/api/proxy (Next.js server-side)
    │
    ▼
Google Apps Script Web App (deploy URL)
    │
    ▼
Google Sheet (DATABASE_HomeMatch)
```
