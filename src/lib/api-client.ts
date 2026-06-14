/**
 * api-client.ts — Fetch wrapper cho Google Apps Script API.
 *
 * Hỗ trợ mock data để phát triển Frontend song song với API.
 * Khi có URL thật, đổi NEXT_PUBLIC_API_URL trong .env.local là chạy.
 */

import { env } from "@/configs/env";

type RequestOptions = {
  params?: Record<string, string>;
  body?: unknown;
  method?: "GET" | "POST";
};

/**
 * Gọi Google Apps Script API.
 * - GET: ?action=getRooms&khuVuc=Q1
 * - POST: body JSON với { action, ...data }
 */
export async function apiRequest<T>(
  action: string,
  options: RequestOptions = {},
): Promise<T> {
  const baseUrl = env.apiUrl;

  // Nếu chưa có API URL → throw để service bắt và dùng mock
  if (!baseUrl) {
    throw new Error("API_URL_NOT_CONFIGURED");
  }

  const { params, body, method = body ? "POST" : "GET" } = options;

  let url = `${baseUrl}?action=${encodeURIComponent(action)}`;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `&${searchParams.toString()}`;
  }

  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (body) {
    fetchOptions.body = JSON.stringify({ action, ...body });
  }

  const res = await fetch(url, fetchOptions);

  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}
