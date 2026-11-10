import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CityPage } from "@/components/CityPage";
import { cityPages, getCity } from "@/lib/cities";
import { pageMeta } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return cityPages.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  const city = getCity((await params).city);
  if (!city) return {};
  return pageMeta({
    title: `Locksmith & Garage Doors in ${city.name}`,
    description: `Locksmith, garage door and automatic gate service in ${city.name}, ${city.state}, day or night. Licensed, with a written quote first. Call 503-505-8560.`,
    path: `/locations/${city.slug}`,
  });
}

export default async function LocationPage({ params }: { params: Promise<{ city: string }> }) {
  const city = getCity((await params).city);
  if (!city) notFound();
  return <CityPage city={city} />;
}
