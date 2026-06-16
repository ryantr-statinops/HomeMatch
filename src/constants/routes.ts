export const routes = {
  home: "/",
  rooms: "/rooms",
  roomDetail: (id: string) => `/rooms/${id}`,
  roommates: "/roommates",
  roommateDetail: (id: string) => `/roommates/${id}`,
} as const;
