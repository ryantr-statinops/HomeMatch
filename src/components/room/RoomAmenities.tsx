import type { RoomAmenities as RoomAmenitiesType } from "@/types/room";
import {
  Snowflake,
  ChefHat,
  Refrigerator,
  Sun,
  ArrowUpFromLine,
  Car,
  Wind,
  DoorOpen,
  PawPrint,
  Bike,
  Sparkles,
  Tv,
} from "lucide-react";

type AmenityEntry = {
  key: keyof RoomAmenitiesType;
  label: string;
  icon: React.ReactNode;
};

const AMENITIES: AmenityEntry[] = [
  { key: "mayLanh", label: "Máy lạnh", icon: <Snowflake size={16} /> },
  { key: "tuLanh", label: "Tủ lạnh", icon: <Refrigerator size={16} /> },
  { key: "keBep", label: "Kệ bếp", icon: <ChefHat size={16} /> },
  { key: "cuaSo", label: "Cửa sổ", icon: <Sun size={16} /> },
  { key: "thangMay", label: "Thang máy", icon: <ArrowUpFromLine size={16} /> },
  { key: "deXe", label: "Để xe", icon: <Car size={16} /> },
  { key: "nhaVS", label: "Nhà vệ sinh", icon: <DoorOpen size={16} /> },
  { key: "banCong", label: "Ban công", icon: <Wind size={16} /> },
  { key: "gac", label: "Gác", icon: <Sparkles size={16} /> },
  { key: "mayGiat", label: "Máy giặt", icon: <Sparkles size={16} /> },
  { key: "thuCung", label: "Thú cưng", icon: <PawPrint size={16} /> },
  { key: "xeDien", label: "Xe điện", icon: <Bike size={16} /> },
];

type RoomAmenitiesProps = {
  amenities: RoomAmenitiesType;
};

export default function RoomAmenities({ amenities }: RoomAmenitiesProps) {
  const available = AMENITIES.filter((a) => amenities[a.key]);

  if (available.length === 0) return null;

  return (
    <section>
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-accent-light">
        Tiện ích
      </h3>
      <div className="flex flex-wrap gap-2">
        {available.map((item) => (
          <span
            key={item.key}
            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-primary"
          >
            {item.icon}
            {item.label}
          </span>
        ))}
      </div>
    </section>
  );
}
