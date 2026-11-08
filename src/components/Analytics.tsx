"use client";

import Script from "next/script";
import { useEffect } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
/** Optional Google Ads conversion labels, e.g. "AW-123456789/AbCdEf" */
const ADS_CALL = process.env.NEXT_PUBLIC_ADS_CALL_CONVERSION;
const ADS_LEAD = process.env.NEXT_PUBLIC_ADS_LEAD_CONVERSION;

type Gtag = (...args: unknown[]) => void;
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

export function track(event: string, params: Record<string, unknown> = {}, adsConversion?: string) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", event, params);
  if (adsConversion) window.gtag("event", "conversion", { send_to: adsConversion });
}

export function Analytics() {
  // Count every tap on a phone link as a call lead.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest?.('a[href^="tel:"]');
      if (a) track("phone_click", { link_text: a.textContent?.trim() }, ADS_CALL);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const firstId = GA_ID ?? ADS_ID;
  if (!firstId) return null; // nothing configured: no tracking, no network calls

  const configs = [GA_ID, ADS_ID].filter(Boolean).map((id) => `gtag('config','${id}');`).join("");

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${firstId}`} strategy="afterInteractive" />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());${configs}`}
      </Script>
    </>
  );
}

export const leadConversion = ADS_LEAD;
