# Session 024 — PHONGTRO Schema Update: Thêm MaPhong, LoaiPhong, DienTich

## Session ID

SESSION-024

---

## Date

2026-06-28

---

## Goal

Cập nhật tài liệu docs/ để đồng bộ với schema mới của bảng PHONGTRO sau khi thêm 3 cột: `MaPhong`, `LoaiPhong`, `DienTich`.

---

## Context

Các tài liệu liên quan:

* `docs/diagrams/erd-v1.md`
* `docs/database_structure.md`
* `docs/sheet-design.md`
* `task/next-plan.md`

---

## Scope

Những việc đã thực hiện:

1. Cập nhật `docs/diagrams/erd-v1.md` — Thêm MaPhong, LoaiPhong, DienTich vào Mermaid ERD, bump V5
2. Cập nhật `docs/database_structure.md` — Thêm 3 cột mới vào bảng field descriptions, bump V5
3. Cập nhật `docs/sheet-design.md` — Thêm 3 cột mới vào sheet PHONGTRO, bump V4
4. Commit & push từng file riêng biệt

---

## Deliverables

### 3 Files đã cập nhật

| File | Version | Thay đổi chính |
|------|---------|----------------|
| `docs/diagrams/erd-v1.md` | V5 | Thêm `MaPhong`, `LoaiPhong`, `DienTich` vào entity PHONGTRO trong Mermaid ERD |
| `docs/database_structure.md` | V5 | Thêm 3 cột mới vào bảng fields PHONGTRO |
| `docs/sheet-design.md` | V4 | Thêm 3 cột mới vào sheet PHONGTRO |

### 4 Commits đã push

```
9ea091d docs: update ERD diagram to V5 with MaPhong, LoaiPhong, DienTich columns
00b68f5 docs: update database_structure V5 with MaPhong, LoaiPhong, DienTich columns
b1937da docs: update sheet-design V4 with MaPhong, LoaiPhong, DienTich columns
```

---

## Notes

* Schema mới thêm 3 cột so với thiết kế cũ: `MaPhong` (mã rút gọn), `LoaiPhong` (phân loại), `DienTich` (diện tích)
* Codebase (`src/types/room.ts`, `src/services/room.service.ts`) chưa được cập nhật để map các cột này — cần làm ở session riêng
* File `apps-script/rooms.js` (deprecated) cũng thiếu 3 cột này nhưng không cần sửa

---

## Definition Of Done

* [x] Cập nhật ERD diagram docs/diagrams/erd-v1.md
* [x] Cập nhật database_structure.md
* [x] Cập nhật sheet-design.md
* [x] Commit & push từng file riêng biệt
* [x] Không vi phạm project-rules
* [x] Không mở rộng scope
