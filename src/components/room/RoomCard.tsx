import Link from "next/link";
import {
  MapPin,
  ArrowRight,
  Snowflake,
  ChefHat,
  Refrigerator,
  Sun,
  ArrowUpFromLine,
  Car,
  Zap,
  Droplets,
  Building2,
  Calendar,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import type { Room } from "@/types/room";
import { routes } from "@/constants/routes";

type RoomCardProps = {
  room: Room;
};

type AmenityEntry = {
  key: keyof Room["amenities"];
  label: string;
  icon: React.ReactNode;
};

const AMENITIES: AmenityEntry[] = [
  { key: "mayLanh", label: "Máy lạnh", icon: <Snowflake size={14} /> },
  { key: "tuLanh", label: "Tủ lạnh", icon: <Refrigerator size={14} /> },
  { key: "keBep", label: "Kệ bếp", icon: <ChefHat size={14} /> },
  { key: "cuaSo", label: "Cửa sổ", icon: <Sun size={14} /> },
  { key: "thangMay", label: "Thang máy", icon: <ArrowUpFromLine size={14} /> },
  { key: "deXe", label: "Để xe", icon: <Car size={14} /> },
];

/** Format tiền tệ VND */
function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + "đ";
}

/** Format chi phí điện/nước: 3800 → "3.800đ" */
function formatCost(cost: number, unit: string): string {
  if (!cost) return "—";
  return cost.toLocaleString("vi-VN") + unit;
}

/** Map trạng thái */
function formatStatus(status: string) {
  if (status === "ACTIVE") return { label: "Còn trống", color: "text-green-600", icon: CheckCircle2 };
  if (status === "RENTED") return { label: "Đã thuê", color: "text-red-500", icon: XCircle };
  return { label: status, color: "text-gray-400", icon: XCircle };
}

export default function RoomCard({ room }: RoomCardProps) {
  const status = formatStatus(room.status);

  return (
    <Link
      href={routes.roomDetail(room.id)}
      className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:shadow-lg hover:shadow-blue-100"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {room.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={room.image}
            alt={`${room.address.duong}, ${room.address.khuVuc}`}
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-accent-light">
            <Building2 size={40} />
          </div>
        )}

        {/* Address badge */}
        <div className="absolute bottom-3 left-3 right-3">
          <div className="inline-flex items-center gap-1.5 rounded-lg bg-black/60 px-3 py-1.5 text-xs text-white shadow-lg backdrop-blur-sm">
            <MapPin size={12} className="shrink-0" />
            <span className="line-clamp-1 font-medium">
              {room.address.duong}, {room.address.phuong ? `${room.address.phuong}, ` : ""}
              {room.address.khuVuc}
            </span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-3 p-4">
        {/* Price */}
        <div className="flex items-baseline gap-1">
          <span className="text-xl font-bold text-primary">
            {formatPrice(room.price)}
          </span>
          <span className="text-xs text-accent-light">/tháng</span>
        </div>

        {/* Floor + Contract */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-accent-light">
          {room.floor && (
            <span className="flex items-center gap-1">
              <Building2 size={13} className="text-primary" />
              {room.floor}
            </span>
          )}
          {room.contractType && (
            <span className="flex items-center gap-1">
              <Calendar size={13} className="text-primary" />
              {room.contractType}
            </span>
          )}
        </div>

        {/* Electricity + Water */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-accent-light">
          <span className="flex items-center gap-1">
            <Zap size={13} className="text-amber-500" />
            Điện: {formatCost(room.costs.dien, "đ/kWh")}
          </span>
          <span className="flex items-center gap-1">
            <Droplets size={13} className="text-blue-500" />
            Nước: {formatCost(room.costs.nuoc, "đ/m³")}
          </span>
        </div>

        {/* Status */}
        <div className="flex items-center gap-1">
          <status.icon size={14} className={status.color} />
          <span className={`text-xs font-medium ${status.color}`}>
            {status.label}
          </span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap items-center gap-2">
          {AMENITIES.map(
            (amenity) =>
              room.amenities[amenity.key] && (
                <span
                  key={amenity.key}
                  className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-[11px] font-medium text-primary"
                >
                  {amenity.icon}
                  {amenity.label}
                </span>
              ),
          )}
        </div>

        {/* CTA */}
        <div className="flex items-center justify-between pt-1">
          <span />
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2">
            Xem chi tiết
            <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}
