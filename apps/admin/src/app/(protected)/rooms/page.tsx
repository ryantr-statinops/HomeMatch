"use client";

import {
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  ImageOff,
  LoaderCircle,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useDeferredValue, useEffect, useState } from "react";

import { AdminIdentity } from "@/components/AdminIdentity";
import {
  type AdminRoom,
  type AdminRoomPage,
  fetchAdminRooms,
} from "@/lib/admin-api";
import { getSupabaseBrowserClient } from "@/lib/supabase";

const PAGE_SIZE = 12;
const emptyPage: AdminRoomPage = {
  data: [],
  meta: { page: 1, page_size: PAGE_SIZE, total: 0, total_pages: 0 },
};

function formatPrice(price: number | null | undefined) {
  if (price == null) {
    return "Chưa cập nhật";
  }
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(price);
}

function roomAddress(room: AdminRoom) {
  return [
    room.address.house_number,
    room.address.street,
    room.address.ward,
    room.address.area,
  ]
    .filter(Boolean)
    .join(", ");
}

export default function RoomsPage() {
  const [search, setSearch] = useState("");
  const deferredSearch = useDeferredValue(search.trim());
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [rooms, setRooms] = useState<AdminRoomPage>(emptyPage);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadRooms() {
      setIsLoading(true);
      setError(null);
      try {
        const { data } = await getSupabaseBrowserClient().auth.getSession();
        if (!data.session) {
          throw new Error("Phiên đăng nhập đã hết hạn.");
        }
        setRooms(
          await fetchAdminRooms(
            data.session.access_token,
            {
              search: deferredSearch || undefined,
              status: status || undefined,
              page,
              pageSize: PAGE_SIZE,
            },
            controller.signal,
          ),
        );
      } catch (loadError) {
        if (!controller.signal.aborted) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Không thể tải kho phòng.",
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadRooms();
    return () => controller.abort();
  }, [deferredSearch, page, status]);

  function updateSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  function updateStatus(value: string) {
    setStatus(value);
    setPage(1);
  }

  return (
    <main className="admin-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">HomeMatch</p>
          <h1>Operations</h1>
        </div>
        <nav aria-label="Điều hướng quản trị">
          <Link className="nav-item" href="/">Tổng quan</Link>
          <Link className="nav-item active" href="/rooms">Kho phòng</Link>
          <span className="nav-item muted">Sale workspace</span>
          <span className="nav-item muted">Phân quyền</span>
        </nav>
        <div>
          <AdminIdentity />
          <p className="phase-label">Rooms Read / Slice 4</p>
        </div>
      </aside>

      <section className="workspace rooms-workspace">
        <header className="rooms-header">
          <div>
            <p className="eyebrow">Kho dữ liệu</p>
            <h2>Kho phòng</h2>
            <p>Xem và kiểm tra dữ liệu phòng trên môi trường hiện tại.</p>
          </div>
          <span className="read-only-badge">Read only</span>
        </header>

        <section className="room-toolbar" aria-label="Bộ lọc phòng">
          <label className="room-search">
            <Search aria-hidden="true" size={18} />
            <span className="sr-only">Tìm phòng</span>
            <input
              onChange={(event) => updateSearch(event.target.value)}
              placeholder="Tìm mã phòng, đường hoặc khu vực..."
              type="search"
              value={search}
            />
          </label>
          <label>
            <span className="sr-only">Lọc trạng thái</span>
            <select
              onChange={(event) => updateStatus(event.target.value)}
              value={status}
            >
              <option value="">Tất cả trạng thái</option>
              <option value="ACTIVE">Đang trống</option>
              <option value="RENTED">Đã thuê</option>
              <option value="HIDDEN">Đang ẩn</option>
              <option value="ARCHIVED">Đã lưu trữ</option>
            </select>
          </label>
        </section>

        <div className="room-result-summary">
          <span>{rooms.meta.total} phòng</span>
          {isLoading && <LoaderCircle className="spin" size={18} />}
        </div>

        {error && (
          <div className="room-state error-state" role="alert">
            <CircleAlert aria-hidden="true" />
            <h3>Chưa thể tải kho phòng</h3>
            <p>{error}</p>
          </div>
        )}

        {!error && !isLoading && rooms.data.length === 0 && (
          <div className="room-state">
            <Search aria-hidden="true" />
            <h3>Không tìm thấy phòng</h3>
            <p>Thử thay đổi từ khóa hoặc trạng thái lọc.</p>
          </div>
        )}

        {!error && rooms.data.length > 0 && (
          <>
            <div className={`room-table-wrap ${isLoading ? "is-loading" : ""}`}>
              <table className="room-table">
                <thead>
                  <tr>
                    <th>Phòng</th>
                    <th>Địa chỉ</th>
                    <th>Giá thuê</th>
                    <th>Diện tích</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.data.map((room) => (
                    <tr key={room.id}>
                      <td>
                        <div className="room-identity-cell">
                          <div className="room-thumb">
                            {room.main_image_url ? (
                              // Drive URLs are external and not yet configured for next/image.
                              // eslint-disable-next-line @next/next/no-img-element
                              <img alt="" src={room.main_image_url} />
                            ) : (
                              <ImageOff aria-hidden="true" size={19} />
                            )}
                          </div>
                          <div>
                            <strong>{room.code || room.id}</strong>
                            <span>{room.room_type || "Chưa phân loại"}</span>
                          </div>
                        </div>
                      </td>
                      <td>{roomAddress(room) || "Chưa cập nhật"}</td>
                      <td className="room-price">{formatPrice(room.price)}</td>
                      <td>{room.area ? `${room.area} m²` : "—"}</td>
                      <td>
                        <span className={`status-pill status-${room.status.toLowerCase()}`}>
                          {room.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="room-mobile-list">
                {rooms.data.map((room) => (
                  <article className="room-mobile-card" key={room.id}>
                    <div className="room-mobile-heading">
                      <div>
                        <strong>{room.code || room.id}</strong>
                        <span>{room.room_type || "Chưa phân loại"}</span>
                      </div>
                      <span className={`status-pill status-${room.status.toLowerCase()}`}>
                        {room.status}
                      </span>
                    </div>
                    <p>{roomAddress(room) || "Chưa cập nhật địa chỉ"}</p>
                    <div className="room-mobile-meta">
                      <strong>{formatPrice(room.price)}</strong>
                      <span>{room.area ? `${room.area} m²` : "Chưa có diện tích"}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <nav className="room-pagination" aria-label="Phân trang kho phòng">
              <button
                disabled={page <= 1 || isLoading}
                onClick={() => setPage((current) => current - 1)}
                type="button"
              >
                <ChevronLeft aria-hidden="true" size={17} />
                Trước
              </button>
              <span>
                Trang {rooms.meta.page} / {Math.max(rooms.meta.total_pages, 1)}
              </span>
              <button
                disabled={page >= rooms.meta.total_pages || isLoading}
                onClick={() => setPage((current) => current + 1)}
                type="button"
              >
                Sau
                <ChevronRight aria-hidden="true" size={17} />
              </button>
            </nav>
          </>
        )}
      </section>
    </main>
  );
}
