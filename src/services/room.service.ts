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
 * Lấy chi tiết phòng theo slug.
 * Tra slug → IDPhong, rồi gọi API getRoomDetail.
 */
export async function getRoomBySlug(slug: string): Promise<Room | null> {
  try {
    // Lấy tất cả phòng để tìm ID từ slug
    const rooms = await getRooms();
    const room = rooms.find((r) => r.slug === slug);
    if (!room) return null;

    // Gọi API chi tiết với ID thật
    const result = await apiRequest<Room>("getRoomDetail", {
      params: { id: room.id },
    });
    return result;
  } catch {
    return null;
  }
}

/**
 * Lấy danh sách khu vực có phòng (cho filter).
 */
export async function getDistinctAreas(): Promise<string[]> {
  try {
    const rooms = await getRooms();
    const areas = [...new Set(rooms.map((r) => r.address.khuVuc))];
    return areas.sort();
  } catch {
    return [];
  }
}
