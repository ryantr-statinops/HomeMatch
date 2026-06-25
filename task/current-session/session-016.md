# Session 016 — Deployment lên Vercel

## Mục tiêu
Deploy frontend Next.js lên Vercel thay vì Cloudflare Pages (do `@cloudflare/next-on-pages` deprecated, không hỗ trợ Next.js >= 15.5.2).

Vercel là nền tảng chính thức của Next.js, zero config, free, hỗ trợ đầy đủ ISR + API routes.

---

## Dọn dẹp — Những thứ cần xoá khỏi dự án

### 1. Xoá dependencies Cloudflare
| Package | Lý do |
|---------|-------|
| `@cloudflare/next-on-pages` | Deprecated, không dùng nữa |
| `wrangler` | Chỉ dùng cho Cloudflare |

### 2. Xoá file config Cloudflare
- `wrangler.toml` — không cần cho Vercel

### 3. Sửa lại code — revert edge runtime
- `src/app/api/proxy/route.ts` — xoá `export const runtime = "edge"` (Vercel dùng Node.js runtime mặc định)
- `src/app/rooms/[id]/page.tsx` — xoá `export const runtime = "edge"`

### 4. Sửa `next.config.ts`
- Xoá (hoặc tuỳ chọn) `images: { unoptimized: true }` — Vercel hỗ trợ Next.js Image Optimization, có thể bỏ để ảnh tự động tối ưu

### 5. Sửa `package.json`
- Xoá scripts: `pages:build`, `pages:preview`, `pages:deploy`

---

## Các bước deploy

### Bước 1 — Dọn dẹp code
```bash
npm uninstall @cloudflare/next-on-pages wrangler
rm wrangler.toml
```
Revert edge runtime trong 2 file route.

### Bước 2 — Nâng cấp lại Next.js lên 16 (khuyến nghị)
```bash
npm install next@^16.2.9 eslint-config-next@^16.2.9 typescript@^6.0.3
```

### Bước 3 — Push lên GitHub
```bash
git add -A && git commit -m "chore: switch from Cloudflare to Vercel deployment"
git push
```

### Bước 4 — Deploy trên Vercel
1. Vào [vercel.com](https://vercel.com)
2. Đăng nhập bằng GitHub
3. **Add New → Project**
4. Import repository `ryantr-statinops/HomeMatch`
5. Next.js tự detect — **Deploy** (không cần config gì)
6. Sau khi deploy xong, vào **Settings → Environment Variables** thêm:
   - `NEXT_PUBLIC_API_URL` = URL Apps Script Web App (v23)
   - `NEXT_PUBLIC_SITE_URL` = URL Vercel (VD: `https://homematch.vercel.app`)
   - `NEXT_PUBLIC_ZALO_URL` = link Zalo OA
   - `NEXT_PUBLIC_GA_ID` = Google Analytics ID (nếu có)
7. Vào **Deployments**, nhấn **"Redeploy"** để build lại với env vars

### Bước 5 — Custom domain (tuỳ chọn)
1. Trong Vercel → project → **Domains**
2. Nhập domain (VD: `homematch.com`)
3. Trỏ DNS về Vercel nameservers

---

## Kiểm tra sau deploy

| URL | Mong đợi |
|-----|----------|
| `https://homematch.vercel.app/` | Homepage |
| `https://homematch.vercel.app/rooms` | Danh sách phòng, load data từ API |
| `https://homematch.vercel.app/rooms/{id}` | Chi tiết phòng (ISR 60s) |
| API proxy (internal) | Gọi thành công đến Apps Script |

---

## Định nghĩa hoàn thành

- [x] Xoá sạch Cloudflare config + dependencies
- [x] Revert edge runtime
- [x] Deploy thành công trên Vercel (thủ công qua Web Dashboard)
- [x] Các trang load được, API hoạt động
- [x] Zalo button hoạt động

---

## Cập nhật sau deploy (2026-06-25)

- **Vercel URL:** https://homematchvn.vercel.app
- **Custom domain:** https://homematch.id.vn ✅ đã hoạt động
- **Vercel Web Analytics:** ✅ enabled
- **Env vars:** ✅ đã cấu hình Supabase + Zalo + Site URL trên Vercel Dashboard
- **Lưu ý:** Dự án đã chuyển từ Apps Script → Supabase SDK nên không cần API proxy như kế hoạch cũ
