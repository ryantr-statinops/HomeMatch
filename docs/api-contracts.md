# API Contracts V2

## Overview

Website sử dụng Google Apps Script API.

Google Sheet là nguồn dữ liệu chính.

**Base URL:** `https://script.google.com/macros/s/{SCRIPT_ID}/exec`

**Method:** GET (đọc) / POST (ghi)

---

# Rooms

## GET ?action=getRooms

Mục đích:

Lấy danh sách phòng.

### Query

| Param | Type | Required |
|-------|------|----------|
| action | string | Yes | `getRooms` |
| keyword | string | No | Tìm theo địa chỉ/mô tả |
| khuVuc | string | No | Lọc khu vực |
| giaMin | number | No | Giá tối thiểu |
| giaMax | number | No | Giá tối đa |
| dienTichMin | number | No | Diện tích tối thiểu |

### Response

```json
[
  {
    "id": "ROOM001",
    "image": "https://...",
    "address": {
      "soNha": "12A",
      "duong": "Nguyễn Văn Linh",
      "phuong": "Tân Phong",
      "khuVuc": "Q7"
    },
    "price": 3000000,
    "area": 25,
    "contractType": "Dài hạn",
    "amenities": { "mayLanh": true, "gac": false, ... },
    "description": "Phòng thoáng mát...",
    "status": "ACTIVE",
    "slug": "phong-tro-q7-001"
  }
]
```

---

## GET ?action=getRoomDetail&id={ID}

Mục đích:

Lấy chi tiết phòng kèm danh sách ảnh.

### Query

| Param | Type | Required |
|-------|------|----------|
| action | string | Yes | `getRoomDetail` |
| id | string | Yes | Mã phòng (IDPhong) |

### Response

Giống getRooms nhưng có thêm:

```json
{
  "images": [
    { "id": "ANH001", "url": "https://...", "sortOrder": 1 }
  ]
}
```

---

# Roommate Posts

## GET ?action=getRoommatePosts

Mục đích:

Lấy danh sách bài ở ghép.

### Query

| Param | Type | Required |
|-------|------|----------|
| action | string | Yes | `getRoommatePosts` |
| postType | string | No | `HAVE_ROOM` hoặc `NEED_ROOMMATE` |
| gender | string | No | `nam` / `nữ` |
| khuVuc | string | No | Lọc theo khu vực |

### Response

```json
[
  {
    "id": "POST001",
    "roomId": "ROOM001",
    "postType": "HAVE_ROOM",
    "customer": {
      "name": "Nguyễn Văn A",
      "phone": "090...",
      "gender": "nam",
      "school": "ĐH KHTN"
    },
    "budget": 3000000,
    "description": "Cần tìm 1 bạn ở ghép...",
    "status": "ACTIVE",
    "expireAt": "2026-07-01",
    "createdAt": "2026-06-14"
  }
]
```

---

## GET ?action=getRoommatePostDetail&id={ID}

Mục đích:

Lấy chi tiết bài ở ghép kèm thông tin phòng.

### Query

| Param | Type | Required |
|-------|------|----------|
| action | string | Yes | `getRoommatePostDetail` |
| id | string | Yes | Mã bài đăng (PostID) |

### Response

Giống getRoommatePosts nhưng có thêm `room` object (thông tin phòng).

---

# Leads

## POST ?action=createLead

Mục đích:

Ghi nhận lead từ website.

### Request Body (JSON)

```json
{
  "action": "createLead",
  "sourceType": "ROOM",
  "sourceId": "ROOM001"
}
```

| Field | Type | Description |
|-------|------|-------------|
| action | string | `createLead` |
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

# Error Response

```json
{
  "error": "Error message"
}
```

HTTP Status: 400 (Bad Request) / 500 (Internal Server Error)
