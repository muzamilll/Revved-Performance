"use client";

import { usePathname } from "next/navigation";

// The private lead dashboard has its own layout: hide the public site's header,
// footer, WhatsApp bar and cookie banner there.
export function HideOnDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/dashboard")) return null;
  return <>{children}</>;
}
