import {
  ArrowRight,
  Building2,
  ChartNoAxesCombined,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import Link from "next/link";

import { AdminIdentity } from "@/components/AdminIdentity";
import { ApiHealthCard } from "@/components/ApiHealthCard";

const upcomingModules = [
  {
    title: "Sale workspace",
    description: "Phân công và theo dõi khách hàng trong cùng một luồng.",
    icon: UsersRound,
  },
  {
    title: "Báo cáo vận hành",
    description: "Tổng hợp hiệu suất phòng, liên hệ và đội ngũ sale.",
    icon: ChartNoAxesCombined,
  },
];

export default function AdminHome() {
  return (
    <main className="admin-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">HomeMatch</p>
          <h1>Operations</h1>
        </div>
        <nav aria-label="Điều hướng quản trị">
          <Link className="nav-item active" href="/">Tổng quan</Link>
          <Link className="nav-item" href="/rooms">Kho phòng</Link>
          <span className="nav-item muted">Sale workspace</span>
          <span className="nav-item muted">Phân quyền</span>
        </nav>
        <div>
          <AdminIdentity />
          <p className="phase-label">Rooms Read / Slice 4</p>
        </div>
      </aside>

      <section className="workspace dashboard-workspace">
        <header className="dashboard-header">
          <div>
            <p className="eyebrow">Trung tâm vận hành</p>
            <h2>Chào mừng trở lại.</h2>
            <p>Quản lý dữ liệu HomeMatch rõ ràng, an toàn và tập trung.</p>
          </div>
          <span className="secure-badge">
            <ShieldCheck aria-hidden="true" size={16} />
            Đã xác thực
          </span>
        </header>

        <section className="dashboard-hero" aria-labelledby="room-cta-title">
          <div className="dashboard-hero-copy">
            <span className="feature-label">Đang hoạt động</span>
            <h3 id="room-cta-title">Kho phòng đã sẵn sàng để kiểm tra.</h3>
            <p>
              Tìm kiếm, lọc trạng thái và đối chiếu dữ liệu phòng đang lưu trên
              môi trường hiện tại.
            </p>
            <Link className="primary-action" href="/rooms">
              <Building2 aria-hidden="true" size={19} />
              Mở Kho phòng
              <ArrowRight aria-hidden="true" size={18} />
            </Link>
          </div>
          <div className="dashboard-hero-mark" aria-hidden="true">
            <Building2 size={72} strokeWidth={1.35} />
            <span>Rooms / 01</span>
          </div>
        </section>

        <div className="dashboard-grid">
          <ApiHealthCard />

          <section className="upcoming-panel" aria-labelledby="upcoming-title">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Lộ trình</p>
                <h3 id="upcoming-title">Sắp mở tiếp theo</h3>
              </div>
              <span>02 modules</span>
            </div>

            <div className="upcoming-list">
              {upcomingModules.map(({ title, description, icon: Icon }) => (
                <article key={title}>
                  <Icon aria-hidden="true" size={21} />
                  <div>
                    <h4>{title}</h4>
                    <p>{description}</p>
                  </div>
                  <span className="planned">Planned</span>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
