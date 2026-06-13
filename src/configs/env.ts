export const env = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "",
  zaloUrl: process.env.NEXT_PUBLIC_ZALO_URL ?? "",
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
} as const;
