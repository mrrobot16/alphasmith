import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { servicePages } from "@/lib/services";

const paths = ["/", ...servicePages.map((s) => s.path), "/locations/beaverton"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: `${SITE_URL}${p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
