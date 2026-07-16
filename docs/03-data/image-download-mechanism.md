# Image Download Mechanism

## Purpose

Tài liệu này mô tả cơ chế tải ảnh trong HomeMatch khi ảnh được lưu/resolve qua Google Drive.

Mục tiêu:

- Hiểu tại sao download trực tiếp từ frontend có thể fail
- Xác định luồng đúng để tải ảnh ổn định
- Làm cơ sở cho việc triển khai API download nội bộ sau này

---

## Context

Hiện tại ảnh trong hệ thống có thể xuất hiện dưới nhiều dạng:

- Path gốc từ AppSheet, ví dụ: `PHONGTRO_Images/abc.jpg`
- URL đã resolve qua bảng `imagecache` trong Supabase
- Google Drive thumbnail URL, ví dụ: `https://drive.google.com/thumbnail?id=...&sz=w1000`

Frontend đang hiển thị ảnh bằng URL đã resolve.

Vấn đề phát sinh khi người dùng bấm download trực tiếp từ browser:

- `fetch()` từ client sang một origin khác có thể bị chặn bởi CORS
- Google Drive thumbnail URL không phải lúc nào cũng cho phép browser đọc response để tạo `blob`
- Vì vậy cách `fetch(url) -> blob -> objectURL -> download` không ổn định

---

## Current Image Flow

```text
AppSheet / Database
    │
    ├── PHONGTRO.HinhAnhChinh hoặc HINHANH.HinhAnh
    │      └── path gốc, ví dụ: PHONGTRO_Images/abc.jpg
    │
    ▼
Supabase imagecache
    │
    └── path -> drive_url
           └── Google Drive thumbnail URL
```

Frontend hiện dùng:

- `room.service.ts` để resolve path sang `drive_url`
- `RoomGallery.tsx` để hiển thị ảnh

---

## Why Direct Client Download Fails

### 1. Cross-origin restrictions

Browser chỉ cho `fetch()` đọc response cross-origin nếu server đích cho phép CORS phù hợp.

### 2. Google Drive thumbnail URLs are not designed as a stable browser download endpoint

Ảnh Google Drive có thể hiển thị tốt trong `<img>`, nhưng không đảm bảo luôn có thể:

- đọc raw bytes bằng `fetch()`
- tải blob về bằng client-side script

### 3. Multiple image representations

Do data layer của dự án có nhiều dạng ảnh khác nhau, client-side download phải đoán đúng source và cách tải, dễ lỗi.

---

## Recommended Download Architecture

Giải pháp ổn định là dùng một route nội bộ của chính app để download ảnh.

### Proposed flow

```text
User clicks Download
    │
    ▼
Next.js internal route / API route
    │
    ├── nhận image path hoặc resolved URL
    ├── lookup imagecache nếu cần
    ├── server fetch ảnh từ source phù hợp
    └── trả về response với Content-Disposition: attachment
```

### Why server-side

- Không phụ thuộc CORS ở browser
- Có thể xử lý nhiều loại input:
  - path gốc
  - URL đã resolve
  - ảnh từ Google Drive thumbnail
- Có thể đặt tên file download ổn định hơn

---

## Expected API Behavior

Route download nên làm các việc sau:

1. Nhận input từ query string hoặc param
2. Xác định nguồn ảnh hợp lệ
3. Fetch ảnh từ server side
4. Trả response với header:

```text
Content-Disposition: attachment; filename="homematch-room-image-1.jpg"
```

5. Stream file về browser để browser tự download

---

## Suggested Inputs

Tùy implementation, route download có thể nhận một trong các kiểu sau:

### Option A - `path`

```text
/api/images/download?path=PHONGTRO_Images/abc.jpg
```

Ưu điểm:

- Bám sát nguồn dữ liệu gốc
- Có thể lookup qua `imagecache`

### Option B - `url`

```text
/api/images/download?url=https://drive.google.com/thumbnail?id=...
```

Ưu điểm:

- Dễ nối từ UI hiện tại

Nhược điểm:

- Cần validate chặt để tránh download từ URL không mong muốn

### Khuyến nghị

Ưu tiên `path` nếu có thể, vì an toàn và nhất quán hơn.

---

## UI Responsibilities

`RoomGallery.tsx` chỉ nên làm các việc sau:

- Hiển thị nút download
- Gửi request đến route download nội bộ
- Không tự fetch blob từ Google Drive nữa

Nói cách khác:

- UI chỉ điều phối hành vi
- Server route xử lý download thật

---

## Open Questions

1. Route download sẽ nhận `path` hay `url`?
2. Có cần fallback cho trường hợp ảnh chưa có trong `imagecache` không?
3. Tên file download sẽ lấy từ đâu?
   - generic name
   - room id
   - room slug
   - image index

---

## Relation To Current Code

### Frontend

- [`src/components/room/RoomGallery.tsx`](../../src/components/room/RoomGallery.tsx)
- [`src/components/room/ImageViewer.tsx`](../../src/components/room/ImageViewer.tsx)

### Data layer

- [`src/services/room.service.ts`](../../src/services/room.service.ts)
- [`docs/03-data/database-structure.md`](database-structure.md)

---

## Status

- Concept documented
- UI button exists
- Server-side download route: pending

