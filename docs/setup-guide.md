# Hướng dẫn Setup & Cấu hình API

> **Dự án:** Homematch — Nền tảng tìm phòng trọ và tìm người ở ghép

---

## Mục lục

1. [Yêu cầu hệ thống](#1-yêu-cầu-hệ-thống)
2. [Cài đặt môi trường local](#2-cài-đặt-môi-trường-local)
3. [Cấu hình biến môi trường](#3-cấu-hình-biến-môi-trường)
4. [Cấu hình Google Apps Script API](#4-cấu-hình-google-apps-script-api)
5. [Deploy Apps Script](#5-deploy-apps-script)
6. [Kiểm tra kết nối API](#6-kiểm-tra-kết-nối-api)
7. [Cấu trúc dự án](#7-cấu-trúc-dự-án)
8. [Quy trình phát triển](#8-quy-trình-phát-triển)
9. [Xử lý sự cố](#9-xử-lý-sự-cố)

---

## 1. Yêu cầu hệ thống

| Công cụ | Phiên bản | Ghi chú |
|---------|-----------|---------|
| Node.js | >= 20 | Kiểm tra: `node --version` |
| npm | >= 10 | Kiểm tra: `npm --version` |
| Git | >= 2.x | Kiểm tra: `git --version` |
| Clasp | >= 3.x | Dùng để deploy Apps Script |
| Google Account | — | Cần quyền truy cập Google Sheet & Apps Script |

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
# === Google Apps Script API ===
# URL deploy của Apps Script Web App
# Xem hướng dẫn ở phần 4 và 5
NEXT_PUBLIC_API_URL=https://script.google.com/macros/s/{DEPLOY_ID}/exec

# === Zalo (tuỳ chọn) ===
# URL Zalo Official Account để người dùng liên hệ
NEXT_PUBLIC_ZALO_URL=

# === Google Analytics (tuỳ chọn) ===
NEXT_PUBLIC_GA_ID=

# === Site (tuỳ chọn) ===
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Các biến môi trường

| Biến | Bắt buộc | Mô tả |
|------|----------|-------|
| `NEXT_PUBLIC_API_URL` | ✅ Có | URL deploy của Google Apps Script Web App |
| `NEXT_PUBLIC_ZALO_URL` | ❌ Không | Link Zalo OA (để hiển thị nút Liên hệ) |
| `NEXT_PUBLIC_GA_ID` | ❌ Không | Google Analytics Measurement ID |
| `NEXT_PUBLIC_SITE_URL` | ❌ Không | URL production (dùng cho SEO) |

### File tham khảo

- `src/configs/env.ts` — Định nghĩa các biến môi trường
- `src/configs/site.ts` — Cấu hình chung của site

---

## 4. Cấu hình Google Apps Script API

### 4.1. Yêu cầu

- Google Sheet **DATABASE_HomeMatch** (chứa dữ liệu phòng trọ, ở ghép,...)
- Google Apps Script project (đã deploy sẵn trong thư mục `apps-script/`)

### 4.2. Kiến trúc

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

**Tại sao cần proxy?** — Google Apps Script ContentService không hỗ trợ CORS, trình duyệt không thể gọi trực tiếp. Proxy server-side giải quyết vấn đề này.

### 4.3. Cấu trúc Apps Script

| File | Mô tả |
|------|-------|
| `Code.js` | Entry point (`doGet`, `doPost`) |
| `sheets.js` | Kết nối & đọc/ghi Google Sheet |
| `rooms.js` | API endpoints cho phòng trọ |
| `roommates.js` | API endpoints cho ở ghép |
| `leads.js` | API tạo lead |
| `utils.js` | Helper functions |
| `appsscript.json` | Manifest (timezone, runtime) |

### 4.4. API Endpoints

Xem chi tiết tại: [docs/api-contracts.md](api-contracts.md)

| Endpoint | Method | Mô tả |
|----------|--------|-------|
| `?action=getRooms` | GET | Danh sách phòng (có filter) |
| `?action=getRoomDetail&id={ID}` | GET | Chi tiết phòng + hình ảnh |
| `?action=getRoommatePosts` | GET | Danh sách ở ghép |
| `?action=getRoommatePostDetail&id={ID}` | GET | Chi tiết bài ở ghép |
| `?action=createLead` | POST | Ghi nhận lead |

---

## 5. Deploy Apps Script

### 5.1. Cài đặt Clasp

```bash
npm install -g @google/clasp
```

### 5.2. Đăng nhập

```bash
clasp login
```

Trình duyệt sẽ mở, đăng nhập Google Account có quyền truy cập Script.

### 5.3. Kiểm tra kết nối

```bash
cd apps-script
clasp list
```

Kết quả mong đợi:
```
Found 1 script.
Homematch API - https://script.google.com/d/{SCRIPT_ID}/edit
```

### 5.4. Push code

```bash
cd apps-script
clasp push -f        # -f để force push (kể cả khi không có thay đổi)
```

### 5.5. Tạo version & deploy

```bash
# Tạo version mới
clasp version "Mô tả ngắn về phiên bản"

# Deploy version
clasp deploy -V {VERSION_NUMBER} -d "Mô tả deployment"
```

### 5.6. Deploy từ Google Script Editor (khuyến nghị)

Sau khi push code bằng clasp, vào **Google Script Editor** để deploy Web App:

1. Mở script: [Homematch API](https://script.google.com/d/1-ohEkoebv5XqZE1O6pfehTqRpUOmw48zGvcLX1Q5RCDWzLm9Ub_pWe32/edit)
2. **Deploy → New deployment**
3. Chọn **Web app**
4. Cấu hình:
   - **Execute as**: `Me` (chính bạn)
   - **Who has access**: `Anyone`
5. Nhấn **Deploy**
6. Copy URL dạng: `https://script.google.com/macros/s/{DEPLOY_ID}/exec`

### 5.7. Cấu hình Script Properties

Sau khi deploy, cần set `SHEET_ID` để script biết Google Sheet nào cần đọc:

1. Trong Script Editor: **File → Project properties → Script properties**
2. Thêm key: `SHEET_ID` = `{ID_CUA_GOOGLE_SHEET}`

> **Mẹo:** Sheet ID là phần `{ID}` trong URL `https://docs.google.com/spreadsheets/d/{ID}/edit`

### 5.8. Cập nhật .env.local

Sao chép URL deploy từ bước 5.6 vào `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://script.google.com/macros/s/{DEPLOY_ID}/exec
```

---

## 6. Kiểm tra kết nối API

### 6.1. Kiểm tra trực tiếp

Mở URL deploy trong trình duyệt:

```
https://script.google.com/macros/s/{DEPLOY_ID}/exec?action=getRooms
```

Kết quả mong đợi — JSON array danh sách phòng:

```json
[
  {
    "id": 2026616144133,
    "image": "PHONGTRO_Images/...",
    "address": { "soNha": "214", "duong": "Đường số 9", ... },
    "price": 7000000,
    ...
  }
]
```

### 6.2. Kiểm tra qua proxy

Dự án đã có proxy endpoint tại `/api/proxy`. Kiểm tra:

```bash
curl http://localhost:3000/api/proxy?action=getRooms
```

Hoặc mở trong trình duyệt khi dev server đang chạy.

### 6.3. Kiểm tra frontend

Khởi động dev server và truy cập:

- `http://localhost:3000/` — Homepage
- `http://localhost:3000/rooms` — Danh sách phòng (gọi API thật)

---

## 7. Cấu trúc dự án

```
Homematch/
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
3. Frontend gọi API qua service layer (`src/services/`)
4. Service gọi `apiRequest()` trong `src/lib/api-client.ts`
5. `api-client.ts` gọi proxy `/api/proxy`
6. Proxy forward request đến Google Apps Script

### 8.2. Thay đổi Apps Script

1. Sửa code trong `apps-script/`
2. Push: `cd apps-script && clasp push`
3. Tạo version: `clasp version "Mô tả"`
4. Deploy: `clasp deploy -V {VERSION} -d "Mô tả"`
5. Cập nhật `.env.local` nếu deploy ID thay đổi

### 8.3. Commit convention

```
feat: thêm tính năng mới
fix: sửa lỗi
chore: dọn dẹp, cấu hình
docs: cập nhật tài liệu
refactor: tái cấu trúc code
```

---

## 9. Xử lý sự cố

### API trả về 404

**Nguyên nhân:** Deployment chưa được cấu hình đúng.

**Fix:**
1. Mở Script Editor → **Deploy → New deployment**
2. Chọn **Web app** (không phải Library)
3. **Execute as**: `Me` | **Who has access**: `Anyone`

### API trả về lỗi xác thực

**Nguyên nhân:** Script chưa được cấp quyền.

**Fix:**
1. Mở Script Editor
2. Chạy thử hàm `doGet` hoặc `doPost` từ editor
3. Chấp nhận quyền (Review Permissions → Allow)

### API trả về mảng rỗng `[]`

**Nguyên nhân:** SHEET_ID chưa set hoặc sai, hoặc sheet name không đúng.

**Fix:**
1. Kiểm tra Script Properties: `SHEET_ID` đã set đúng chưa
2. Kiểm tra tên tab trong Sheet: phải khớp với `SHEET_NAME` trong `Code.js`
3. Kiểm tra Sheet có dữ liệu không

### API trả về lỗi "API_URL_NOT_CONFIGURED"

**Nguyên nhân:** `.env.local` chưa có `NEXT_PUBLIC_API_URL`.

**Fix:** Thêm URL deploy vào `.env.local` như hướng dẫn ở phần 3.

### Proxy trả về lỗi CORS

**Nguyên nhân:** Gọi trực tiếp đến Google Apps Script URL (bỏ qua proxy).

**Fix:** Frontend luôn gọi qua `/api/proxy`, không gọi thẳng URL deploy. Kiểm tra `src/lib/api-client.ts` — URL phải bắt đầu bằng `/api/proxy`.

### Ảnh không hiển thị

**Nguyên nhân:** Đường dẫn ảnh trong Sheet là relative path, không phải URL đầy đủ.

**Fix:** Cập nhật cột `HinhAnhChinh` trong Sheet với URL đầy đủ hoặc thêm logic xử lý trong `mapRoom()`.

---

> **Xem thêm:** [docs/api-contracts.md](api-contracts.md) | [docs/database_structure.md](database_structure.md) | [docs/business-flow.md](business-flow.md)
