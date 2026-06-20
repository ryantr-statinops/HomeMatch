import { notFound } from "next/navigation";
import Container from "@/components/layout/Container";
import RoomDetail from "@/components/room/RoomDetail";
import { env } from "@/configs/env";
import type { Room } from "@/types/room";
import { routes } from "@/constants/routes";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

type RoomDetailPageProps = {
  params: Promise<{ id: string }>;
};

async function fetchRoomDetail(id: string): Promise<Room | null> {
  if (!env.apiUrl) return null;
  try {
    const url = `${env.apiUrl}?action=getRoomDetail&id=${encodeURIComponent(id)}`;
    const res = await fetch(url, {
      next: { revalidate: 60 },
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) return null;
    return res.json();
  } catch (e) {
    console.error("fetchRoomDetail error:", e);
    return null;
  }
}

export default async function RoomDetailPage({ params }: RoomDetailPageProps) {
  const { id } = await params;
  const room = await fetchRoomDetail(id);

  if (!room) {
    notFound();
  }

  const addressParts = [
    room.address.duong,
    room.address.phuong,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white pb-6 pt-8">
        <Container>
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-sm text-accent-light">
            <Link
              href="/"
              className="flex items-center gap-1 transition-colors hover:text-primary"
            >
              <Home size={14} />
              Trang chủ
            </Link>
            <ChevronRight size={12} />
            <Link
              href={routes.rooms}
              className="transition-colors hover:text-primary"
            >
              Danh sách phòng
            </Link>
            <ChevronRight size={12} />
            <span className="truncate text-primary">
              {addressParts || `Phòng #${room.id}`}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-3 text-2xl font-bold text-accent md:text-3xl">
            {addressParts
              ? `${addressParts} — ${room.address.khuVuc}`
              : `Phòng tại ${room.address.khuVuc}`}
          </h1>
        </Container>
      </section>

      {/* Detail Content */}
      <section className="py-8">
        <Container>
          <RoomDetail room={room} />
        </Container>
      </section>
    </div>
  );
}
