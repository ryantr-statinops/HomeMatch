import Link from "next/link";
import { MapPin, Square, Zap, ArrowRight } from "lucide-react";
import type { Room } from "@/types/room";
import { routes } from "@/constants/routes";

type RoomCardProps = {
  room: Room;
};

/** Format tiền tệ VND */
function formatPrice(price: number): string {
  if (price >= 1_000_000) {
    return `${(price / 1_000_000).toFixed(price % 1_000_000 === 0 ? 0 : 1)} tr`;
  }
  return price.toLocaleString("vi-VN") + "đ";
}

export default function RoomCard({ room }: RoomCardProps) {
  return (
    <Link
      href={routes.roomDetail(room.id)}
      className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:shadow-lg hover:shadow-blue-100"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {room.image ? (
          <img
            src={room.image}
            alt={room.address.duong}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-accent-light">
            No image
          </div>
        )}
        {/* Price badge */}
        <div className="absolute bottom-3 left-3 rounded-lg bg-primary px-3 py-1 text-sm font-bold text-white shadow-lg">
          {formatPrice(room.price)}/tháng
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2 p-4">
        <div className="flex items-start gap-1.5 text-sm text-accent-light">
          <MapPin size={14} className="mt-0.5 shrink-0 text-primary" />
          <span className="line-clamp-1">
            {room.address.duong}, {room.address.khuVuc}
          </span>
        </div>

        <div className="flex items-center gap-4 text-sm text-accent-light">
          <span className="flex items-center gap-1">
            <Square size={14} className="text-primary" />
            {room.area}m²
          </span>
          {room.amenities.mayLanh && (
            <span className="flex items-center gap-1">
              <Zap size={14} className="text-primary" />
              Máy lạnh
            </span>
          )}
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs font-medium text-accent-light">
            {room.contractType}
          </span>
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2">
            Xem chi tiết
            <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
