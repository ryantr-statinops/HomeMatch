"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Container from "@/components/layout/Container";
import { site } from "@/configs/site";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/rooms", label: "Tìm phòng" },
  { href: "/roommates", label: "Ở ghép" },
];

const zaloButtonClass =
  "flex items-center justify-center gap-1.5 rounded-lg bg-white px-2.5 py-1.5 text-sm font-medium text-primary transition-all hover:bg-gray-100 active:scale-95";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-blue-800 bg-primary">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo/logo.webp"
              alt={site.name}
              width={35}
              height={35}
              className="h-[35px] w-auto rounded-lg"
            />
            <span className="text-lg font-bold text-white">{site.name}</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-medium text-white transition-colors hover:text-blue-200"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={site.zaloUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(zaloButtonClass, "inline-flex")}
            >
              Liên hệ Zalo
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center p-2 text-white transition-transform md:hidden active:scale-90"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile nav */}
      <div
        className={`absolute left-0 right-0 z-50 transition-all duration-300 ease-out md:hidden ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="border-t border-blue-800 bg-primary pb-4 pt-2 shadow-lg">
          <Container>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 py-2 text-base font-medium text-white transition-colors hover:bg-primary-dark hover:text-blue-200 active:scale-[0.98]"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 px-3">
              <a
                href={site.zaloUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(zaloButtonClass, "w-full")}
              >
                Liên hệ Zalo
              </a>
            </div>
          </Container>
        </div>
      </div>
    </nav>
  );
}
