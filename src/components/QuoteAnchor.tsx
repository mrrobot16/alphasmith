"use client";

import { useEffect } from "react";

/**
 * The home page has two quote forms (beside the hero on desktop, further down on
 * phones) and only one is ever visible. Links to "#quote" scroll to the visible one.
 */
export function QuoteAnchor() {
  useEffect(() => {
    const visibleForm = () =>
      [...document.querySelectorAll<HTMLElement>('form[data-section="quote_form"]')].find((f) => f.offsetParent !== null);

    const go = () => {
      if (window.location.hash !== "#quote") return false;
      const form = visibleForm();
      if (!form) return false;
      form.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    };

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

    go();
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
