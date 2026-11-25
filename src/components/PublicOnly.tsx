"use client";

import { usePathname } from "next/navigation";

/** Renders its children everywhere except under the given paths (the /admin pages by default). */
export function PublicOnly({ children, except = ["/admin"] }: { children: React.ReactNode; except?: string[] }) {
  const pathname = usePathname();
  return except.some((p) => pathname === p || pathname.startsWith(`${p}/`)) ? null : children;
}
