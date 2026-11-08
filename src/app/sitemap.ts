import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const paths = ["/", "/garage-door-services/spring-repair", "/locations/beaverton"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: `${SITE_URL}${p}`, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.7 }));
}
