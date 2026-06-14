/**
 * rooms.js — Xử lý API endpoints cho phòng trọ
 *
 * Endpoints:
 *   getRooms      → Danh sách phòng (có filter)
 *   getRoomDetail → Chi tiết 1 phòng + hình ảnh
 */

/**
 * GET /rooms — Lấy danh sách phòng với bộ lọc.
 *
 * @param {Object} params
 * @param {string} [params.khuVuc] - Lọc theo khu vực
 * @param {string} [params.giaMin] - Giá tối thiểu
 * @param {string} [params.giaMax] - Giá tối đa
 * @param {string} [params.dienTichMin] - Diện tích tối thiểu
 * @param {string} [params.keyword] - Từ khoá tìm kiếm
 * @returns {Array}
 */
function handleGetRooms(params) {
  const rooms = readSheet("PHONGTRO");
  if (!rooms.length) return [];

  // Chỉ lấy phòng ACTIVE
  let filtered = rooms.filter((r) => r.trangthai === "ACTIVE");

  // Lọc theo khu vực
  if (params?.khuVuc) {
    const kv = params.khuVuc.toLowerCase().trim();
    filtered = filtered.filter(
      (r) => r.khuvuc && r.khuvuc.toLowerCase().includes(kv),
    );
  }

  // Lọc theo giá
  if (params?.giaMin) {
    const min = Number(params.giaMin);
    filtered = filtered.filter((r) => Number(r.gia) >= min);
  }
  if (params?.giaMax) {
    const max = Number(params.giaMax);
    filtered = filtered.filter((r) => Number(r.gia) <= max);
  }

  // Lọc theo diện tích
  if (params?.dienTichMin) {
    const minDt = Number(params.dienTichMin);
    filtered = filtered.filter((r) => Number(r.dientich) >= minDt);
  }

  // Tìm kiếm theo từ khoá (địa chỉ, mô tả)
  if (params?.keyword) {
    const kw = params.keyword.toLowerCase().trim();
    filtered = filtered.filter((r) => {
      return (
        (r.duong && r.duong.toLowerCase().includes(kw)) ||
        (r.phuong && r.phuong.toLowerCase().includes(kw)) ||
        (r.khuvuc && r.khuvuc.toLowerCase().includes(kw)) ||
        (r.tienich && r.tienich.toLowerCase().includes(kw))
      );
    });
  }

  // Map response
  return filtered.map(mapRoom);
}

/**
 * GET /rooms/:id — Lấy chi tiết phòng + danh sách ảnh.
 *
 * @param {Object} params
 * @param {string} params.id - Mã phòng (IDPhong)
 * @returns {Object | null}
 */
function handleGetRoomDetail(params) {
  const room = readRowByColumn("PHONGTRO", "IDPhong", params?.id);
  if (!room) return null;

  // Lấy danh sách hình ảnh của phòng
  const allImages = readSheet("HINHANH");
  const images = allImages
    .filter((img) => img.idphong === params.id)
    .sort((a, b) => (Number(a.sortorder) || 0) - (Number(b.sortorder) || 0))
    .map((img) => ({
      id: img.idanh,
      url: img.hinhanh,
      sortOrder: img.sortorder,
    }));

  return {
    ...mapRoom(room),
    images,
  };
}

/**
 * Map dòng dữ liệu PHONGTRO → response object.
 */
function mapRoom(row) {
  return {
    id: row.idphong,
    image: row.hinhanhchinh || "",
    address: {
      soNha: row.sonha || "",
      duong: row.duong || "",
      phuong: row.phuong || "",
      khuVuc: row.khuvuc || "",
    },
    price: Number(row.gia) || 0,
    area: Number(row.dientich) || 0,
    contractType: row.hopdong || "",
    amenities: {
      mayLanh: !!row.maylanh,
      keBep: !!row.kebep,
      gac: !!row.gac,
      tuLanh: !!row.tulanh,
      nhaVS: !!row.nhavs,
      cuaSo: !!row.cuaso,
      deXe: !!row.dexe,
      thuCung: !!row.thucung,
      xeDien: !!row.xedien,
      mayGiat: !!row.maygiat,
    },
    rules: {
      gioGiac: row.giogiac || "",
      thuCung: !!row.thucung,
    },
    costs: {
      dien: Number(row.dien) || 0,
      nuoc: Number(row.nuoc) || 0,
      phiQuanLy: Number(row.phiquanly) || 0,
      phiGiuXe: Number(row.phigiuxe) || 0,
    },
    description: row.tienich || "",
    status: row.trangthai || "",
    slug: row.slug || "",
  };
}
