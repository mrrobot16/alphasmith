"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Plug-and-play analytics. Set any of these env vars and everything below turns
 * on with no code changes; leave them all blank and nothing loads or listens.
 *
 *   NEXT_PUBLIC_GA_ID               GA4 measurement ID (events + conversions)
 *   NEXT_PUBLIC_GOOGLE_ADS_ID       Google Ads tag
 *   NEXT_PUBLIC_CLARITY_ID          Microsoft Clarity project ID (visual click/scroll heatmaps + recordings)
 *   NEXT_PUBLIC_ANALYTICS_DEBUG     "true" logs every event to the browser console
 *
 * Markup conventions the tracker reads (all optional):
 *   data-section="hero"             names a page section; every event carries the nearest one
 *   data-track="event_name"         overrides the auto-detected event name for that element
 *   data-track-label="Reviews next" overrides the label (default: aria-label or visible text)
 */
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;
const DEBUG = process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true";
/** Optional Google Ads conversion labels, e.g. "AW-123456789/AbCdEf" */
const ADS_CALL = process.env.NEXT_PUBLIC_ADS_CALL_CONVERSION;
const ADS_LEAD = process.env.NEXT_PUBLIC_ADS_LEAD_CONVERSION;

const ENABLED = Boolean(GA_ID || ADS_ID || CLARITY_ID || DEBUG);

type Gtag = (...args: unknown[]) => void;
type Clarity = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
    clarity?: Clarity;
  }
}

type Params = Record<string, string | number | boolean | undefined>;

/** Sends one event to every configured destination. Safe to call anywhere. */
export function track(event: string, params: Params = {}, adsConversion?: string) {
  if (typeof window === "undefined" || !ENABLED) return;
  const payload = { page_path: window.location.pathname, ...params };
  if (window.gtag) {
    window.gtag("event", event, payload);
    if (adsConversion) window.gtag("event", "conversion", { send_to: adsConversion });
  }
  window.clarity?.("event", event);
  if (DEBUG) console.debug("[analytics]", event, payload);
}

const trim = (s: string | null | undefined, max = 80) => (s ?? "").replace(/\s+/g, " ").trim().slice(0, max);
const bucket = (n: number) => Math.min(100, Math.max(0, Math.round(n / 10) * 10)); // 10% buckets keep GA cardinality low

function sectionOf(el: Element | null) {
  return el?.closest<HTMLElement>("[data-section]")?.dataset.section ?? "page";
}

/** Maps a clicked element to an event name, label and extra params. */
function classify(el: HTMLElement): { event: string; label: string; extra?: Params; conversion?: string } | null {
  const label = trim(el.dataset.trackLabel ?? el.getAttribute("aria-label") ?? el.textContent);
  if (el.dataset.track) return { event: el.dataset.track, label };

  if (el instanceof HTMLAnchorElement) {
    const href = el.getAttribute("href") ?? "";
    if (href.startsWith("tel:")) return { event: "phone_click", label, conversion: ADS_CALL };
    if (href.startsWith("mailto:")) return { event: "email_click", label };
    if (el.closest('nav[aria-label="Main"], #mobile-nav')) return { event: "nav_click", label, extra: { href } };
    if (href.startsWith("/locations/")) return { event: "city_click", label, extra: { href } };
    if (/^\/(locksmith|automatic-gate|access-control|fence|garage-door)/.test(href)) {
      return { event: "service_click", label, extra: { href } };
    }
    if (/^https?:\/\//.test(href) && !href.includes(window.location.host)) {
      return { event: "outbound_click", label, extra: { href } };
    }
    if (el.classList.contains("btn")) return { event: "cta_click", label, extra: { href } };
    return null;
  }
  if (el instanceof HTMLButtonElement) {
    if (el.type === "submit") return { event: "cta_click", label };
    return { event: "ui_click", label };
  }
  return null;
}

export function Analytics() {
  const pathname = usePathname();

  // Per-page behaviour: clicks, section views, scroll depth, FAQ, form start.
  useEffect(() => {
    if (!ENABLED) return;

    const pageType = pathname === "/" ? "home" : pathname.startsWith("/locations/") ? "city" : "service";
    window.clarity?.("set", "page_type", pageType);
    if (pageType === "city") window.clarity?.("set", "city", pathname.split("/").pop() ?? "");

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const el = target?.closest<HTMLElement>("a, button, [data-track]");
      if (!el) return;
      const hit = classify(el);
      if (!hit) return;
      const doc = document.documentElement;
      track(
        hit.event,
        {
          label: hit.label,
          section: sectionOf(el),
          // Coarse click position (10% buckets) so a heat grid can be built in GA4 / BigQuery.
          x_pct: bucket((e.clientX / window.innerWidth) * 100),
          y_pct: bucket(((e.pageY || 0) / Math.max(doc.scrollHeight, 1)) * 100),
          ...hit.extra,
        },
        hit.conversion,
      );
    };

    // Sections: fire once per page when a section scrolls into view.
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const name = (entry.target as HTMLElement).dataset.section;
          if (!entry.isIntersecting || !name || seen.has(name)) continue;
          seen.add(name);
          track("section_view", { section: name });
        }
      },
      { rootMargin: "0px 0px -35% 0px", threshold: 0 },
    );
    document
      .querySelectorAll<HTMLElement>("[data-section]")
      .forEach((s) => {
        if (!["header", "sticky_call_bar"].includes(s.dataset.section ?? "")) observer.observe(s);
      });

    // Scroll depth milestones.
    const marks = new Set<number>();
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const doc = document.documentElement;
        const depth = ((window.scrollY + window.innerHeight) / Math.max(doc.scrollHeight, 1)) * 100;
        for (const m of [25, 50, 75, 100]) {
          if (depth >= m - 1 && !marks.has(m)) {
            marks.add(m);
            track("scroll_depth", { percent: m });
          }
        }
      });
    };

    // FAQ questions opened (details "toggle" does not bubble, so listen in the capture phase).
    const onToggle = (e: Event) => {
      const d = e.target;
      if (d instanceof HTMLDetailsElement && d.open) {
        track("faq_open", { label: trim(d.querySelector("summary")?.textContent), section: sectionOf(d) });
      }
    };

    // First time someone focuses the quote form.
    let formStarted = false;
    const onFocusIn = (e: FocusEvent) => {
      const form = (e.target as HTMLElement | null)?.closest("form");
      if (form && !formStarted) {
        formStarted = true;
        track("form_start", { section: sectionOf(form), form: form.id || "form" });
      }
    };

    document.addEventListener("click", onClick);
    document.addEventListener("toggle", onToggle, true);
    document.addEventListener("focusin", onFocusIn);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("toggle", onToggle, true);
      document.removeEventListener("focusin", onFocusIn);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [pathname]);

  const gtagId = GA_ID ?? ADS_ID;

  return (
    <>
      {gtagId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gtagId}`} strategy="afterInteractive" />
          <Script id="gtag-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());${[GA_ID, ADS_ID]
              .filter(Boolean)
              .map((id) => `gtag('config','${id}');`)
              .join("")}`}
          </Script>
        </>
      )}
      {CLARITY_ID && (
        <Script id="clarity-init" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${CLARITY_ID}");`}
        </Script>
      )}
    </>
  );
}

export const leadConversion = ADS_LEAD;
