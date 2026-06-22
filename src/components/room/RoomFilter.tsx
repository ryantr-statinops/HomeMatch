"use client";

import { useState } from "react";
import { Slider } from "@base-ui/react";
import {
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
  Snowflake,
  Refrigerator,
  ChefHat,
  Sun,
  ArrowUpFromLine,
  Car,
  DoorOpen,
  Wind,
  Sparkles,
  PawPrint,
  Bike,
} from "lucide-react";
import type { RoomFilterParams, RoomAmenities } from "@/types/room";

type AmenityOption = {
  key: keyof RoomAmenities;
  label: string;
  icon: React.ReactNode;
};

const AMENITIES: AmenityOption[] = [
  { key: "mayLanh", label: "Máy lạnh", icon: <Snowflake size={14} /> },
  { key: "tuLanh", label: "Tủ lạnh", icon: <Refrigerator size={14} /> },
  { key: "keBep", label: "Kệ bếp", icon: <ChefHat size={14} /> },
  { key: "cuaSo", label: "Cửa sổ", icon: <Sun size={14} /> },
  { key: "thangMay", label: "Thang máy", icon: <ArrowUpFromLine size={14} /> },
  { key: "deXe", label: "Để xe", icon: <Car size={14} /> },
  { key: "nhaVS", label: "Nhà vệ sinh", icon: <DoorOpen size={14} /> },
  { key: "banCong", label: "Ban công", icon: <Wind size={14} /> },
  { key: "gac", label: "Gác", icon: <Sparkles size={14} /> },
  { key: "mayGiat", label: "Máy giặt", icon: <Sparkles size={14} /> },
  { key: "thuCung", label: "Thú cưng", icon: <PawPrint size={14} /> },
  { key: "xeDien", label: "Xe điện", icon: <Bike size={14} /> },
];

const PRICE_MIN = 0;
const PRICE_MAX = 10_000_000;
const PRICE_STEP = 500_000;

function formatPrice(price: number): string {
  if (price >= 1_000_000) return (price / 1_000_000).toFixed(0) + "tr";
  if (price >= 1_000) return (price / 1_000).toFixed(0) + "k";
  return price.toString();
}

type RoomFilterProps = {
  areas: string[];
  onFilter: (params: RoomFilterParams) => void;
};

export default function RoomFilter({ areas, onFilter }: RoomFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [khuVuc, setKhuVuc] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([PRICE_MIN, PRICE_MAX]);
  const [areaOpen, setAreaOpen] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<Set<keyof RoomAmenities>>(new Set());

  function toggleAmenity(key: keyof RoomAmenities) {
    setSelectedAmenities((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  const hasAmenityFilter = selectedAmenities.size > 0;
  const hasFilters = khuVuc || priceRange[0] > PRICE_MIN || priceRange[1] < PRICE_MAX || hasAmenityFilter;

  function applyFilters() {
    onFilter({
      khuVuc: khuVuc || undefined,
      giaMin: priceRange[0] > PRICE_MIN ? priceRange[0] : undefined,
      giaMax: priceRange[1] < PRICE_MAX ? priceRange[1] : undefined,
      amenities: hasAmenityFilter ? [...selectedAmenities] : undefined,
    });
  }

  function handleClear() {
    setKhuVuc("");
    setPriceRange([PRICE_MIN, PRICE_MAX]);
    setSelectedAmenities(new Set());
    onFilter({});
  }

  const filterCount = [
    khuVuc,
    priceRange[0] > PRICE_MIN || priceRange[1] < PRICE_MAX,
    hasAmenityFilter,
  ].filter(Boolean).length;

  return (
    <div
      className={`overflow-hidden rounded-2xl bg-primary shadow-lg shadow-blue-200 transition-all duration-300 ${
        isOpen ? "" : "cursor-pointer hover:shadow-xl"
      }`}
      onClick={() => !isOpen && setIsOpen(true)}
    >
      {/* Collapsed state — Blue card */}
      {!isOpen && (
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white">
              <SlidersHorizontal size={15} />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                Tìm phòng trọ phù hợp
              </p>
              {hasFilters ? (
                <p className="mt-0.5 text-xs text-blue-200">
                  Đang lọc {filterCount} tiêu chí
                </p>
              ) : (
                <p className="mt-0.5 text-xs text-blue-200">
                  Bấm để mở bộ lọc
                </p>
              )}
            </div>
          </div>
          <ChevronDown size={16} className="text-white/70" />
        </div>
      )}

      {/* Expanded state — Filter panel */}
      {isOpen && (
        <div className="px-4 py-3">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <SlidersHorizontal size={15} className="text-white" />
              <span className="text-sm font-semibold text-white">Bộ lọc</span>
              {filterCount > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-primary">
                  {filterCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="text-white/70 transition-colors hover:text-white"
              >
                <ChevronUp size={16} />
              </button>
            </div>
          </div>

          {/* Filter options */}
          <div className="mt-3 space-y-4">
            {/* Filter selects */}
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="relative">
                <select
                  value={khuVuc}
                  onChange={(e) => {
                    setKhuVuc(e.target.value);
                    setAreaOpen(false);
                  }}
                  onBlur={() => setAreaOpen(false)}
                  onMouseDown={() => setAreaOpen(true)}
                  className="w-full appearance-none rounded-lg border border-white/20 bg-white/10 px-2.5 py-2 pr-7 text-xs text-white backdrop-blur-sm transition-all hover:border-white/40 focus:border-white/40 focus:outline-none [&>option]:bg-primary [&>option]:text-white"
                >
                  <option value="">Tất cả khu vực</option>
                  {areas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
                {areaOpen ? (
                  <ChevronUp size={14} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white transition-all" />
                ) : (
                  <ChevronDown size={14} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/60 transition-all" />
                )}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-white">
                Khoảng giá: {formatPrice(priceRange[0])} – {formatPrice(priceRange[1])}
              </label>
              <Slider.Root
                value={priceRange}
                onValueChange={(v) => setPriceRange([v[0], v[1]])}
                min={PRICE_MIN}
                max={PRICE_MAX}
                step={PRICE_STEP}
                className="relative flex w-full touch-none select-none items-center"
              >
                <Slider.Control className="relative flex w-full">
                  <Slider.Track className="relative h-1 w-full rounded-full bg-white/20">
                    <Slider.Indicator className="absolute h-full rounded-full bg-white" />
                    <Slider.Thumb
                      index={0}
                      className="block h-4 w-4 cursor-pointer rounded-full bg-white shadow transition hover:scale-110 active:scale-95"
                    />
                    <Slider.Thumb
                      index={1}
                      className="block h-4 w-4 cursor-pointer rounded-full bg-white shadow transition hover:scale-110 active:scale-95"
                    />
                  </Slider.Track>
                </Slider.Control>
              </Slider.Root>
              <div className="mt-1 flex justify-between text-[10px] text-blue-200">
                <span>0đ</span>
                <span>{formatPrice(PRICE_MAX)}</span>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-white">
                Tiện ích
              </label>
              <div className="flex flex-wrap gap-1.5">
                {AMENITIES.map((item) => {
                  const active = selectedAmenities.has(item.key);
                  return (
                    <button
                      key={item.key}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAmenity(item.key);
                      }}
                      className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1.5 text-[11px] font-medium transition-all ${
                        active
                          ? "border-white bg-white text-primary"
                          : "border-white/20 bg-white/10 text-white hover:border-white/40 hover:bg-white/20"
                      }`}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Apply + Clear buttons */}
            <div className="flex items-center justify-end gap-2">
              {hasFilters && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  className="rounded-lg border border-white/30 px-4 py-1.5 text-xs font-semibold text-white transition-all hover:border-white/50 hover:bg-white/10"
                >
                  Xoá tất cả
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  applyFilters();
                  setIsOpen(false);
                }}
                className="rounded-lg bg-white px-4 py-1.5 text-xs font-semibold text-primary shadow transition-all hover:bg-blue-50 hover:shadow-md"
              >
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
