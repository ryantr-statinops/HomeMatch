import { supabase } from "@/lib/supabase/client";
import type { Room, RoomImage, RoomFilterParams } from "@/types/room";

function parseBool(value: string | null | undefined): boolean {
  if (!value) return false;
  const v = String(value).trim().toLowerCase();
  return v === "có" || v === "riêng" || v === "bãi để xe";
}

function parseCost(value: string | null | undefined): number {
  if (!value) return 0;
  const noDots = String(value).replace(/\./g, "");
  const match = noDots.match(/^\d+/);
  return match ? Number(match[0]) : 0;
}

function mapStatus(status: string | null | undefined): Room["status"] {
  const map: Record<string, Room["status"]> = {
    "trống": "ACTIVE",
    "đã thuê": "RENTED",
    "ẩn": "HIDDEN",
  };
  return map[String(status).toLowerCase().trim()] || "HIDDEN";
}

type PhongTroRow = Record<string, any>;

function mapRoom(row: PhongTroRow): Room {
  return {
    id: row.idphong || "",
    image: row.hinhanhchinh || "",
    address: {
      soNha: row.sonha || "",
      duong: row.duong || "",
      phuong: row.phuong || "",
      khuVuc: row.khuvuc || "",
    },
    price: Number(row.gia) || 0,
    area: 0,
    contractType: row.hopdong || "",
    amenities: {
      mayLanh: parseBool(row.maylanh),
      keBep: parseBool(row.kebep),
      gac: parseBool(row.gac),
      tuLanh: parseBool(row.tulanh),
      nhaVS: parseBool(row.nhavs),
      cuaSo: parseBool(row.cuaso),
      banCong: parseBool(row.bancong),
      deXe: parseBool(row.dexe),
      thuCung: parseBool(row.thucung),
      xeDien: parseBool(row.xedien),
      mayGiat: parseBool(row.maygiat),
      thangMay: parseBool(row.thangmay),
    },
    rules: {
      gioGiac: row.giogiac || "",
      thuCung: parseBool(row.thucung),
    },
    floor: row.lau || "",
    costs: {
      dien: parseCost(row.dien),
      nuoc: parseCost(row.nuoc),
      phiQuanLy: parseCost(row.phiquanly),
      phiGiuXe: parseCost(row.phigiuxe),
    },
    description: row.tienich || "",
    status: mapStatus(row.trangthai),
    slug: row.slug || "",
  };
}

async function resolveImageUrls(paths: string[]): Promise<Map<string, string>> {
  const unique = [...new Set(paths.filter(Boolean))];
  const imagePaths = unique.filter(p => !p.startsWith("http"));
  if (imagePaths.length === 0) return new Map();

  const { data } = await supabase
    .from("imagecache")
    .select("path, drive_url")
    .in("path", imagePaths);

  const map = new Map<string, string>();
  if (data) {
    for (const entry of data) {
      map.set(entry.path, entry.drive_url);
    }
  }
  return map;
}

export async function getRooms(params?: RoomFilterParams): Promise<Room[]> {
  let query = supabase.from("phongtro").select("*");

  query = query.eq("trangthai", "Trống");

  if (params?.khuVuc) {
    const kv = params.khuVuc.toLowerCase().trim();
    query = query.ilike("khuvuc", `%${kv}%`);
  }

  if (params?.giaMin !== undefined) {
    query = query.gte("gia", params.giaMin);
  }

  if (params?.giaMax !== undefined) {
    query = query.lte("gia", params.giaMax);
  }

  if (params?.keyword) {
    const kw = params.keyword.toLowerCase().trim();
    query = query.or(
      `duong.ilike.%${kw}%,phuong.ilike.%${kw}%,khuvuc.ilike.%${kw}%,tienich.ilike.%${kw}%`,
    );
  }

  const { data, error } = await query;
  if (error) {
    console.error("getRooms error:", error);
    return [];
  }

  if (!data || data.length === 0) return [];

  const imagePaths = data.map((r: PhongTroRow) => r.hinhanhchinh);
  const cache = await resolveImageUrls(imagePaths);

  return data.map((row: PhongTroRow) => {
    const room = mapRoom(row);
    const resolved = cache.get(row.hinhanhchinh);
    if (resolved) room.image = resolved;
    return room;
  });
}

export async function getRoomById(id: string): Promise<Room | null> {
  const { data: row, error } = await supabase
    .from("phongtro")
    .select("*")
    .eq("idphong", id)
    .single();

  if (error || !row) return null;

  const cache = await resolveImageUrls([row.hinhanhchinh]);
  const room = mapRoom(row);
  const resolved = cache.get(row.hinhanhchinh);
  if (resolved) room.image = resolved;

  const { data: images } = await supabase
    .from("hinhanh")
    .select("*")
    .eq("idphong", id)
    .order("sortorder", { ascending: true });

  if (images && images.length > 0) {
    const galleryPaths = images.map((img: any) => img.hinhanh);
    const galleryCache = await resolveImageUrls(galleryPaths);

    room.images = images.map((img: any) => ({
      id: img.idanh,
      url: galleryCache.get(img.hinhanh) || img.hinhanh || "",
      sortOrder: img.sortorder || 0,
    }));
  }

  return room;
}

export function getDistinctAreas(rooms: Room[]): string[] {
  try {
    const areas = [...new Set(rooms.map((r) => r.address.khuVuc))];
    return areas.sort();
  } catch {
    return [];
  }
}

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

    if (params.amenities && params.amenities.length > 0) {
      const hasAll = params.amenities.every((key) => room.amenities[key]);
      if (!hasAll) return false;
    }

    return true;
  });
}
