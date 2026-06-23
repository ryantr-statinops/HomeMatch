# API Contracts V4

## Overview

Website sử dụng **Supabase SDK** trực tiếp từ Next.js.

Không còn Google Apps Script API (đã thay thế từ Phase 2).

**Base URL:** Không có — gọi Supabase trực tiếp qua `@supabase/supabase-js`

**Database:** Supabase (PostgreSQL) — migrated từ Google Sheet

---

## Kiến trúc luồng dữ liệu

```text
Client Component / Server Component
        │
        ├── room.service.ts → supabase.from("phongtro").select(...)
        │                      └── resolve HinhAnhChinh qua imagecache table
        │
        ├── roommate.service.ts → supabase.from("roommate").select(...)
        │
        └── lead.service.ts → supabase.from("lead").insert(...)
```

## Image Resolution Flow

```text
PHONGTRO.HinhAnhChinh = "PHONGTRO_Images/abc.jpg"
        │
        ▼
room.service.ts:
  1. Query ImageCache WHERE path = "PHONGTRO_Images/abc.jpg"
  2. Lấy drive_url = "https://drive.google.com/thumbnail?id=...&sz=w1000"
  3. Gán vào Room.image hoặc Room.images[].url
```

---

# Rooms

## getRooms()

Mục đích:

Lấy danh sách phòng từ Supabase.

### Parameters (RoomFilterParams)

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| keyword | string | No | Tìm theo địa chỉ/mô tả |
| khuVuc | string | No | Lọc khu vực (VD: "Quận 7") |
| giaMin | number | No | Giá tối thiểu |
| giaMax | number | No | Giá tối đa |
| amenities | string[] | No | Mảng tiện ích (VD: ["mayLanh", "thangMay"]) |

### Response

```typescript
Room[]  // Giống cấu trúc cũ, image/url đã resolve từ ImageCache
```

## getRoomById(id)

Mục đích:

Lấy chi tiết phòng kèm danh sách ảnh.

### Parameters

| Param | Type | Required |
|-------|------|----------|
| id | string | Yes | Mã phòng (IDPhong) |

### Response

```typescript
Room & { images: RoomImage[] }
```

---

# Roommate Posts

## getRoommatePosts()

Mục đích:

Lấy danh sách bài ở ghép từ Supabase.

### Parameters (RoommateFilterParams)

| Param | Type | Required | Description |
|-------|------|----------|-------------|
| postType | string | No | `HAVE_ROOM` hoặc `NEED_ROOMMATE` |
| gender | string | No | Tìm theo giới tính |
| khuVuc | string | No | Lọc theo khu vực |

### Response

```typescript
RoommatePost[]
```

## getRoommatePostById(id)

### Parameters

| Param | Type | Required |
|-------|------|----------|
| id | string | Yes | Mã bài đăng (IDBai) |

### Response

```typescript
RoommatePost & { room: Room | null }
```

---

# Leads

## createLead()

Mục đích:

Ghi nhận lead từ website vào Supabase.

### Request

| Field | Type | Description |
|-------|------|-------------|
| sourceType | string | `ROOM` hoặc `ROOMMATE` |
| sourceId | string | ID của phòng hoặc bài đăng |

### Response

```json
{
  "success": true,
  "leadId": "LEAD1718400000000",
  "message": "Lead đã được ghi nhận."
}
```

---

# Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://rccszqpjeikcjrfmbzpl.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_...
SUPABASE_SERVICE_KEY=sb_secret_...   # Chỉ dùng cho migration script
```

---

# Lịch sử thay đổi

| Version | Ngày | Thay đổi |
|---------|------|----------|
| V1 | 2026-06-13 | Thiết kế ban đầu (Apps Script) |
| V2 | 2026-06-14 | Cập nhật API endpoints |
| V3 | 2026-06-16 | Đồng bộ với Google Sheet thật |
| V4 | 2026-06-23 | Thay Apps Script → Supabase SDK, thêm ImageCache resolve |
