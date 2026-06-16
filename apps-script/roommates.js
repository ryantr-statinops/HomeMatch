/**
 * roommates.js — Xử lý API endpoints cho bài đăng ở ghép
 *
 * Endpoints:
 *   getRoommatePosts        → Danh sách ở ghép (có filter)
 *   getRoommatePostDetail   → Chi tiết 1 bài đăng
 *
 * Cập nhật theo cấu trúc Google Sheet thật (tab ROOMMATE).
 */

/**
 * GET /roommate-posts — Lấy danh sách bài ở ghép.
 *
 * @param {Object} params
 * @param {string} [params.postType] - LOOKING_FOR_ROOMMATE | NEED_ROOMMATE_FOR_ROOM
 * @param {string} [params.gender] - Lọc theo giới tính
 * @param {string} [params.khuVuc] - Lọc theo khu vực
 * @returns {Array}
 */
function handleGetRoommatePosts(params) {
  const posts = readSheet(SHEET_NAME.ROOMMATE);
  if (!posts.length) return [];

  // Chỉ lấy bài "Đang hiển thị" và chưa hết hạn
  const now = new Date();
  let filtered = posts.filter((p) => {
    const trangthai = String(p.trangthai || "").toLowerCase().trim();
    if (trangthai !== "đang hiển thị") return false;
    if (p.thoihan) {
      const expireDate = new Date(p.thoihan);
      if (expireDate < now) return false;
    }
    return true;
  });

  // Lọc theo loại bài đăng
  if (params?.postType) {
    const pt = params.postType.toUpperCase().trim();
    filtered = filtered.filter((p) => {
      const kb = String(p.kieubaidang || "").toUpperCase().trim();
      return kb === pt;
    });
  }

  // Lọc theo giới tính
  if (params?.gender) {
    const g = params.gender.toLowerCase().trim();
    filtered = filtered.filter(
      (p) => p.gioitinh && p.gioitinh.toLowerCase().includes(g),
    );
  }

  // Lọc theo khu vực (cần join với PHONGTRO để lấy khu vực)
  if (params?.khuVuc) {
    const kv = params.khuVuc.toLowerCase().trim();
    filtered = filtered.filter((p) => {
      if (p.idphong) {
        const room = readRowByColumn("PHONGTRO", "IDPhong", p.idphong);
        return room?.khuvuc?.toLowerCase().includes(kv);
      }
      // Fallback: lọc theo KhuVucMongMuon nếu có
      return (
        p.khuvucmongmuon && p.khuvucmongmuon.toLowerCase().includes(kv)
      );
    });
  }

  return filtered.map((p) => mapRoommatePost(p));
}

/**
 * GET /roommate-posts/:id — Lấy chi tiết bài ở ghép.
 *
 * @param {Object} params
 * @param {string} params.id - Mã bài đăng (IDBai)
 * @returns {Object | null}
 */
function handleGetRoommatePostDetail(params) {
  const post = readRowByColumn(SHEET_NAME.ROOMMATE, "IDBai", params?.id);
  if (!post) return null;

  // Lấy thông tin phòng liên kết
  let room = null;
  if (post.idphong) {
    room = readRowByColumn("PHONGTRO", "IDPhong", post.idphong);
  }

  return {
    ...mapRoommatePost(post),
    room: room ? mapRoom(room) : null,
  };
}

/**
 * Map dòng dữ liệu ROOMMATE → response object.
 */
function mapRoommatePost(row) {
  return {
    id: row.idbai,
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

/**
 * Map KieuBaiDang → PostType chuẩn.
 */
function mapPostType(kieuBaiDang) {
  const map = {
    "looking_for_roommate": "HAVE_ROOM",
    "need_roommate_for_room": "NEED_ROOMMATE",
  };
  const key = String(kieuBaiDang || "").toLowerCase().trim();
  return map[key] || key;
}

/**
 * Parse TaiChinh ("5.000.000 - 7.000.000") → số (lấy giá trị đầu).
 */
function parseBudget(value) {
  if (!value) return 0;
  const cleaned = String(value).replace(/\./g, "").replace(/[^0-9]/g, " ");
  const nums = cleaned.split(/\s+/).filter((n) => n.length > 0);
  return Number(nums[0]) || 0;
}
