"use client";

import { ArrowRight, LoaderCircle, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useEffect, useState } from "react";

import { verifyAdminSession } from "@/lib/admin-api";
import { getSupabaseBrowserClient } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function redirectAuthenticatedUser() {
      try {
        const { data } = await getSupabaseBrowserClient().auth.getSession();
        if (data.session) {
          await verifyAdminSession(data.session.access_token);
          router.replace("/");
        }
      } catch {
        // A stale or unauthorized session should remain on the login page.
      }
    }

    void redirectAuthenticatedUser();
  }, [router]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const supabase = getSupabaseBrowserClient();
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError || !data.session) {
        throw new Error("Email hoặc mật khẩu không chính xác.");
      }

      await verifyAdminSession(data.session.access_token);
      router.replace("/");
      router.refresh();
    } catch (loginError) {
      await getSupabaseBrowserClient().auth.signOut();
      setError(
        loginError instanceof Error ? loginError.message : "Không thể đăng nhập.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="login-shell">
      <section className="login-story">
        <p className="eyebrow">HomeMatch / Operations</p>
        <div>
          <span className="login-index">Private workspace 01</span>
          <h1>Vận hành kho phòng, trong một luồng thống nhất.</h1>
        </div>
        <p className="login-note">
          Chỉ tài khoản nội bộ có role admin hoặc sale mới được truy cập.
        </p>
      </section>

      <section className="login-panel">
        <div className="login-card">
          <ShieldCheck aria-hidden="true" size={31} strokeWidth={1.6} />
          <p className="eyebrow">Đăng nhập nội bộ</p>
          <h2>Chào mừng trở lại.</h2>
          <p>Sử dụng tài khoản được cấp bởi quản trị viên HomeMatch.</p>

          <form onSubmit={submit}>
            <label htmlFor="email">Email</label>
            <input
              autoComplete="email"
              id="email"
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              value={email}
            />

            <label htmlFor="password">Mật khẩu</label>
            <input
              autoComplete="current-password"
              id="password"
              minLength={8}
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />

            {error && <p className="form-error" role="alert">{error}</p>}

            <button disabled={isSubmitting} type="submit">
              {isSubmitting ? (
                <LoaderCircle aria-hidden="true" className="spin" size={18} />
              ) : (
                <ArrowRight aria-hidden="true" size={18} />
              )}
              {isSubmitting ? "Đang xác minh..." : "Vào Operations"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
