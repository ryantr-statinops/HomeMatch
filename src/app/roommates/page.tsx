import Link from "next/link";
import {
  Users,
  MessageCircle,
  Home,
  ArrowRight,
  Clock,
  UserPlus,
  Building2,
} from "lucide-react";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/shared/SectionTitle";
import { site } from "@/configs/site";

const features = [
  {
    icon: UserPlus,
    title: "Đã có phòng, cần tìm người ở ghép",
    description:
      "Bạn đang thuê một phòng và muốn tìm thêm người ở chung để chia sẻ chi phí? Tính năng này sẽ giúp bạn kết nối với những người phù hợp.",
  },
  {
    icon: Building2,
    title: "Muốn thuê phòng, cần bạn chung tiền",
    description:
      "Bạn muốn thuê một phòng nhưng ngân sách có hạn? Ghép đôi với người có cùng nhu cầu để cùng thuê chung một phòng.",
  },
  {
    icon: Home,
    title: "Thông tin chi tiết & rõ ràng",
    description:
      "Mỗi bài đăng đều có thông tin đầy đủ về đối tượng ở ghép, khu vực mong muốn, mức tài chính và mô tả chi tiết.",
  },
];

export default function RoommatesPage() {
  return (
    <>
      {/* ===== Hero Section ===== */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        {/* Decorative background */}
        <div className="absolute -right-40 -top-40 h-96 w-96 rounded-full bg-blue-50 opacity-50" />
        <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-blue-50 opacity-30" />

        <Container>
          <div className="relative mx-auto max-w-3xl text-center">
            {/* Badge */}
            <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full bg-orange-50 px-4 py-1.5 text-sm font-medium text-orange-600">
              <Clock size={16} />
              Sắp ra mắt
            </div>

            {/* Icon */}
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary shadow-lg shadow-blue-200">
              <Users size={40} className="text-white" />
            </div>

            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-accent md:text-5xl lg:text-6xl">
              Tìm người{" "}
              <span className="text-primary">ở ghép</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-accent-light md:text-xl">
              Tính năng đang được phát triển. Sắp tới, bạn có thể kết nối với
              những người bạn ở ghép tiềm năng — phù hợp tính cách, sở thích và
              ngân sách ngay tại đây!
            </p>
          </div>
        </Container>
      </section>

      {/* ===== Features Preview Section ===== */}
      <section className="bg-gray-50 py-16 md:py-24">
        <Container>
          <SectionTitle
            title={
              <>
                Những gì sắp có trên{" "}
                <span className="text-primary">Ở ghép</span>
              </>
            }
            description="Chúng tôi đang xây dựng một trải nghiệm kết nối ở ghép đơn giản và hiệu quả."
          />

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:border-primary/20 hover:shadow-lg hover:shadow-blue-100"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <feature.icon size={28} />
                </div>
                <h3 className="text-lg font-semibold text-accent">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-accent-light">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ===== CTA Section ===== */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border-2 border-primary bg-white px-6 py-16 text-center shadow-2xl shadow-blue-200 md:px-16">
            {/* Decorative elements */}
            <div className="absolute -right-8 -top-8 h-40 w-40 rounded-full bg-blue-50 opacity-60" />
            <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-blue-50 opacity-40" />

            <div className="relative">
              <h2 className="text-3xl font-bold text-primary md:text-4xl">
                Trong lúc chờ đợi...
              </h2>
              <p className="relative mx-auto mt-4 max-w-xl text-base leading-relaxed text-primary">
                Bạn có thể xem danh sách phòng trọ hiện có hoặc liên hệ trực tiếp
                với đội sale qua Zalo để được hỗ trợ tìm phòng và ở ghép.
              </p>
              <div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/rooms"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-primary-dark hover:shadow-xl"
                >
                  Xem danh sách phòng
                  <ArrowRight size={20} />
                </Link>
                <a
                  href={site.zaloUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-primary px-8 py-3.5 text-base font-semibold text-primary transition-all hover:bg-blue-50"
                >
                  <MessageCircle size={20} />
                  Liên hệ Zalo
                </a>
              </div>
            </div>
          </div>

          {/* Back to home link */}
          <div className="mt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-accent-light transition-colors hover:text-primary"
            >
              ← Quay lại trang chủ
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
