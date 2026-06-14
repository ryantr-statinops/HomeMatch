import Link from "next/link";
import Image from "next/image";
import { MapPin, MessageCircle } from "lucide-react";
import Container from "@/components/layout/Container";
import { site } from "@/configs/site";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <Container className="py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/logo/logo.webp"
                alt={site.name}
                width={32}
                height={32}
                className="h-8 w-auto rounded-lg"
              />
              <span className="text-lg font-bold text-accent">
                {site.name}
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-accent-light">
              Nền tảng kết nối sinh viên với phòng trọ phù hợp và bạn ở ghép
              tiềm năng. Liên hệ qua Zalo để được tư vấn miễn phí.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-accent">
              Dịch vụ
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/rooms"
                  className="text-sm text-accent-light transition-colors hover:text-primary"
                >
                  Tìm phòng trọ
                </Link>
              </li>
              <li>
                <Link
                  href="/roommates"
                  className="text-sm text-accent-light transition-colors hover:text-primary"
                >
                  Tìm người ở ghép
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-accent">
              Liên hệ
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-accent-light">
                <MapPin size={16} className="shrink-0 text-primary" />
                <span>Khu vực TP. Hồ Chí Minh</span>
              </li>
              <li>
                <a
                  href={site.zaloUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                >
                  <MessageCircle size={16} />
                  Chat Zalo ngay
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-6 text-center text-xs text-accent-light">
          &copy; 2026 {site.name}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
