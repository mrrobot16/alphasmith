import { site } from "@/lib/site";

type Props = {
  className?: string;
  /** Search text to center on and pin, e.g. "Beaverton, OR". */
  place?: string;
  /** Center the map on a point with no pin. Used for the wide service-area map. */
  center?: { lat: number; lng: number };
  /**
   * How far in the map starts. Google's scale: 7 is about the whole state, 9 is the Portland metro
   * and outskirts, 11 is one city, 15 is a few blocks. Leave it out to let Google choose.
   */
  zoom?: number;
  /** Accessible title for the frame. */
  title?: string;
};

/**
 * Google Maps embed (no API key needed). Three modes:
 *  - `center` (with `zoom`): a pin-free map of an area, for showing coverage.
 *  - `place`: centered and pinned on a search, e.g. a city.
 *  - neither: the business listing.
 */
export function GoogleMap({ className = "", place, center, zoom, title }: Props) {
  const z = zoom ? `&z=${zoom}` : "";
  let src: string = `${site.mapEmbed}${z}`;
  if (center && !place) src = `https://www.google.com/maps?ll=${center.lat},${center.lng}${z}&output=embed`;
  else if (place) src = `https://www.google.com/maps?q=${encodeURIComponent(place)}${z}&output=embed`;

  return (
    <iframe
      src={src}
      title={title ?? (place ? `Map of ${place}` : "Alpha Locksmith & Garage on Google Maps")}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
      className={`w-full rounded-lg border border-line bg-surface ${className}`}
    />
  );
}
