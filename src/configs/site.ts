export const site = {
  name: "HomeMatch",
  description: "Nền tảng tìm phòng trọ và tìm người ở ghép dành cho sinh viên",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  language: "vi",
  zaloUrl: process.env.NEXT_PUBLIC_ZALO_URL ?? "",
  phone: "0344997897",
  facebookUrl: "https://www.facebook.com/share/17pxYJint4/",
} as const;
