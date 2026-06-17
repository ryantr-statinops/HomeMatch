import type { Room, RoomImage } from "@/types/room";
import RoomGallery from "@/components/room/RoomGallery";
import RoomInfo from "@/components/room/RoomInfo";
import RoomAmenities from "@/components/room/RoomAmenities";
import ContactButton from "@/components/shared/ContactButton";

type RoomDetailProps = {
  room: Room;
};

export default function RoomDetail({ room }: RoomDetailProps) {
  // Dùng ảnh chính làm ảnh đầu tiên nếu gallery rỗng
  const galleryImages: RoomImage[] =
    room.images && room.images.length > 0
      ? room.images
      : room.image
        ? [{ id: "main", url: room.image, sortOrder: 0 }]
        : [];

  return (
    <div className="space-y-8">
      {/* Gallery + Main Info */}
      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <RoomGallery images={galleryImages} />
        </div>
        <div className="lg:col-span-2">
          <RoomInfo room={room} />
        </div>
      </div>

      {/* Amenities */}
      <div className="border-t border-gray-100 pt-8">
        <RoomAmenities amenities={room.amenities} />
      </div>

      {/* Zalo CTA */}
      <div className="border-t border-gray-100 pt-8">
        <div className="rounded-xl bg-gradient-to-r from-blue-50 to-blue-100/50 p-6">
          <div className="mx-auto max-w-md text-center">
            <h3 className="text-lg font-bold text-primary">
              Quan tâm phòng này?
            </h3>
            <p className="mt-1 text-sm text-accent-light">
              Liên hệ ngay qua Zalo để được tư vấn và hẹn xem phòng trực tiếp.
            </p>
            <div className="mt-4">
              <ContactButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
