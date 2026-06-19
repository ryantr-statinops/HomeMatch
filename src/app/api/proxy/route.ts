/**
 * API Proxy — Chuyển tiếp request từ client đến Google Apps Script API.
 *
 * Lý do: Google Apps Script ContentService không hỗ trợ CORS,
 * nên browser không thể gọi trực tiếp. Proxy này chạy server-side,
 * không bị giới hạn CORS.
 *
 * Cache: In-memory cache với TTL 60s để giảm tải lên Apps Script.
 *
 * Runtime: edge (bắt buộc cho Cloudflare Pages)
 */

export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "";
const CACHE_TTL = 60_000;

type CacheEntry = {
  data: unknown;
  timestamp: number;
};

const cache = new Map<string, CacheEntry>();

function getCacheKey(searchParams: URLSearchParams): string {
  const params = new URLSearchParams(searchParams);
  params.sort();
  return params.toString();
}

function getFromCache(key: string): unknown | null {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key: string, data: unknown): void {
  if (cache.size > 100) {
    const oldest = cache.keys().next().value;
    if (oldest) cache.delete(oldest);
  }
  cache.set(key, { data, timestamp: Date.now() });
}

export async function GET(request: NextRequest) {
  if (!API_URL) {
    return NextResponse.json(
      { error: "API_URL_NOT_CONFIGURED" },
      { status: 503 },
    );
  }

  const searchParams = request.nextUrl.searchParams;
  const cacheKey = getCacheKey(searchParams);

  const cached = getFromCache(cacheKey);
  if (cached) {
    return NextResponse.json(cached);
  }

  try {
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
    setCache(cacheKey, data);
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
