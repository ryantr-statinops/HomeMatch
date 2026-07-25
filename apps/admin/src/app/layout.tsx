import type { Metadata } from "next";
import { Geist } from "next/font/google";
import type { ReactNode } from "react";

import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
});

export const metadata: Metadata = {
  title: "HomeMatch Operations",
  description: "Không gian vận hành dành cho đội ngũ HomeMatch.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html className={geist.variable} lang="vi">
      <body>{children}</body>
    </html>
  );
}
