"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const EVERY_MS = 15_000;

/**
 * Re-fetches the leads list every 15 seconds while the tab is visible, and right away
 * when you come back to the tab. Only the data reloads; scroll position is kept.
 */
export function AutoRefresh() {
  const router = useRouter();
  useEffect(() => {
    let timer: number | undefined;
    const start = () => {
      window.clearInterval(timer);
      timer = window.setInterval(() => router.refresh(), EVERY_MS);
    };
    const onVisibility = () => {
      if (document.hidden) return window.clearInterval(timer);
      router.refresh();
      start();
    };
    if (!document.hidden) start();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [router]);

  return (
    <span className="inline-flex items-center gap-1.5 text-small text-muted">
      <span className="size-2 rounded-full bg-orange" aria-hidden="true" />
      Live, updates every 15 seconds
    </span>
  );
}
