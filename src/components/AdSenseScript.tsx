// AdSense is disabled. See src/lib/ads.ts to turn it back on. Not imported anywhere while ads are off.
import Script from "next/script";
import { ADSENSE_CLIENT, ADS_ENABLED } from "@/lib/ads";

/** Loads Google's ad script once for the whole site. Renders nothing while ads are off. */
export function AdSenseScript() {
  if (!ADS_ENABLED) return null;
  return (
    <Script
      id="adsense-script"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
    />
  );
}
