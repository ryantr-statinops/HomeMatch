# Session 017 — Thêm Section "Cam Kết" vào Homepage ✅

## Mục tiêu
Thêm Section 5 - Cam Kết vào trang chủ, nằm giữa How It Works (Section 4) và CTA (Section 6).

---

## Scope

1. ✅ Tạo component `src/components/shared/CommitmentCard.tsx` — card hiển thị từng cam kết
2. ✅ Thêm dữ liệu cam kết vào `src/constants/commitments.ts` — mảng chứa 3 cam kết
3. ✅ Sửa `src/app/page.tsx` — thêm section Cam Kết giữa How It Works và CTA

---

## Nội dung cam kết

**Header:** "CHÚNG TÔI CAM KẾT VÌ TRẢI NGHIỆM CỦA BẠN"
**Description:** "Sự hài lòng của khách hàng là tài sản lớn nhất của HomeMatch. Chúng tôi bảo vệ quyền lợi của bạn bằng những cam kết bằng văn bản:"

| Cam kết | Nội dung |
|---------|----------|
| Bình ổn giá thuê | Không tự ý tăng giá phòng trong suốt thời hạn hợp đồng |
| Thông tin chính xác | Nói không với tin ảo, hình ảnh minh họa sai sự thật |
| Thuận mua vừa bán | Hỗ trợ xem phòng miễn phí, không ép buộc, không thu phí ngầm khi xem phòng |

---

## Files đã tạo/sửa

| File | Action |
|------|--------|
| `src/constants/commitments.ts` | **Tạo mới** — data 3 cam kết với icon |
| `src/components/shared/CommitmentCard.tsx` | **Tạo mới** — card component |
| `src/app/page.tsx` | **Sửa** — thêm section Cam Kết |
| `docs/ui-spec.md` | **Sửa** — đã có nội dung section 5 (do user cập nhật) |

---

## Tham khảo

- `src/components/shared/ValueCard.tsx` — pattern hiện tại cho card
- `src/constants/how-it-works.ts` — pattern data constants
- `docs/ui-spec.md` — UI spec section 5

---

## Out Of Scope

- Không thay đổi màu sắc, layout phần khác
- Không thêm animation phức tạp

---

## Định nghĩa hoàn thành

- [x] CommitmentCard component hoạt động
- [x] Section hiển thị đúng vị trí giữa How It Works và CTA
- [x] Responsive (mobile + desktop)
- [x] `npm run build` không lỗi
