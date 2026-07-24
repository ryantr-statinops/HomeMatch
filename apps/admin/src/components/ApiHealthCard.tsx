"use client";

import type { paths } from "@homematch/api-client";
import { Activity, CircleAlert, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";

type HealthResponse =
  paths["/api/v1/health"]["get"]["responses"][200]["content"]["application/json"];

type ConnectionState =
  | { status: "loading" }
  | { status: "online"; payload: HealthResponse }
  | { status: "offline"; message: string };

const apiUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

export function ApiHealthCard() {
  const [connection, setConnection] = useState<ConnectionState>(
    apiUrl
      ? { status: "loading" }
      : { status: "offline", message: "Thiếu NEXT_PUBLIC_API_URL" },
  );

  useEffect(() => {
    if (!apiUrl) {
      return;
    }

    const controller = new AbortController();

    async function checkHealth() {
      try {
        const response = await fetch(`${apiUrl}/api/v1/health`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`API trả về HTTP ${response.status}`);
        }

        setConnection({
          status: "online",
          payload: (await response.json()) as HealthResponse,
        });
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setConnection({
          status: "offline",
          message: error instanceof Error ? error.message : "Không thể kết nối API",
        });
      }
    }

    void checkHealth();
    return () => controller.abort();
  }, []);

  return (
    <article className={`health-card ${connection.status}`}>
      <div className="health-heading">
        <div>
          <p className="eyebrow">Service monitor</p>
          <h3>FastAPI gateway</h3>
        </div>
        {connection.status === "loading" && (
          <LoaderCircle aria-label="Đang kiểm tra API" className="spin" size={25} />
        )}
        {connection.status === "online" && <Activity aria-label="API hoạt động" size={25} />}
        {connection.status === "offline" && <CircleAlert aria-label="API gián đoạn" size={25} />}
      </div>

      {connection.status === "loading" && <p>Đang xác nhận kết nối...</p>}
      {connection.status === "offline" && <p>{connection.message}</p>}
      {connection.status === "online" && (
        <dl>
          <div>
            <dt>Trạng thái</dt>
            <dd>{connection.payload.data.status}</dd>
          </div>
          <div>
            <dt>Service</dt>
            <dd>{connection.payload.data.service}</dd>
          </div>
          <div>
            <dt>Version</dt>
            <dd>{connection.payload.data.version}</dd>
          </div>
        </dl>
      )}
    </article>
  );
}
