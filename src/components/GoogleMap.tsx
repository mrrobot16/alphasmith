import { site } from "@/lib/site";

/** Google Maps embed of the business listing (no API key needed). */
export function GoogleMap({ className = "" }: { className?: string }) {
  return (
    <iframe
      src={site.mapEmbed}
      title="Alpha Locksmith & Garage on Google Maps"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
      className={`w-full rounded-lg border border-line bg-surface ${className}`}
    />
  );
}
