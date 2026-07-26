import { Building2, ChartNoAxesCombined, ClipboardList, UsersRound } from "lucide-react";
import Link from "next/link";

import { ApiHealthCard } from "@/components/ApiHealthCard";
import { AdminIdentity } from "@/components/AdminIdentity";

const modules = [
  {
    title: "Kho phòng",
    description: "Dữ liệu phòng và trạng thái xuất bản sẽ được quản lý tại đây.",
    icon: Building2,
  },
  {
    title: "Đội ngũ sale",
    description: "Phân công, theo dõi và bàn giao khách hàng ở Phase 5.",
    icon: UsersRound,
  },
  {
    title: "Hàng chờ duyệt",
    description: "Kiểm soát nội dung trước khi đồng bộ sang Public Web.",
    icon: ClipboardList,
  },
  {
    title: "Báo cáo vận hành",
    description: "Các chỉ số nguồn phòng, lượt liên hệ và hiệu suất sale.",
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
          <a className="nav-item active" href="#overview">
            Tổng quan
          </a>
          <Link className="nav-item" href="/rooms">Kho phòng</Link>
          <span className="nav-item muted">Sale workspace</span>
          <span className="nav-item muted">Phân quyền</span>
        </nav>
        <div>
          <AdminIdentity />
          <p className="phase-label">Rooms CRUD / Slice 3</p>
        </div>
      </aside>

      <section className="workspace" id="overview">
        <header className="topbar">
          <div>
            <p className="eyebrow">Trung tâm vận hành</p>
            <h2>Nền móng đã sẵn sàng.</h2>
          </div>
          <span className="environment">Development</span>
        </header>

        <div className="intro-grid">
          <article className="statement">
            <p className="index">01 / Foundation</p>
            <h3>Một không gian riêng cho admin và sale.</h3>
            <p>
              Portal này là ứng dụng độc lập với Public Web. Mọi nghiệp vụ sẽ đi qua
              FastAPI và typed contract thay vì truy cập database trực tiếp.
            </p>
          </article>
          <ApiHealthCard />
        </div>

        <section aria-labelledby="module-title" className="modules">
          <div className="section-heading">
            <p className="eyebrow">Bản đồ chức năng</p>
            <h3 id="module-title">Những module sẽ được mở dần</h3>
          </div>
          <div className="module-grid">
            {modules.map(({ title, description, icon: Icon }, index) => (
              <article className="module-card" key={title}>
                <div className="module-meta">
                  <span>0{index + 1}</span>
                  <Icon aria-hidden="true" size={20} strokeWidth={1.8} />
                </div>
                <h4>{title}</h4>
                <p>{description}</p>
                <span className="planned">Planned</span>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
