import type { ReactNode } from "react";

import { AuthGate } from "@/components/AuthGate";

export default function ProtectedLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <AuthGate>{children}</AuthGate>;
}
