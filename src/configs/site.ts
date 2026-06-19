export const site = {
  name: "HomeMatch",
  description: "Nền tảng tìm phòng trọ và tìm người ở ghép dành cho sinh viên",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  language: "vi",
  zaloUrl: process.env.NEXT_PUBLIC_ZALO_URL ?? "",
} as const;
