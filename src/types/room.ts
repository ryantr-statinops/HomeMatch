/** Kiểu tiện ích phòng (đồng bộ với API response) */
export type RoomAmenities = {
  mayLanh: boolean;
  keBep: boolean;
  gac: boolean;
  tuLanh: boolean;
  nhaVS: boolean;
  cuaSo: boolean;
  banCong: boolean;
  deXe: boolean;
  thuCung: boolean;
  xeDien: boolean;
  mayGiat: boolean;
  thangMay: boolean;
};

/** Kiểu chi phí phòng */
export type RoomCosts = {
  dien: number;
  nuoc: number;
  phiQuanLy: number;
  phiGiuXe: number;
};

/** Kiểu địa chỉ phòng */
export type RoomAddress = {
  soNha: string;
  duong: string;
  phuong: string;
  khuVuc: string;
};

/** Kiểu hình ảnh phòng */
export type RoomImage = {
  id: string;
  url: string;
  sortOrder: number;
};

/** Kiểu phòng trọ (từ API) */
export type Room = {
  id: string;
  image: string;
  address: RoomAddress;
  price: number;
  area: number;
  contractType: string;
  amenities: RoomAmenities;
  rules: {
    gioGiac: string;
    thuCung: boolean;
  };
  costs: RoomCosts;
  description: string;
  status: "ACTIVE" | "RESERVED" | "RENTED" | "HIDDEN";
  slug: string;
  images?: RoomImage[];
};

/** Kiểu params cho getRooms */
export type RoomFilterParams = {
  keyword?: string;
  khuVuc?: string;
  giaMin?: number;
  giaMax?: number;
  dienTichMin?: number;
};
