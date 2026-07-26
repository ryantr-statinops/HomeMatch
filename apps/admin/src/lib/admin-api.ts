import type { paths } from "@homematch/api-client";

export type AdminSession =
  paths["/api/v1/admin/session"]["get"]["responses"][200]["content"]["application/json"]["data"];

export type AdminRoom =
  paths["/api/v1/admin/rooms"]["get"]["responses"][200]["content"]["application/json"]["data"][number];

export type AdminRoomPage = {
  data: AdminRoom[];
  meta: {
    page: number;
    page_size: number;
    total: number;
    total_pages: number;
  };
};

type ErrorResponse = {
  error?: {
    message?: string;
  };
};

const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

export async function verifyAdminSession(
  accessToken: string,
  signal?: AbortSignal,
): Promise<AdminSession> {
  if (!apiUrl) {
    throw new Error("Thiếu NEXT_PUBLIC_API_URL.");
  }

  const response = await fetch(`${apiUrl}/api/v1/admin/session`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    signal,
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as ErrorResponse;
    throw new Error(body.error?.message ?? "Tài khoản không có quyền vào Admin Portal.");
  }

  const body = (await response.json()) as { data: AdminSession };
  return body.data;
}

export async function fetchAdminRooms(
  accessToken: string,
  parameters: {
    search?: string;
    status?: string;
    page: number;
    pageSize: number;
  },
  signal?: AbortSignal,
): Promise<AdminRoomPage> {
  if (!apiUrl) {
    throw new Error("Thiếu NEXT_PUBLIC_API_URL.");
  }

  const query = new URLSearchParams({
    page: String(parameters.page),
    page_size: String(parameters.pageSize),
  });
  if (parameters.search) {
    query.set("search", parameters.search);
  }
  if (parameters.status) {
    query.set("status", parameters.status);
  }

  const response = await fetch(`${apiUrl}/api/v1/admin/rooms?${query}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    signal,
  });
  if (!response.ok) {
    const body = (await response.json().catch(() => ({}))) as ErrorResponse;
    throw new Error(body.error?.message ?? "Không thể tải kho phòng.");
  }

  return (await response.json()) as AdminRoomPage;
}
