"use client";

import { useState } from "react";
import { SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import type { RoomFilterParams } from "@/types/room";

type RoomFilterProps = {
  areas: string[];
  onFilter: (params: RoomFilterParams) => void;
};

export default function RoomFilter({ areas, onFilter }: RoomFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [khuVuc, setKhuVuc] = useState("");
  const [giaMax, setGiaMax] = useState("");
  const [dienTichMin, setDienTichMin] = useState("");
  const hasFilters = khuVuc || giaMax || dienTichMin;

  function applyFilters() {
    onFilter({
      khuVuc: khuVuc || undefined,
      giaMax: giaMax ? Number(giaMax) : undefined,
      dienTichMin: dienTichMin ? Number(dienTichMin) : undefined,
    });
  }

  function handleClear() {
    setKhuVuc("");
    setGiaMax("");
    setDienTichMin("");
    onFilter({});
  }

  const filterCount = [khuVuc, giaMax, dienTichMin].filter(Boolean).length;

  return (
    <div
      className={`overflow-hidden rounded-2xl bg-primary shadow-lg shadow-blue-200 transition-all duration-300 ${
        isOpen ? "" : "cursor-pointer hover:shadow-xl"
      }`}
      onClick={() => !isOpen && setIsOpen(true)}
    >
      {/* Collapsed state — Blue card */}
      {!isOpen && (
        <div className="flex items-center justify-between px-6 py-6 md:py-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white">
              <SlidersHorizontal size={20} />
            </div>
            <div>
              <p className="text-base font-semibold text-white md:text-lg">
                Tìm phòng trọ phù hợp
              </p>
              {hasFilters ? (
                <p className="mt-0.5 text-sm text-blue-200">
                  Đang lọc {filterCount} tiêu chí
                </p>
              ) : (
                <p className="mt-0.5 text-sm text-blue-200">
                  Bấm để mở bộ lọc
                </p>
              )}
            </div>
          </div>
          <ChevronDown size={20} className="text-white/70" />
        </div>
      )}

      {/* Expanded state — Filter panel */}
      {isOpen && (
        <div className="px-6 py-6 md:py-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-white" />
              <span className="text-base font-semibold text-white">Bộ lọc</span>
              {filterCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-primary">
                  {filterCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              {hasFilters && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleClear();
                  }}
                  className="text-sm text-blue-200 transition-colors hover:text-white"
                >
                  Xoá tất cả
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
                className="text-white/70 transition-colors hover:text-white"
              >
                <ChevronUp size={20} />
              </button>
            </div>
          </div>

          {/* Filter options */}
          <div className="mt-5 space-y-4">
            {/* Filter selects */}
            <div className="grid gap-3 sm:grid-cols-3">
              <select
                value={khuVuc}
                onChange={(e) => setKhuVuc(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white backdrop-blur-sm focus:border-white/40 focus:outline-none [&>option]:bg-primary [&>option]:text-white"
              >
                <option value="">Tất cả khu vực</option>
                {areas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>

              <select
                value={giaMax}
                onChange={(e) => setGiaMax(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white backdrop-blur-sm focus:border-white/40 focus:outline-none [&>option]:bg-primary [&>option]:text-white"
              >
                <option value="">Mọi mức giá</option>
                <option value="2000000">Dưới 2 triệu</option>
                <option value="3000000">Dưới 3 triệu</option>
                <option value="4000000">Dưới 4 triệu</option>
                <option value="5000000">Dưới 5 triệu</option>
                <option value="7000000">Dưới 7 triệu</option>
              </select>

              <select
                value={dienTichMin}
                onChange={(e) => setDienTichMin(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white backdrop-blur-sm focus:border-white/40 focus:outline-none [&>option]:bg-primary [&>option]:text-white"
              >
                <option value="">Mọi diện tích</option>
                <option value="15">Từ 15m²</option>
                <option value="20">Từ 20m²</option>
                <option value="25">Từ 25m²</option>
                <option value="30">Từ 30m²</option>
              </select>
            </div>

            {/* Apply button */}
            <div className="flex justify-end">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  applyFilters();
                  setIsOpen(false);
                }}
                className="rounded-xl bg-white px-6 py-2.5 text-sm font-semibold text-primary shadow-lg transition-all hover:bg-blue-50 hover:shadow-xl"
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
