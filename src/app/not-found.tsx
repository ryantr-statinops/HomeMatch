import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-accent">404</h1>
      <p className="mt-2 text-accent-light">Trang không tồn tại</p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-primary px-4 py-2 text-white transition hover:bg-primary-dark"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
