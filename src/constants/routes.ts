export const routes = {
  home: "/",
  rooms: "/rooms",
  roomDetail: (slug: string) => `/rooms/${slug}`,
  roommates: "/roommates",
  roommateDetail: (id: string) => `/roommates/${id}`,
} as const;
