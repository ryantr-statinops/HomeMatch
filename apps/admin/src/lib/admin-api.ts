import type { paths } from "@homematch/api-client";

export type AdminSession =
  paths["/api/v1/admin/session"]["get"]["responses"][200]["content"]["application/json"]["data"];

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
