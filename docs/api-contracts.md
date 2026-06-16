# API Contracts V3

## Overview

Website sử dụng Google Apps Script API.

Google Sheet là nguồn dữ liệu chính.

**Base URL:** `https://script.google.com/macros/s/{SCRIPT_ID}/exec`

**Method:** GET (đọc) / POST (ghi)

> Cập nhật theo cấu trúc Google Sheet thật (DATABASE_HomeMatch).

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
| khuVuc | string | No | Lọc khu vực (VD: "Quận 7") |
| giaMin | number | No | Giá tối thiểu |
| giaMax | number | No | Giá tối đa |

### Response

```json
[
  {
    "id": "2026616144133",
    "image": "https://...",
    "address": {
      "soNha": "214",
      "duong": "Đường số 9",
      "phuong": "Tân Mỹ",
      "khuVuc": "Quận 7"
    },
    "price": 7000000,
    "area": 0,
    "contractType": "6-12 tháng",
    "amenities": {
      "mayLanh": true,
      "keBep": true,
      "gac": false,
      "tuLanh": true,
      "nhaVS": true,
      "cuaSo": true,
      "banCong": false,
      "deXe": true,
      "thuCung": false,
      "xeDien": false,
      "mayGiat": true,
      "thangMay": true
    },
    "floor": "Lầu 6",
    "costs": {
      "dien": 3800,
      "nuoc": 25000,
      "phiQuanLy": 130000,
      "phiGiuXe": 100000
    },
    "description": "Gần chợ Tân Mỹ, thuận tiện di chuyển",
    "status": "ACTIVE",
    "slug": ""
  }
]
```

### Thay đổi từ V2 → V3

| Field | Thay đổi |
|-------|----------|
| `area` | Luôn = 0 (Sheet không có DienTich) |
| `amenities` | Thêm: banCong, thangMay |
| `floor` | Mới: lấy từ cột Lau |
| `costs` | Parse từ text "3.800đ/kWh" → number |
| `status` | Map từ "Trống" → "ACTIVE" |
| `image` | Lấy từ HinhAnhChinh |

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
| gender | string | No | Tìm theo giới tính |
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
    "budget": 5000000,
    "needCount": "1",
    "desiredArea": "",
    "description": "Cần tìm 1 bạn ở ghép...",
    "status": "ACTIVE",
    "expireAt": "2026-07-01",
    "createdAt": "2026-06-14"
  }
]
```

### Thay đổi từ V2 → V3

| Field | Thay đổi |
|-------|----------|
| `postType` | Map từ KieuBaiDang |
| `needCount` | Mới: SoNguoiCanTuyen |
| `desiredArea` | Mới: KhuVucMongMuon |
| `phone` | Ẩn bớt số (bảo mật) |

---

## GET ?action=getRoommatePostDetail&id={ID}

Mục đích:

Lấy chi tiết bài ở ghép kèm thông tin phòng.

### Query

| Param | Type | Required |
|-------|------|----------|
| action | string | Yes | `getRoommatePostDetail` |
| id | string | Yes | Mã bài đăng (IDBai) |

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

---

# Lịch sử thay đổi

| Version | Ngày | Thay đổi |
|---------|------|----------|
| V1 | 2026-06-13 | Thiết kế ban đầu |
| V2 | 2026-06-14 | Cập nhật API endpoints |
| V3 | 2026-06-16 | Đồng bộ với Google Sheet thật |
