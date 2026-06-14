import Container from "@/components/layout/Container";
import RoomList from "@/components/room/RoomList";
import { Home } from "lucide-react";
import Link from "next/link";

export default function RoomsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white pb-8 pt-8">
        <Container>
          <div className="flex items-center gap-2 text-sm text-accent-light">
            <Link href="/" className="transition-colors hover:text-primary">
              <Home size={14} />
            </Link>
            <span>/</span>
            <span className="text-primary">Danh sách phòng</span>
          </div>
          <h1 className="mt-2 text-3xl font-bold text-accent md:text-4xl">
            Tìm phòng trọ
          </h1>

        </Container>
      </section>

      {/* Room List */}
      <section className="py-8">
        <Container>
          <RoomList />
        </Container>
      </section>
    </div>
  );
}
