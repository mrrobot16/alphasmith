/**
 * Display ads (Google AdSense). Everything here is switched off until the env vars are filled in,
 * so with them blank no script loads, no request is made and no ad slot takes up any space.
 *
 *   NEXT_PUBLIC_ADSENSE_CLIENT_ID   publisher ID, e.g. ca-pub-1234567890123456
 *   NEXT_PUBLIC_ADSENSE_ENABLED     "true" turns the ads on (needs the client ID and a slot ID)
 *   NEXT_PUBLIC_ADSENSE_PREVIEW     "true" shows dashed boxes where the ads will go, with no ad
 *                                   requests. For reviewing placement with the client.
 *   NEXT_PUBLIC_ADSENSE_SLOT_*      one ad unit ID per placement below (AdSense > Ads > By ad unit)
 *
 * The slot variables are read by name, not looked up dynamically, because Next.js only inlines
 * NEXT_PUBLIC_ variables that are written out in full.
 *
 * This is separate from the Google Ads conversion tracking in components/Analytics.tsx
 * (NEXT_PUBLIC_GOOGLE_ADS_ID and friends), which measures your ad campaigns.
 */
export const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? "";
export const ADS_ENABLED = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true" && ADSENSE_CLIENT !== "";
export const ADS_PREVIEW = process.env.NEXT_PUBLIC_ADSENSE_PREVIEW === "true";

export const adPlacements = {
  home_mid: { label: "Home page, after services", slot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_MID ?? "" },
  home_bottom: { label: "Home page, after reviews", slot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME_BOTTOM ?? "" },
  service_mid: { label: "Service pages, after the signs section", slot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SERVICE_MID ?? "" },
  service_bottom: { label: "Service pages, after the FAQ", slot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SERVICE_BOTTOM ?? "" },
  city_mid: { label: "City pages, after recent jobs", slot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_CITY_MID ?? "" },
  city_bottom: { label: "City pages, after the FAQ", slot: process.env.NEXT_PUBLIC_ADSENSE_SLOT_CITY_BOTTOM ?? "" },
} as const;

export type AdPlacement = keyof typeof adPlacements;
