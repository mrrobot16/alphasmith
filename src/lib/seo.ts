import type { Metadata } from "next";
import { site, cities, services } from "./site";

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
  description: "Licensed Portland locksmith, garage door and automatic gate service, open 24/7.",
  areaServed: cities.map((name) => ({ "@type": "City", name: `${name}, OR` })),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services",
    itemListElement: services.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title } })),
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "00:00",
    closes: "23:59",
  },
  // Social, review and BBB profiles of the same business.
  sameAs: [...site.social.map((s) => s.href), site.bbbUrl],
  // Add streetAddress and geo once confirmed.
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

/** Per-page metadata with matching Open Graph and Twitter tags (these do not inherit page titles). */
export function pageMeta({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", siteName: site.name, locale: "en_US", url: path, title: `${title} | Alpha Locksmith`, description, images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.name }] },
    twitter: { card: "summary_large_image", title: `${title} | Alpha Locksmith`, description, images: ["/twitter-image"] },
  };
}

export function serviceJsonLd({ name, description, path, area }: { name: string; description: string; path: string; area?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${path}`,
    provider: { "@id": `${SITE_URL}/#business` },
    areaServed: area ? { "@type": "City", name: area } : cities.map((c) => ({ "@type": "City", name: `${c}, OR` })),
  };
}
