"use client";

import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";

import { type AdminSession, verifyAdminSession } from "@/lib/admin-api";
import { getSupabaseBrowserClient } from "@/lib/supabase";

const AdminSessionContext = createContext<AdminSession | null>(null);

export function useAdminSession() {
  const session = useContext(AdminSessionContext);

  if (!session) {
    throw new Error("useAdminSession must be used inside AuthGate.");
  }

  return session;
}

export function AuthGate({ children }: Readonly<{ children: ReactNode }>) {
  const router = useRouter();
  const [adminSession, setAdminSession] = useState<AdminSession | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function authorize() {
      try {
        const supabase = getSupabaseBrowserClient();
        const { data, error: sessionError } = await supabase.auth.getSession();

        if (sessionError || !data.session) {
          router.replace("/login");
          return;
        }

        setAdminSession(
          await verifyAdminSession(data.session.access_token, controller.signal),
        );
      } catch (authorizationError) {
        if (controller.signal.aborted) {
          return;
        }

        setError(
          authorizationError instanceof Error
            ? authorizationError.message
            : "Không thể xác minh phiên đăng nhập.",
        );
      }
    }

    void authorize();
    return () => controller.abort();
  }, [router]);

  if (error) {
    return (
      <main className="auth-status">
        <p className="eyebrow">Không thể mở Portal</p>
        <h1>{error}</h1>
        <button onClick={() => router.replace("/login")} type="button">
          Quay lại đăng nhập
        </button>
      </main>
    );
  }

  if (!adminSession) {
    return (
      <main className="auth-status">
        <LoaderCircle aria-label="Đang xác minh phiên đăng nhập" className="spin" />
        <p>Đang xác minh quyền truy cập...</p>
      </main>
    );
  }

  return (
    <AdminSessionContext.Provider value={adminSession}>
      {children}
    </AdminSessionContext.Provider>
  );
}
