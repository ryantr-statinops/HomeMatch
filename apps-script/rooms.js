/**
 * rooms.js — Xử lý API endpoints cho phòng trọ
 *
 * Endpoints:
 *   getRooms      → Danh sách phòng (có filter)
 *   getRoomDetail → Chi tiết 1 phòng + hình ảnh
 *
 * Cập nhật theo cấu trúc Google Sheet thật (DATABASE_HomeMatch).
 */

/**
 * GET /rooms — Lấy danh sách phòng với bộ lọc.
 *
 * @param {Object} params
 * @param {string} [params.khuVuc] - Lọc theo khu vực
 * @param {string} [params.giaMin] - Giá tối thiểu
 * @param {string} [params.giaMax] - Giá tối đa
 * @param {string} [params.keyword] - Từ khoá tìm kiếm
 * @returns {Array}
 */
function handleGetRooms(params) {
  const rooms = readSheet("PHONGTRO");
  if (!rooms.length) return [];

  // Chỉ lấy phòng "Trống" (ACTIVE)
  let filtered = rooms.filter((r) => r.trangthai === "Trống");

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
      url: resolveImageUrl(img.hinhanh),
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
    image: resolveImageUrl(row.hinhanhchinh),
    address: {
      soNha: row.sonha || "",
      duong: row.duong || "",
      phuong: row.phuong || "",
      khuVuc: row.khuvuc || "",
    },
    price: Number(row.gia) || 0,
    area: 0, // Sheet không có cột DienTich
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

/**
 * Parse tiếng Việt "Có"/"Không" → boolean.
 * "Có", "Riêng", "Bãi để xe" → true
 * "Không", "" → false
 */
function parseBool(value) {
  if (!value) return false;
  const v = String(value).trim().toLowerCase();
  return v === "có" || v === "riêng" || v === "bãi để xe";
}

/**
 * Parse chi phí dạng "3.800đ/kWh" → number (3800).
 *
 * Cách hoạt động:
 * 1. Xoá dấu chấm (phân cách hàng nghìn): "25.000đ/m3" → "25000đ/m3"
 * 2. Chỉ lấy chữ số đầu tiên: /^\d+/ → "25000"
 * 3. Trả về số: 25000
 */
function parseCost(value) {
  if (!value) return 0;
  // Xoá dấu chấm trước, sau đó lấy phần số ở đầu chuỗi
  const noDots = String(value).replace(/\./g, "");
  const match = noDots.match(/^\d+/);
  return match ? Number(match[0]) : 0;
}

/**
 * Map TrangThai tiếng Việt → English.
 */
function mapStatus(status) {
  const map = {
    "trống": "ACTIVE",
    "đã thuê": "RENTED",
    "ẩn": "HIDDEN",
  };
  return map[String(status).toLowerCase().trim()] || String(status);
}

/**
 * Cache cho image URL (per-request).
 * key: original path, value: resolved URL
 */
var _imageUrlCache = {};

/**
 * Resolve giá trị ảnh từ Sheet thành URL công khai qua DriveApp.
 *
 * 1. Nếu đã là URL đầy đủ (http/https) → giữ nguyên.
 * 2. Nếu là path AppSheet (VD: "PHONGTRO_Images/xxx.jpg") →
 *    lấy tên file, tìm trong Drive folder bằng DriveApp.
 * 3. Nếu không tìm thấy → trả về giá trị gốc.
 *
 * Cần OAuth scope: https://www.googleapis.com/auth/drive.readonly
 *
 * @param {string} value - Giá trị từ Sheet (URL hoặc đường dẫn)
 * @returns {string} URL ảnh
 */
var IMAGE_FOLDER_ID = "1VIzgVkAuViOCMNdqVI1_7k8pjSHkVm2e";

function resolveImageUrl(value) {
  if (!value) return "";
  var str = String(value).trim();
  if (!str) return "";

  // Đã là URL đầy đủ → giữ nguyên
  if (str.indexOf("http://") === 0 || str.indexOf("https://") === 0) return str;

  // Cache hit
  if (_imageUrlCache[str] !== undefined) return _imageUrlCache[str];

  // Lấy tên file từ path (VD: "PHONGTRO_Images/xxx.jpg" → "xxx.jpg")
  var fileName = str.indexOf("/") >= 0 ? str.split("/").pop() : str;

  try {
    var folder = DriveApp.getFolderById(IMAGE_FOLDER_ID);
    var files = folder.getFilesByName(fileName);
    if (files.hasNext()) {
      var fileId = files.next().getId();
      var url = "https://drive.google.com/thumbnail?id=" + fileId + "&sz=w1000";
      _imageUrlCache[str] = url;
      return url;
    }
  } catch (e) {
    console.warn("resolveImageUrl: DriveApp error for", fileName, e.message);
  }

  console.warn("resolveImageUrl: No file found for", fileName);
  _imageUrlCache[str] = str;
  return str;
}
