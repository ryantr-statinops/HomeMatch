"use client";

import { useState } from "react";
import type { Room, RoomImage } from "@/types/room";
import RoomGallery from "@/components/room/RoomGallery";
import RoomInfo from "@/components/room/RoomInfo";
import RoomAmenities from "@/components/room/RoomAmenities";
import ContactButton from "@/components/shared/ContactButton";
import { Copy, Check } from "lucide-react";

const AMENITY_LABELS: Record<keyof Room["amenities"], string> = {
  mayLanh: "Máy lạnh",
  tuLanh: "Tủ lạnh",
  keBep: "Kệ bếp",
  cuaSo: "Cửa sổ",
  thangMay: "Thang máy",
  deXe: "Để xe",
  nhaVS: "Nhà vệ sinh",
  banCong: "Ban công",
  gac: "Gác",
  mayGiat: "Máy giặt",
  thuCung: "Thú cưng",
  xeDien: "Xe điện",
};

function formatPrice(price: number): string {
  return price.toLocaleString("vi-VN") + "đ";
}

function formatCost(cost: number, unit: string): string {
  if (!cost) return "—";
  return cost.toLocaleString("vi-VN") + unit;
}

function buildRoomText(room: Room): string {
  const lines: string[] = [];

  lines.push("HomeMatch - Thông tin phòng");
  lines.push("━".repeat(30));
  lines.push(`📌 ID: ${room.id}`);
  lines.push(
    `📍 Địa chỉ: ${[room.address.duong, room.address.phuong, room.address.khuVuc]
      .filter(Boolean)
      .join(", ")}`,
  );
  lines.push(`💰 Giá: ${formatPrice(room.price)}/tháng`);
  if (room.area) lines.push(`📐 Diện tích: ${room.area}m²`);
  if (room.contractType) lines.push(`📋 Hợp đồng: ${room.contractType}`);
  if (room.floor) lines.push(`🏢 Tầng: ${room.floor}`);
  lines.push(
    `📊 Trạng thái: ${room.status === "ACTIVE" ? "Còn trống" : "Đã thuê"}`,
  );

  const activeAmenities = Object.entries(room.amenities)
    .filter(([, v]) => v)
    .map(([k]) => AMENITY_LABELS[k as keyof typeof AMENITY_LABELS]);
  if (activeAmenities.length > 0) {
    lines.push("");
    lines.push(`🛠 Tiện ích: ${activeAmenities.join(", ")}`);
  }

  lines.push("");
  lines.push("💰 Chi phí khác:");
  lines.push(`  • Điện: ${formatCost(room.costs.dien, "đ/kWh")}`);
  lines.push(`  • Nước: ${formatCost(room.costs.nuoc, "đ/m³")}`);
  lines.push(`  • Phí QL: ${formatCost(room.costs.phiQuanLy, "đ")}`);
  lines.push(`  • Gửi xe: ${formatCost(room.costs.phiGiuXe, "đ")}`);

  if (room.description) {
    lines.push("");
    lines.push("📝 Mô tả:");
    lines.push(room.description);
  }

  if (room.rules.gioGiac || room.rules.thuCung !== undefined) {
    lines.push("");
    lines.push("📋 Quy định:");
    if (room.rules.gioGiac) lines.push(`  • Giờ giấc: ${room.rules.gioGiac}`);
    if (room.rules.thuCung !== undefined)
      lines.push(`  • Thú cưng: ${room.rules.thuCung ? "Được phép" : "Không được phép"}`);
  }

  return lines.join("\n");
}

type RoomDetailProps = {
  room: Room;
};

export default function RoomDetail({ room }: RoomDetailProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(buildRoomText(room));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  }

  // Dùng ảnh chính làm ảnh đầu tiên nếu gallery rỗng
  const galleryImages: RoomImage[] =
    room.images && room.images.length > 0
      ? room.images
      : room.image
        ? [{ id: "main", url: room.image, sortOrder: 0 }]
        : [];

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Gallery */}
      <div className="lg:col-span-3 animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '0ms' }}>
        <RoomGallery images={galleryImages} />
      </div>

      {/* Info + Amenities + CTA */}
      <div className="space-y-8 lg:col-span-2">
        <div className="animate-in fade-in slide-in-from-bottom-4" style={{ animationDelay: '100ms' }}>
          <RoomInfo room={room} />
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-4 border-t border-gray-100 pt-8" style={{ animationDelay: '200ms' }}>
          <RoomAmenities amenities={room.amenities} />
        </div>

        {/* Copy + Contact */}
        <div className="animate-in fade-in slide-in-from-bottom-4 space-y-3" style={{ animationDelay: '300ms' }}>
          <button
            onClick={handleCopy}
            className={`flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all active:scale-[0.98] ${
              copied
                ? "bg-green-50 text-green-700"
                : "border border-accent-light/20 bg-white text-accent-light hover:border-accent-light/40 hover:text-accent"
            }`}
          >
            {copied ? (
              <>
                <Check size={16} />
                Đã copy thông tin phòng
              </>
            ) : (
              <>
                <Copy size={16} />
                Sao chép thông tin phòng
              </>
            )}
          </button>

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
    </div>
  );
}
