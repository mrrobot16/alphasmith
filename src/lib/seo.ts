import { site } from "./site";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://alphalocksmithngarage.com";

export const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Locksmith",
  "@id": `${SITE_URL}/#business`,
  name: site.name,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/logo.png`,
  telephone: "+1-503-505-8560",
  areaServed: { "@type": "City", name: "Portland, OR" },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  // Add streetAddress, geo and sameAs (Google profile) once confirmed.
};

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}
