/**
 * roommate.service.ts — Service gọi API ở ghép.
 * Mock data khi chưa có API URL.
 */

import { apiRequest } from "@/lib/api-client";
import type { RoommatePost, RoommateFilterParams } from "@/types/roommate-post";

/** Mock data */
const mockPosts: RoommatePost[] = [
  {
    id: "POST001",
    roomId: "ROOM001",
    postType: "HAVE_ROOM",
    customer: { name: "Nguyễn Văn A", phone: "0901234567", gender: "nam", school: "ĐH KHTN" },
    budget: 1_500_000,
    description: "Mình đang thuê phòng 3tr ở Q7. Phòng rộng 25m², có máy lạnh. Cần tìm 1 bạn ở ghép chia sẻ chi phí. Thân thiện, hoà đồng.",
    status: "ACTIVE",
    expireAt: "2026-07-01",
    createdAt: "2026-06-14",
  },
  {
    id: "POST002",
    roomId: "ROOM003",
    postType: "NEED_ROOMMATE",
    customer: { name: "Trần Thị B", phone: "0909876543", gender: "nữ", school: "ĐH Sư Phạm" },
    budget: 2_500_000,
    description: "Mình và 1 bạn nữ nữa muốn thuê chung 1 phòng ở Thủ Đức. Ngân sách ~2.5tr/người. Mong tìm được bạn nữ ở ghép cùng.",
    status: "ACTIVE",
    expireAt: "2026-06-28",
    createdAt: "2026-06-12",
  },
  {
    id: "POST003",
    roomId: "ROOM004",
    postType: "HAVE_ROOM",
    customer: { name: "Lê Văn C", phone: "0905555777", gender: "nam", school: "ĐH Bách Khoa" },
    budget: 3_000_000,
    description: "Có phòng Q1, 35m², full nội thất. Cần 1 bạn ở ghép. Gần ĐH Bách Khoa, ĐH Y Dược.",
    status: "ACTIVE",
    expireAt: "2026-07-05",
    createdAt: "2026-06-10",
  },
];

/** Lọc mock data */
function filterMockPosts(params?: RoommateFilterParams): RoommatePost[] {
  let filtered = [...mockPosts];

  if (params?.postType) {
    filtered = filtered.filter(
      (p) => p.postType === params.postType!.toUpperCase(),
    );
  }
  if (params?.gender) {
    const g = params.gender.toLowerCase();
    filtered = filtered.filter((p) => p.customer.gender.toLowerCase() === g);
  }

  return filtered;
}

/** Lấy danh sách bài ở ghép */
export async function getRoommatePosts(
  params?: RoommateFilterParams,
): Promise<RoommatePost[]> {
  try {
    const result = await apiRequest<RoommatePost[]>("getRoommatePosts", {
      params: params as Record<string, string>,
    });
    return result;
  } catch (err) {
    if (err instanceof Error && err.message === "API_URL_NOT_CONFIGURED") {
      return filterMockPosts(params);
    }
    throw err;
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
  } catch (err) {
    if (err instanceof Error && err.message === "API_URL_NOT_CONFIGURED") {
      return mockPosts.find((p) => p.id === id) ?? null;
    }
    throw err;
  }
}
