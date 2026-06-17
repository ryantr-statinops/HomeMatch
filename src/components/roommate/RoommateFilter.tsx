"use client";

import { useState } from "react";
import { SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";
import type { RoommateFilterParams } from "@/types/roommate-post";

type RoommateFilterProps = {
  onFilter: (params: RoommateFilterParams) => void;
};

export default function RoommateFilter({ onFilter }: RoommateFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [postType, setPostType] = useState("");
  const [gender, setGender] = useState("");
  const [khuVuc, setKhuVuc] = useState("");

  const hasFilters = postType || gender || khuVuc;

  function applyFilters() {
    onFilter({
      postType: postType || undefined,
      gender: gender || undefined,
      khuVuc: khuVuc || undefined,
    });
  }

  function handleClear() {
    setPostType("");
    setGender("");
    setKhuVuc("");
    onFilter({});
  }

  const filterCount = [postType, gender, khuVuc].filter(Boolean).length;

  return (
    <div
      className={`overflow-hidden rounded-2xl bg-primary shadow-lg shadow-blue-200 transition-all duration-300 ${
        isOpen ? "" : "cursor-pointer hover:shadow-xl"
      }`}
      onClick={() => !isOpen && setIsOpen(true)}
    >
      {!isOpen && (
        <div className="flex items-center justify-between px-6 py-6 md:py-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white">
              <SlidersHorizontal size={20} />
            </div>
            <div>
              <p className="text-base font-semibold text-white md:text-lg">
                Tìm người ở ghép phù hợp
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

      {isOpen && (
        <div className="px-6 py-6 md:py-8">
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

          <div className="mt-5 space-y-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <select
                value={postType}
                onChange={(e) => setPostType(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white backdrop-blur-sm focus:border-white/40 focus:outline-none [&>option]:bg-primary [&>option]:text-white"
              >
                <option value="">Tất cả loại</option>
                <option value="HAVE_ROOM">Có phòng, cần tìm người</option>
                <option value="NEED_ROOMMATE">Cần người thuê chung</option>
              </select>

              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white backdrop-blur-sm focus:border-white/40 focus:outline-none [&>option]:bg-primary [&>option]:text-white"
              >
                <option value="">Tất cả giới tính</option>
                <option value="nam">Nam</option>
                <option value="nữ">Nữ</option>
              </select>

              <input
                value={khuVuc}
                onChange={(e) => setKhuVuc(e.target.value)}
                placeholder="Khu vực (VD: Quận 7)"
                className="w-full rounded-xl border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder-blue-200 backdrop-blur-sm focus:border-white/40 focus:outline-none"
              />
            </div>

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
