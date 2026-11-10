"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * The home page has two quote forms (beside the hero on desktop, further down on
 * phones) and only one is ever visible. Links to "#quote" scroll to the visible one.
 */
export function QuoteAnchor() {
  const pathname = usePathname(); // re-run after client-side navigation to a new page
  useEffect(() => {
    const visibleForm = () =>
      [...document.querySelectorAll<HTMLElement>('form[data-section="quote_form"]')].find((f) => f.offsetParent !== null);

    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a");
      if (!a) return;
      const url = new URL(a.href, window.location.href);
      if (url.hash !== "#quote" || url.pathname !== window.location.pathname) return;
      const form = visibleForm();
      if (!form) return;
      e.preventDefault();
      form.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", "#quote");
    };

    // Arriving on "/#quote" from another page: the browser finds no element with that id,
    // so scroll ourselves, and once more after Next.js finishes its own scroll handling.
    const jump = () => {
      const form = window.location.hash === "#quote" ? visibleForm() : undefined;
      if (form) form.scrollIntoView({ behavior: "instant", block: "start" });
    };
    jump();
    const t = window.setTimeout(jump, 400);

    document.addEventListener("click", onClick);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("click", onClick);
    };
  }, [pathname]);
  return null;
}
