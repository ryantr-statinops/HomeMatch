import type { Room } from "@/types/room";
import {
  MapPin,
  Building2,
  Calendar,
  Zap,
  Droplets,
  ClipboardList,
  Clock,
  PawPrint,
} from "lucide-react";

type RoomInfoProps = {
  room: Room;
};

function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + "đ";
}

function formatCost(cost: number, unit: string): string {
  if (!cost) return "—";
  return cost.toLocaleString("vi-VN") + unit;
}

export default function RoomInfo({ room }: RoomInfoProps) {
  const addressParts = [
    room.address.duong,
    room.address.phuong,
    room.address.khuVuc,
  ].filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Price */}
      <div>
        <span className="text-3xl text-primary">
          {formatPrice(room.price)}
        </span>
        <span className="ml-1 text-base text-accent-light">/tháng</span>
      </div>

      {/* Loai phong + Area */}
      {(room.loaiPhong || room.area > 0) && (
        <div className="flex flex-wrap items-center gap-3">
          {room.loaiPhong && (
            <span className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              {room.loaiPhong}
            </span>
          )}
          {room.area > 0 && (
            <span className="text-sm text-accent">
              {room.area} m²
            </span>
          )}
        </div>
      )}

      {/* Address */}
      <div className="flex items-start gap-2 text-accent-light">
        <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
        <span className="text-sm">{addressParts.join(", ")}</span>
      </div>

      {/* Contract + Floor */}
      <div className="flex flex-wrap gap-4 text-sm text-accent-light">
        {room.floor && (
          <span className="flex items-center gap-1.5">
            <Building2 size={16} className="text-primary" />
            {room.floor}
          </span>
        )}
        {room.contractType && (
          <span className="flex items-center gap-1.5">
            <Calendar size={16} className="text-primary" />
            {room.contractType}
          </span>
        )}
      </div>

      {/* Costs */}
      <div className="rounded-xl bg-gray-50 p-4">
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-accent-light">
          Chi phí khác
        </h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-amber-500" />
            <span className="text-accent-light">Điện:</span>
            <span className="font-medium text-accent">
              {formatCost(room.costs.dien, "đ/kWh")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Droplets size={16} className="text-blue-500" />
            <span className="text-accent-light">Nước:</span>
            <span className="font-medium text-accent">
              {formatCost(room.costs.nuoc, "đ/m³")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ClipboardList size={16} className="text-gray-500" />
            <span className="text-accent-light">Phí QL:</span>
            <span className="font-medium text-accent">
              {formatCost(room.costs.phiQuanLy, "đ")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-500" />
            <span className="text-accent-light">Gửi xe:</span>
            <span className="font-medium text-accent">
              {formatCost(room.costs.phiGiuXe, "đ")}
            </span>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
            room.status === "ACTIVE"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              room.status === "ACTIVE" ? "bg-green-500" : "bg-red-500"
            }`}
          />
          {room.status === "ACTIVE" ? "Còn trống" : "Đã thuê"}
        </span>
      </div>

      {/* Description */}
      {room.description && (
        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent-light">
            Mô tả
          </h3>
          <p className="text-sm leading-relaxed text-accent">
            {room.description}
          </p>
        </div>
      )}

      {/* Rules */}
      <div>
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-accent-light">
          Quy định
        </h3>
        <div className="space-y-2 text-sm text-accent">
          {room.rules.gioGiac && (
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-accent-light" />
              <span className="text-accent-light">Giờ giấc:</span>
              <span className="font-medium">{room.rules.gioGiac}</span>
            </div>
          )}
          {room.rules.thuCung !== undefined && (
            <div className="flex items-center gap-2">
              <PawPrint size={16} className="text-accent-light" />
              <span className="text-accent-light">Thú cưng:</span>
              <span className="font-medium">
                {room.rules.thuCung ? "Được phép" : "Không được phép"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
