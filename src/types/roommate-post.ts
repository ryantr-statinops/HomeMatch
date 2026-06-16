/** Thông tin khách hàng */
export type Customer = {
  name: string;
  phone: string;
  gender: string;
  school: string;
};

/** Kiểu bài đăng ở ghép (đồng bộ với API response) */
export type RoommatePost = {
  id: string;
  roomId: string;
  postType: "HAVE_ROOM" | "NEED_ROOMMATE";
  customer: Customer;
  budget: number;
  needCount: string;
  desiredArea: string;
  description: string;
  status: "ACTIVE" | "EXPIRED" | "CLOSED";
  expireAt: string;
  createdAt: string;
};

/** Kiểu params cho getRoommatePosts */
export type RoommateFilterParams = {
  postType?: string;
  gender?: string;
  khuVuc?: string;
};
