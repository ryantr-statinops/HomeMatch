/**
 * room.service.ts — Service gọi API phòng trọ.
 *
 * Khi chưa có API URL → dùng mock data.
 * Khi có API URL → tự động chuyển sang gọi API thật.
 */

import { apiRequest } from "@/lib/api-client";
import type { Room, RoomFilterParams } from "@/types/room";

/** Mock data — 6 phòng mẫu */
const mockRooms: Room[] = [
  {
    id: "ROOM001",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80",
    address: { soNha: "12A", duong: "Nguyễn Văn Linh", phuong: "Tân Phong", khuVuc: "Q7" },
    price: 3_000_000,
    area: 25,
    contractType: "Dài hạn",
    amenities: { mayLanh: true, keBep: true, gac: false, tuLanh: true, nhaVS: true, cuaSo: true, deXe: true, thuCung: false, xeDien: true, mayGiat: false },
    rules: { gioGiac: "Tự do", thuCung: false },
    costs: { dien: 3500, nuoc: 100000, phiQuanLy: 0, phiGiuXe: 100000 },
    description: "Phòng mới xây, thoáng mát, gần ĐH KHTN và ĐH RMIT. Khu vực an ninh, yên tĩnh.",
    status: "ACTIVE",
    slug: "phong-tro-q7-001",
    images: [
      { id: "ANH001", url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80", sortOrder: 1 },
      { id: "ANH002", url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80", sortOrder: 2 },
      { id: "ANH003", url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80", sortOrder: 3 },
    ],
  },
  {
    id: "ROOM002",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80",
    address: { soNha: "45", duong: "Lê Văn Sỹ", phuong: "Phường 12", khuVuc: "Q3" },
    price: 4_500_000,
    area: 30,
    contractType: "Dài hạn",
    amenities: { mayLanh: true, keBep: true, gac: true, tuLanh: true, nhaVS: true, cuaSo: true, deXe: true, thuCung: true, xeDien: true, mayGiat: true },
    rules: { gioGiac: "Tự do", thuCung: true },
    costs: { dien: 4000, nuoc: 100000, phiQuanLy: 200000, phiGiuXe: 150000 },
    description: "Phòng rộng, đầy đủ nội thất, gần trung tâm Q3. Thích hợp cho 2-3 người ở.",
    status: "ACTIVE",
    slug: "phong-tro-q3-001",
    images: [
      { id: "ANH004", url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80", sortOrder: 1 },
      { id: "ANH005", url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80", sortOrder: 2 },
    ],
  },
  {
    id: "ROOM003",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80",
    address: { soNha: "88", duong: "Võ Văn Ngân", phuong: "Bình Thọ", khuVuc: "Thủ Đức" },
    price: 2_500_000,
    area: 20,
    contractType: "Theo tháng",
    amenities: { mayLanh: true, keBep: false, gac: false, tuLanh: true, nhaVS: true, cuaSo: true, deXe: true, thuCung: false, xeDien: true, mayGiat: false },
    rules: { gioGiac: "23h đóng cửa", thuCung: false },
    costs: { dien: 3500, nuoc: 80000, phiQuanLy: 0, phiGiuXe: 100000 },
    description: "Phòng sạch sẽ, gần ĐH Sư Phạm Kỹ Thuật. Khu vực nhiều sinh viên.",
    status: "ACTIVE",
    slug: "phong-tro-thu-duc-001",
    images: [
      { id: "ANH006", url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=80", sortOrder: 1 },
    ],
  },
  {
    id: "ROOM004",
    image: "https://images.unsplash.com/photo-1564078516393-cf04bd96a897?w=600&q=80",
    address: { soNha: "20", duong: "Nguyễn Đình Chiểu", phuong: "Phường 6", khuVuc: "Q1" },
    price: 6_000_000,
    area: 35,
    contractType: "Dài hạn",
    amenities: { mayLanh: true, keBep: true, gac: true, tuLanh: true, nhaVS: true, cuaSo: true, deXe: true, thuCung: false, xeDien: true, mayGiat: true },
    rules: { gioGiac: "Tự do", thuCung: false },
    costs: { dien: 4000, nuoc: 120000, phiQuanLy: 300000, phiGiuXe: 200000 },
    description: "Phòng cao cấp, ngay trung tâm Q1. Full nội thất, thang máy, bảo vệ 24/7.",
    status: "ACTIVE",
    slug: "phong-tro-q1-001",
    images: [
      { id: "ANH007", url: "https://images.unsplash.com/photo-1564078516393-cf04bd96a897?w=600&q=80", sortOrder: 1 },
      { id: "ANH008", url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80", sortOrder: 2 },
      { id: "ANH009", url: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=80", sortOrder: 3 },
    ],
  },
  {
    id: "ROOM005",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80",
    address: { soNha: "7", duong: "Phạm Văn Đồng", phuong: "Linh Tây", khuVuc: "Thủ Đức" },
    price: 2_800_000,
    area: 22,
    contractType: "Theo tháng",
    amenities: { mayLanh: true, keBep: true, gac: false, tuLanh: false, nhaVS: true, cuaSo: true, deXe: true, thuCung: false, xeDien: true, mayGiat: false },
    rules: { gioGiac: "Tự do", thuCung: false },
    costs: { dien: 3500, nuoc: 80000, phiQuanLy: 0, phiGiuXe: 100000 },
    description: "Phòng gần chợ, gần trường ĐH, thích hợp cho sinh viên. Khu dân trí cao.",
    status: "ACTIVE",
    slug: "phong-tro-thu-duc-002",
  },
  {
    id: "ROOM006",
    image: "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=600&q=80",
    address: { soNha: "15", duong: "Lý Thường Kiệt", phuong: "Phường 14", khuVuc: "Q10" },
    price: 3_500_000,
    area: 28,
    contractType: "Dài hạn",
    amenities: { mayLanh: true, keBep: true, gac: true, tuLanh: true, nhaVS: true, cuaSo: true, deXe: true, thuCung: false, xeDien: true, mayGiat: true },
    rules: { gioGiac: "Tự do", thuCung: false },
    costs: { dien: 3800, nuoc: 100000, phiQuanLy: 150000, phiGiuXe: 100000 },
    description: "Phòng đẹp, gần ĐH Y Dược, ĐH Bách Khoa. Khu vực an ninh, nhiều tiện ích.",
    status: "ACTIVE",
    slug: "phong-tro-q10-001",
  },
];

/** Lọc mock data */
function filterMockRooms(params?: RoomFilterParams): Room[] {
  let filtered = [...mockRooms];

  if (params?.khuVuc) {
    const kv = params.khuVuc.toLowerCase();
    filtered = filtered.filter((r) => r.address.khuVuc.toLowerCase().includes(kv));
  }
  if (params?.giaMin) {
    filtered = filtered.filter((r) => r.price >= params.giaMin!);
  }
  if (params?.giaMax) {
    filtered = filtered.filter((r) => r.price <= params.giaMax!);
  }
  if (params?.dienTichMin) {
    filtered = filtered.filter((r) => r.area >= params.dienTichMin!);
  }
  if (params?.keyword) {
    const kw = params.keyword.toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.address.duong.toLowerCase().includes(kw) ||
        r.address.khuVuc.toLowerCase().includes(kw) ||
        r.description.toLowerCase().includes(kw),
    );
  }

  return filtered;
}

/**
 * Lấy danh sách phòng.
 * Nếu có API URL → gọi API thật, không → dùng mock data.
 */
export async function getRooms(params?: RoomFilterParams): Promise<Room[]> {
  try {
    const result = await apiRequest<Room[]>("getRooms", {
      params: params as Record<string, string>,
    });
    return result;
  } catch (err) {
    if (err instanceof Error && err.message === "API_URL_NOT_CONFIGURED") {
      return filterMockRooms(params);
    }
    throw err;
  }
}

/**
 * Lấy chi tiết phòng theo slug.
 * Duyệt qua danh sách để tìm phòng có slug khớp.
 *
 * TODO: Khi chuyển sang API thật, cần đổi param `id` từ slug → IDPhong.
 * API thật (rooms.js) mong đợi: ?id=ROOM001 (không phải slug).
 * Cần sửa thành:
 *   const room = mockRooms.find((r) => r.slug === slug);
 *   if (!room) throw new Error("Room not found");
 *   const result = await apiRequest<Room>("getRoomDetail", {
 *     params: { id: room.id },
 *   });
 */
export async function getRoomBySlug(slug: string): Promise<Room | null> {
  try {
    const result = await apiRequest<Room>("getRoomDetail", {
      params: { id: slug },
    });
    return result;
  } catch (err) {
    if (err instanceof Error && err.message === "API_URL_NOT_CONFIGURED") {
      return mockRooms.find((r) => r.slug === slug) ?? null;
    }
    throw err;
  }
}

/**
 * Lấy danh sách khu vực có phòng (cho filter).
 */
export async function getDistinctAreas(): Promise<string[]> {
  const rooms = await getRooms();
  const areas = [...new Set(rooms.map((r) => r.address.khuVuc))];
  return areas.sort();
}
