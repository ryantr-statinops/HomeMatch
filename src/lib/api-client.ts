/**
 * api-client.ts — Fetch wrapper cho Google Apps Script API.
 *
 * Gọi qua proxy server-side (/api/proxy) để tránh CORS.
 * Khi chưa có API URL → throw để service trả về dữ liệu rỗng.
 */

import { env } from "@/configs/env";

type RequestOptions = {
  params?: Record<string, string>;
  body?: unknown;
  method?: "GET" | "POST";
};

/**
 * Gọi Google Apps Script API thông qua proxy nội bộ.
 * - GET: /api/proxy?action=getRooms&khuVuc=Q1
 * - POST: /api/proxy với body JSON
 */
export async function apiRequest<T>(
  action: string,
  options: RequestOptions = {},
): Promise<T> {
  const baseUrl = env.apiUrl;

  // Nếu chưa có API URL → throw
  if (!baseUrl) {
    throw new Error("API_URL_NOT_CONFIGURED");
  }

  const { params, body, method = body ? "POST" : "GET" } = options;

  // Luôn gọi qua proxy nội bộ để tránh CORS
  let url = `/api/proxy?action=${encodeURIComponent(action)}`;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `&${searchParams.toString()}`;
  }

  const fetchOptions: RequestInit = { method };

  if (body) {
    fetchOptions.headers = { "Content-Type": "application/json" };
    fetchOptions.body = JSON.stringify({ action, ...body });
  }

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
