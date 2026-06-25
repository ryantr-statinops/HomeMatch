# HomeMatch 🏠

Nền tảng tìm phòng trọ và tìm người ở ghép dành cho sinh viên.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui + @base-ui/react
- **Icons:** Lucide Icons
- **Hosting:** Vercel
- **API:** Supabase SDK (JavaScript client)
- **Database:** Supabase (PostgreSQL)
- **Animation:** tw-animate-css + Embla Carousel
- **Analytics:** Vercel Web Analytics

## 🌐 Production

- **Vercel:** https://homematchvn.vercel.app
- **Custom domain:** https://homematch.id.vn ✅

## 📁 Project Structure

```
src/
├── app/          # App Router pages
├── components/   # React components
│   ├── layout/   # Navbar, Footer, Container
│   ├── ui/       # shadcn/ui components
│   ├── shared/   # Shared components
│   ├── room/     # Room-related components
│   └── roommate/ # Roommate-related components
├── services/     # Supabase service layer
├── lib/          # Utility functions + Supabase client
├── types/        # TypeScript types
├── constants/    # Constants
└── configs/      # Environment configuration
```

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Lint code
npm run lint
```

## 🌐 Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_ZALO_URL=
NEXT_PUBLIC_SITE_URL=
```

## 📚 Documentation

Xem thêm trong thư mục `docs/` và `task/`.
