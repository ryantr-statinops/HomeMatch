# Homematch 🏠

Nền tảng tìm phòng trọ và tìm người ở ghép dành cho sinh viên.

## 🚀 Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Icons:** Lucide Icons
- **Hosting:** Cloudflare Pages
- **API:** Google Apps Script
- **Database:** Google Sheet

## 📁 Project Structure

```
src/
├── app/          # App Router pages
├── components/   # React components
│   ├── layout/   # Layout components (Navbar, Footer, Container)
│   ├── ui/       # shadcn/ui components
│   ├── shared/   # Shared components
│   ├── room/     # Room-related components
│   └── roommate/ # Roommate-related components
├── features/     # Business logic
│   ├── rooms/
│   └── roommates/
├── services/     # API services
├── lib/          # Utility functions
├── hooks/        # Custom hooks
├── types/        # TypeScript types
├── constants/    # Constants
└── configs/      # Configuration
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
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_ZALO_URL=
NEXT_PUBLIC_GA_ID=
```

## 📚 Documentation

Xem thêm trong thư mục `docs/` và `task/`.
