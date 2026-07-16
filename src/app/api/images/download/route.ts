import { NextRequest } from "next/server";
import { supabase } from "@/lib/supabase/client";

function getFilenameFromPath(path: string | null): string {
  if (!path) return "homematch-image.jpg";
  const name = path.split("/").pop() || "homematch-image.jpg";
  return name.includes(".") ? name : `${name}.jpg`;
}

function getFilenameFromUrl(url: string | null): string {
  if (!url) return "homematch-image.jpg";
  try {
    const parsed = new URL(url);
    const id = parsed.searchParams.get("id");
    if (id) return `homematch-${id}.jpg`;
    const last = parsed.pathname.split("/").filter(Boolean).pop();
    return last ? `${last}.jpg` : "homematch-image.jpg";
  } catch {
    return "homematch-image.jpg";
  }
}

async function resolveImageSource(params: {
  path: string | null;
  url: string | null;
}): Promise<{ url: string; filename: string } | null> {
  const { path, url } = params;

  if (path) {
    const { data, error } = await supabase
      .from("imagecache")
      .select("path, drive_url")
      .eq("path", path)
      .maybeSingle();

    if (error || !data?.drive_url) return null;

    return {
      url: data.drive_url,
      filename: getFilenameFromPath(data.path),
    };
  }

  if (url) {
    return {
      url,
      filename: getFilenameFromUrl(url),
    };
  }

  return null;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get("path");
  const url = searchParams.get("url");

  const source = await resolveImageSource({ path, url });
  if (!source) {
    return Response.json(
      { error: "Không tìm thấy nguồn ảnh hợp lệ." },
      { status: 404 },
    );
  }

  try {
    const upstream = await fetch(source.url, {
      headers: {
        "User-Agent": "HomeMatch/1.0",
      },
    });

    if (!upstream.ok || !upstream.body) {
      return Response.json(
        { error: "Không thể tải ảnh từ nguồn gốc." },
        { status: 502 },
      );
    }

    const contentType =
      upstream.headers.get("content-type") || "application/octet-stream";
    const contentLength = upstream.headers.get("content-length") || undefined;

    return new Response(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        ...(contentLength ? { "Content-Length": contentLength } : {}),
        "Content-Disposition": `attachment; filename="${source.filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return Response.json(
      { error: "Lỗi khi xử lý download ảnh." },
      { status: 500 },
    );
  }
}

