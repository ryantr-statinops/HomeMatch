# API Contracts V1

## Overview

Website sử dụng Google Apps Script API.

Google Sheet là nguồn dữ liệu chính.

---

# Rooms

## GET /rooms

Mục đích:

Lấy danh sách phòng.

### Query

* keyword
* khuVuc
* giaMin
* giaMax
* dienTichMin

### Response

Room[]

---

## GET /rooms/:id

Mục đích:

Lấy chi tiết phòng.

### Response

Room

---

# Roommate Posts

## GET /roommate-posts

Mục đích:

Lấy danh sách bài ở ghép.

### Query

* postType
* gender
* khuVuc

### Response

RoommatePost[]

---

## GET /roommate-posts/:id

Mục đích:

Lấy chi tiết bài ở ghép.

### Response

RoommatePost

---

# Leads

## POST /leads

Mục đích:

Ghi nhận lead từ website.

### Request

sourceType
sourceId

### Response

success
