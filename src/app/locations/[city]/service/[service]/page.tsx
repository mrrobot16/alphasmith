import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/ServicePage";
import { cityPages, getCity } from "@/lib/cities";
import { cityServicePath, getServiceBySlug, localizeService, servicePages } from "@/lib/services";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

type Params = Promise<{ city: string; service: string }>;

export function generateStaticParams() {
  return cityPages.flatMap((c) => servicePages.map((s) => ({ city: c.slug, service: s.slug })));
}

function resolve(city: string, service: string) {
  const ct = getCity(city);
  const sv = getServiceBySlug(service);
  return ct && sv ? { city: ct, service: localizeService(sv, ct) } : null;
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { city, service } = await params;
  const r = resolve(city, service);
  if (!r) return {};
  return pageMeta({ ...r.service.meta, path: cityServicePath(r.city.slug, r.service.slug) });
}

export default async function CityServicePage({ params }: { params: Params }) {
  const { city, service } = await params;
  const r = resolve(city, service);
  if (!r) notFound();
  return <ServicePage c={r.service} city={r.city} />;
}
