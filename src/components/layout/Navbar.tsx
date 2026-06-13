"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/layout/Container";
import { site } from "@/configs/site";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/rooms", label: "Tìm phòng" },
  { href: "/roommates", label: "Ở ghép" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
              M
            </div>
            <span className="text-lg font-bold text-accent">{site.name}</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-accent-light transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={site.zaloUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-primary hover:bg-primary-dark">
                Liên hệ Zalo
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center p-2 text-accent-light md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile nav */}
        {isOpen && (
          <div className="border-t border-gray-100 pb-4 pt-2 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm font-medium text-accent-light transition-colors hover:bg-orange-50 hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 px-3">
              <a
                href={site.zaloUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button className="w-full bg-primary hover:bg-primary-dark">
                  Liên hệ Zalo
                </Button>
              </a>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}
