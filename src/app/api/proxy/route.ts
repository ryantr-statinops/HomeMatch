/**
 * API Proxy — Chuyển tiếp request từ client đến Google Apps Script API.
 *
 * Lý do: Google Apps Script ContentService không hỗ trợ CORS,
 * nên browser không thể gọi trực tiếp. Proxy này chạy server-side,
 * không bị giới hạn CORS.
 */

import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

export async function GET(request: NextRequest) {
  if (!API_URL) {
    return NextResponse.json(
      { error: "API_URL_NOT_CONFIGURED" },
      { status: 503 },
    );
  }

  try {
    // Forward query params từ client request
    const searchParams = request.nextUrl.searchParams;
    const targetUrl = `${API_URL}?${searchParams.toString()}`;

    const response = await fetch(targetUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `API Error: ${response.status}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Internal proxy error" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  if (!API_URL) {
    return NextResponse.json(
      { error: "API_URL_NOT_CONFIGURED" },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const action = body.action || request.nextUrl.searchParams.get("action");

    const targetUrl = `${API_URL}?action=${encodeURIComponent(action || "")}`;

    const response = await fetch(targetUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `API Error: ${response.status}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Internal proxy error" },
      { status: 500 },
    );
  }
}
