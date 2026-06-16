/**
 * roommate.service.ts — Service gọi API ở ghép.
 *
 * Gọi Google Apps Script API để lấy dữ liệu.
 * Khi chưa có API URL → trả về dữ liệu rỗng.
 */

import { apiRequest } from "@/lib/api-client";
import type { RoommatePost, RoommateFilterParams } from "@/types/roommate-post";

/** Lấy danh sách bài ở ghép */
export async function getRoommatePosts(
  params?: RoommateFilterParams,
): Promise<RoommatePost[]> {
  try {
    const result = await apiRequest<RoommatePost[]>("getRoommatePosts", {
      params: params as Record<string, string>,
    });
    return result;
  } catch {
    return [];
  }
}

/** Lấy chi tiết bài ở ghép */
export async function getRoommatePostById(
  id: string,
): Promise<RoommatePost | null> {
  try {
    const result = await apiRequest<RoommatePost>("getRoommatePostDetail", {
      params: { id },
    });
    return result;
  } catch {
    return null;
  }
}
