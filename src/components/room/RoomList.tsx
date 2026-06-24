"use client";

import { useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Room, RoomFilterParams } from "@/types/room";
import { getRooms, getDistinctAreas, filterRooms } from "@/services/room.service";
import RoomCard from "@/components/room/RoomCard";
import RoomFilter from "@/components/room/RoomFilter";
import EmptyState from "@/components/shared/EmptyState";
import { Loader2 } from "lucide-react";
import Link from "next/link";

export default function RoomList() {
  const [filterParams, setFilterParams] = useState<RoomFilterParams | undefined>();

  const {
    data: allRooms = [],
    isLoading,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: () => getRooms(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  const rooms = useMemo(() => filterRooms(allRooms, filterParams), [allRooms, filterParams]);

  const areas = useMemo(() => getDistinctAreas(allRooms), [allRooms]);

  const handleFilter = useCallback((params: RoomFilterParams) => {
    setFilterParams(params);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 size={24} className="animate-spin text-primary" />
        <span className="ml-2 text-sm text-accent-light">Đang tải...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <RoomFilter areas={areas} onFilter={handleFilter} />

      {rooms.length === 0 ? (
        <EmptyState
          title="Không tìm thấy phòng"
          description="Thử thay đổi bộ lọc hoặc tìm kiếm với từ khoá khác."
          action={
            <Link
              href="/rooms"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
            >
              Xoá tất cả bộ lọc
            </Link>
          }
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room, index) => (
            <div
              key={room.id}
              className="animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <RoomCard room={room} />
            </div>
          ))}
        </div>
      )}

      <p className="text-center text-xs text-accent-light">
        {rooms.length > 0 && `Hiển thị ${rooms.length} phòng`}
      </p>
    </div>
  );
}
