"use client";

// AdSense is disabled. See src/lib/ads.ts to turn it back on. Not imported anywhere while ads are off.

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT, ADS_ENABLED, ADS_PREVIEW, adPlacements, type AdPlacement } from "@/lib/ads";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * One place on a page where an ad can appear. Hidden by default: it renders nothing, and takes
 * no space, until ads are enabled in the env vars and this placement has an ad unit ID.
 * With NEXT_PUBLIC_ADSENSE_PREVIEW=true it shows a dashed box instead, to review the positions.
 * Positions and IDs are listed in lib/ads.ts.
 */
export function AdSlot({ placement, className = "" }: { placement: AdPlacement; className?: string }) {
  const { slot, label } = adPlacements[placement];
  const live = ADS_ENABLED && slot !== "";
  const requested = useRef(false);

  useEffect(() => {
    if (!live || requested.current) return;
    requested.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // An ad blocker or a script that has not loaded yet. Nothing to show, nothing to fix.
    }
  }, [live]);

  if (live) {
    return (
      <aside aria-label="Advertisement" data-section={`ad_${placement}`} className={`wrap py-6 ${className}`}>
        <p className="mb-2 text-label uppercase tracking-[0.12em] text-muted">Advertisement</p>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </aside>
    );
  }

  if (ADS_PREVIEW) {
    return (
      <aside aria-hidden="true" data-section={`ad_${placement}`} className={`wrap py-6 ${className}`}>
        <div className="grid min-h-28 place-items-center rounded-lg border border-dashed border-line px-4 text-center text-small text-muted">
          Ad slot: {label} ({placement})
        </div>
      </aside>
    );
  }

  return null;
}
