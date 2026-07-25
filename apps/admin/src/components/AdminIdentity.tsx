"use client";

import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAdminSession } from "@/components/AuthGate";
import { getSupabaseBrowserClient } from "@/lib/supabase";

export function AdminIdentity() {
  const router = useRouter();
  const session = useAdminSession();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function signOut() {
    setIsSigningOut(true);
    await getSupabaseBrowserClient().auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <div className="admin-identity">
      <div>
        <strong>{session.display_name}</strong>
        <span>{session.role}</span>
      </div>
      <button
        aria-label="Đăng xuất"
        disabled={isSigningOut}
        onClick={signOut}
        type="button"
      >
        <LogOut aria-hidden="true" size={17} />
      </button>
    </div>
  );
}
