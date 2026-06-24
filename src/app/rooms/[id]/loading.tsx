import Container from "@/components/layout/Container";
import RoomDetailSkeleton from "@/components/room/RoomDetailSkeleton";

export default function RoomsDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white pb-6 pt-8">
        <Container>
          <div className="h-4 w-64 animate-pulse rounded bg-gray-200" />
          <div className="mt-3 h-7 w-96 animate-pulse rounded bg-gray-200" />
        </Container>
      </section>

      <section className="py-8">
        <Container>
          <RoomDetailSkeleton />
        </Container>
      </section>
    </div>
  );
}
