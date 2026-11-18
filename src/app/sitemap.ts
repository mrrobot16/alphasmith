import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { servicePages, cityServicePath } from "@/lib/services";
import { cityPages } from "@/lib/cities";

// The plain service pages are canonical to their Portland versions, so only the city versions are listed.
const paths = [
  "/",
  ...cityPages.map((c) => `/locations/${c.slug}`),
  ...cityPages.flatMap((c) => servicePages.map((s) => cityServicePath(c.slug, s.slug))),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: `${SITE_URL}${p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
