"use client";

import { usePathname } from "next/navigation";

/** Renders its children everywhere except the /admin pages. */
export function PublicOnly({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return pathname === "/admin" || pathname.startsWith("/admin/") ? null : children;
}
