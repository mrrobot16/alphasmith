import { site } from "@/lib/site";

/** Google Maps embed (no API key needed). Pass `place` to center on a city, otherwise it shows the business listing. */
export function GoogleMap({ className = "", place }: { className?: string; place?: string }) {
  const src = place ? `https://www.google.com/maps?q=${encodeURIComponent(place)}&output=embed` : site.mapEmbed;
  return (
    <iframe
      src={src}
      title={place ? `Map of ${place}` : "Alpha Locksmith & Garage on Google Maps"}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
      className={`w-full rounded-lg border border-line bg-surface ${className}`}
    />
  );
}
