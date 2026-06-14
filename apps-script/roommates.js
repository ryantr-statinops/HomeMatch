/**
 * roommates.js — Xử lý API endpoints cho bài đăng ở ghép
 *
 * Endpoints:
 *   getRoommatePosts        → Danh sách ở ghép (có filter)
 *   getRoommatePostDetail   → Chi tiết 1 bài đăng
 */

/**
 * GET /roommate-posts — Lấy danh sách bài ở ghép.
 *
 * @param {Object} params
 * @param {string} [params.postType] - HAVE_ROOM | NEED_ROOMMATE
 * @param {string} [params.gender] - Lọc theo giới tính
 * @param {string} [params.khuVuc] - Lọc theo khu vực
 * @returns {Array}
 */
function handleGetRoommatePosts(params) {
  const posts = readSheet("ROOMMATE_POST");
  if (!posts.length) return [];

  // Chỉ lấy bài ACTIVE và chưa hết hạn
  const now = new Date();
  let filtered = posts.filter((p) => {
    if (p.status !== "ACTIVE") return false;
    if (p.expireat) {
      const expireDate = new Date(p.expireat);
      if (expireDate < now) return false;
    }
    return true;
  });

  // Lọc theo loại bài đăng
  if (params?.postType) {
    filtered = filtered.filter(
      (p) => p.posttype?.toUpperCase() === params.postType.toUpperCase(),
    );
  }

  // Lọc theo giới tính
  if (params?.gender) {
    const g = params.gender.toLowerCase().trim();
    filtered = filtered.filter(
      (p) => p.gender && p.gender.toLowerCase() === g,
    );
  }

  // Lọc theo khu vực (cần join với PHONGTRO để lấy khu vực)
  if (params?.khuVuc) {
    const kv = params.khuVuc.toLowerCase().trim();
    filtered = filtered.filter((p) => {
      // Nếu bài đăng đã có thông tin phòng, lọc theo khu vực phòng
      if (p.roomid) {
        const room = readRowByColumn("PHONGTRO", "IDPhong", p.roomid);
        return room?.khuvuc?.toLowerCase().includes(kv);
      }
      return false;
    });
  }

  return filtered.map((p) => mapRoommatePost(p));
}

/**
 * GET /roommate-posts/:id — Lấy chi tiết bài ở ghép.
 *
 * @param {Object} params
 * @param {string} params.id - Mã bài đăng (PostID)
 * @returns {Object | null}
 */
function handleGetRoommatePostDetail(params) {
  const post = readRowByColumn("ROOMMATE_POST", "PostID", params?.id);
  if (!post) return null;

  // Lấy thông tin phòng liên kết
  let room = null;
  if (post.roomid) {
    room = readRowByColumn("PHONGTRO", "IDPhong", post.roomid);
  }

  return {
    ...mapRoommatePost(post),
    room: room ? mapRoom(room) : null,
  };
}

/**
 * Map dòng dữ liệu ROOMMATE_POST → response object.
 */
function mapRoommatePost(row) {
  return {
    id: row.postid,
    roomId: row.roomid || "",
    postType: row.posttype || "",
    customer: {
      name: row.customername || "",
      phone: row.customerphone || "",
      gender: row.gender || "",
      school: row.school || "",
    },
    budget: Number(row.budget) || 0,
    description: row.description || "",
    status: row.status || "",
    expireAt: row.expireat || "",
    createdAt: row.createdat || "",
  };
}
