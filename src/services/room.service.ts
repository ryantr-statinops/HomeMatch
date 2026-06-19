/**
 * room.service.ts — Service gọi API phòng trọ.
 *
 * Gọi Google Apps Script API để lấy dữ liệu.
 * Khi chưa có API URL → trả về dữ liệu rỗng.
 */

import { apiRequest } from "@/lib/api-client";
import type { Room, RoomFilterParams } from "@/types/room";

/**
 * Lấy danh sách phòng từ API.
 */
export async function getRooms(params?: RoomFilterParams): Promise<Room[]> {
  try {
    const result = await apiRequest<Room[]>("getRooms", {
      params: params as Record<string, string>,
    });
    return result;
  } catch {
    return [];
  }
}

/**
 * Lấy chi tiết phòng theo ID (IDPhong từ Google Sheet).
 * Gọi trực tiếp API getRoomDetail với id=IDPhong.
 */
export async function getRoomById(id: string): Promise<Room | null> {
  try {
    const result = await apiRequest<Room>("getRoomDetail", {
      params: { id },
    });
    return result;
  } catch {
    return null;
  }
}

/**
 * Lấy danh sách khu vực từ dữ liệu rooms (cho filter).
 * Pure function, không gọi API.
 */
export function getDistinctAreas(rooms: Room[]): string[] {
  try {
    const areas = [...new Set(rooms.map((r) => r.address.khuVuc))];
    return areas.sort();
  } catch {
    return [];
  }
}

/**
 * Lọc danh sách phòng trên client dựa vào filter params.
 * Pure function, không gọi API.
 */
export function filterRooms(rooms: Room[], params?: RoomFilterParams): Room[] {
  if (!params) return rooms;

  return rooms.filter((room) => {
    if (params.khuVuc) {
      const kv = params.khuVuc.toLowerCase().trim();
      if (!room.address.khuVuc.toLowerCase().includes(kv)) return false;
    }

    if (params.giaMin !== undefined && room.price < params.giaMin) return false;

    if (params.giaMax !== undefined && room.price > params.giaMax) return false;

    if (params.keyword) {
      const kw = params.keyword.toLowerCase().trim();
      const searchTarget = [
        room.address.duong,
        room.address.phuong,
        room.address.khuVuc,
        room.description,
      ]
        .join(" ")
        .toLowerCase();
      if (!searchTarget.includes(kw)) return false;
    }

    return true;
  });
}
