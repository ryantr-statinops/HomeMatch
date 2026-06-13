import type { Metadata } from "next";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "MatchHome - Tìm phòng trọ & Tìm người ở ghép",
  description:
    "Nền tảng tìm phòng trọ và tìm người ở ghép dành cho sinh viên. Liên hệ qua Zalo để được tư vấn miễn phí.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={cn("font-sans", geist.variable)}>
      <body>{children}</body>
    </html>
  );
}
