import Link from "next/link";
import { Search, MessageCircle, FileCheck, ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionTitle from "@/components/shared/SectionTitle";
import ValueCard from "@/components/shared/ValueCard";
import { site } from "@/configs/site";
import { howItWorksSteps } from "@/constants/how-it-works";

export default function Home() {
  return (
    <>
      {/* ===== Hero Section ===== */}
      <section className="relative overflow-hidden bg-white pb-20 pt-16 md:pb-28 md:pt-24">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-accent md:text-5xl lg:text-6xl">
              Tìm phòng trọ phù hợp{" "}
              <span className="text-primary">dễ dàng hơn</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-accent-light md:text-xl">
              {site.description} — Không cần đăng ký, không rắc rối. Chỉ cần
              tìm phòng, bấm Zalo và để đội sale của chúng tôi hỗ trợ bạn.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/rooms"
                className="inline-flex h-9 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-base font-semibold text-white shadow-lg shadow-blue-200 transition-all hover:bg-primary-dark hover:shadow-xl"
              >
                Tìm phòng ngay
                <ArrowRight size={18} className="ml-1" />
              </Link>
              <Link
                href="/roommates"
                className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border-2 border-accent/10 px-8 text-base font-semibold text-accent transition-all hover:border-primary/30 hover:bg-blue-50"
              >
                Tìm người ở ghép
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ===== About Section ===== */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionTitle
            title={
              <>
                Về <span className="text-primary">{site.name}</span>
              </>
            }
            description="Chúng tôi là đội ngũ môi giới phòng trọ chuyên nghiệp tại TP. Hồ Chí Minh, giúp hàng ngàn sinh viên tìm được chỗ ở phù hợp mỗi năm."
          />

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <ValueCard
              icon={Search}
              title="Đa dạng phòng trọ"
              description="Hệ thống phòng trọ rộng khắp các quận tại TP. HCM, từ phòng bình dân đến cao cấp, phù hợp mọi nhu cầu và ngân sách."
            />
            <ValueCard
              icon={MessageCircle}
              title="Tư vấn qua Zalo"
              description="Kết nối trực tiếp với đội ngũ sale giàu kinh nghiệm qua Zalo. Được tư vấn miễn phí, không cam kết."
            />
            <ValueCard
              icon={FileCheck}
              title="Hỗ trợ ở ghép"
              description="Không chỉ tìm phòng, chúng tôi còn giúp bạn kết nối với những người bạn ở ghép tiềm năng, phù hợp tính cách và sở thích."
            />
          </div>
        </Container>
      </section>

      {/* ===== How It Works Section ===== */}
      <section className="bg-gray-50 py-16 md:py-24">
        <Container>
          <SectionTitle
            title="Cách hoạt động"
            description="Chỉ 5 bước đơn giản để tìm được phòng trọ hoặc bạn ở ghép ưng ý."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-3 lg:grid-cols-5">
            {howItWorksSteps.map((step, index) => (
              <div key={step.number} className="relative text-center">
                {/* Connector line */}
                {index < howItWorksSteps.length - 1 && (
                  <div className="absolute right-0 top-8 hidden h-0.5 w-full bg-blue-200 md:block" />
                )}
                {/* Number */}
                <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-primary bg-white text-2xl font-bold text-primary shadow-lg shadow-blue-200">
                  {step.number}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-accent">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-accent-light">
                  {step.description}
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
            <h2 className="relative text-3xl font-bold text-primary md:text-4xl">
              Sẵn sàng tìm phòng mới?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-base leading-relaxed text-primary">
              Đừng chần chừ! Hàng ngàn phòng trọ đang chờ bạn. Bấm Zalo ngay
              để đội sale tư vấn miễn phí.
            </p>
            <div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href={site.zaloUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-primary-dark hover:shadow-xl"
              >
                <MessageCircle size={20} />
                Chat Zalo ngay
              </a>
              <Link
                href="/rooms"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-primary px-8 py-3.5 text-base font-semibold text-primary transition-all hover:bg-blue-50"
              >
                Xem danh sách phòng
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
