"use client";

import { useState, useEffect, useCallback } from "react";
import type { Room, RoomFilterParams } from "@/types/room";
import { getRooms, getDistinctAreas } from "@/services/room.service";
import RoomCard from "@/components/room/RoomCard";
import RoomFilter from "@/components/room/RoomFilter";
import EmptyState from "@/components/shared/EmptyState";
import { Loader2 } from "lucide-react";
import Link from "next/link";

type RoomListProps = {
  initialRooms?: Room[];
};

export default function RoomList({ initialRooms }: RoomListProps) {
  const [rooms, setRooms] = useState<Room[]>(initialRooms ?? []);
  const [areas, setAreas] = useState<string[]>([]);
  const [loading, setLoading] = useState(!initialRooms);
  const [filtering, setFiltering] = useState(false);

  useEffect(() => {
    if (!initialRooms) {
      loadRooms();
    }
    loadAreas();
  }, [initialRooms]);

  async function loadRooms(params?: RoomFilterParams) {
    try {
      setFiltering(true);
      const data = await getRooms(params);
      setRooms(data);
    } catch {
      // Error handled silently
    } finally {
      setLoading(false);
      setFiltering(false);
    }
  }

  async function loadAreas() {
    try {
      const data = await getDistinctAreas();
      setAreas(data);
    } catch {
      // Error handled silently
    }
  }

  const handleFilter = useCallback((params: RoomFilterParams) => {
    loadRooms(params);
  }, []);

  if (loading) {
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

      {filtering && (
        <div className="flex items-center justify-center py-4">
          <Loader2 size={20} className="animate-spin text-primary" />
          <span className="ml-2 text-sm text-accent-light">Đang lọc...</span>
        </div>
      )}

      {!filtering && rooms.length === 0 ? (
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
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}

      <p className="text-center text-xs text-accent-light">
        {!filtering && rooms.length > 0 && `Hiển thị ${rooms.length} phòng`}
      </p>
    </div>
  );
}
