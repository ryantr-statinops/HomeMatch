import { supabase } from "@/lib/supabase/client";
import type { RoommatePost, RoommateFilterParams } from "@/types/roommate-post";
import { getRoomById } from "@/services/room.service";

type RoommateRow = Record<string, any>;

function mapPostType(kieuBaiDang: string | null | undefined): RoommatePost["postType"] {
  const map: Record<string, RoommatePost["postType"]> = {
    "looking_for_roommate": "HAVE_ROOM",
    "need_roommate_for_room": "NEED_ROOMMATE",
  };
  return map[String(kieuBaiDang || "").toLowerCase().trim()] || "NEED_ROOMMATE";
}

function parseBudget(value: string | null | undefined): number {
  if (!value) return 0;
  const cleaned = String(value).replace(/\./g, "").replace(/[^0-9]/g, " ");
  const nums = cleaned.split(/\s+/).filter(Boolean);
  return Number(nums[0]) || 0;
}

function mapRoommatePost(row: RoommateRow): RoommatePost {
  return {
    id: row.idbai || "",
    roomId: row.idphong || "",
    postType: mapPostType(row.kieubaidang),
    customer: {
      name: row.tenkhachhang || "",
      phone: row.sdtkhach || "",
      gender: row.gioitinh || "",
      school: row.schoolorwork || "",
    },
    budget: parseBudget(row.taichinh),
    needCount: row.songuoicantuyen || "",
    desiredArea: row.khuvucmongmuon || "",
    description: row.motanhucau || "",
    status: "ACTIVE",
    expireAt: row.thoihan || "",
    createdAt: row.ngaytao || "",
  };
}

export async function getRoommatePosts(
  params?: RoommateFilterParams,
): Promise<RoommatePost[]> {
  let query = supabase.from("roommate").select("*");

  query = query.eq("trangthai", "Đang hiển thị");
  query = query.or(`thoihan.is.null,thoihan.gte.${new Date().toISOString().split("T")[0]}`);

  if (params?.postType) {
    const pt = params.postType.toUpperCase().trim();
    query = query.ilike("kieubaidang", `%${pt}%`);
  }

  if (params?.gender) {
    const g = params.gender.toLowerCase().trim();
    query = query.ilike("gioitinh", `%${g}%`);
  }

  if (params?.khuVuc) {
    const kv = params.khuVuc.toLowerCase().trim();
    query = query.ilike("khuvucmongmuon", `%${kv}%`);
  }

  const { data, error } = await query;
  if (error) {
    console.error("getRoommatePosts error:", error);
    return [];
  }

  return (data || []).map(mapRoommatePost);
}

export async function getRoommatePostById(
  id: string,
): Promise<(RoommatePost & { room: Awaited<ReturnType<typeof getRoomById>> | null }) | null> {
  const { data: row, error } = await supabase
    .from("roommate")
    .select("*")
    .eq("idbai", id)
    .single();

  if (error || !row) return null;

  let room = null;
  if (row.idphong) {
    room = await getRoomById(row.idphong);
  }

  return {
    ...mapRoommatePost(row),
    room,
  };
}
