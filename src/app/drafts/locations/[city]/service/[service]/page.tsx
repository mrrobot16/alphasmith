import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServicePage } from "@/components/ServicePage";
import { getCity } from "@/lib/cities";
import { localizeService } from "@/lib/services";
import { draftCities, draftLinkFor, draftPath, getDraft } from "@/lib/drafts";
import { DraftBanner } from "@/app/drafts/DraftBanner";
import { draftsLocked, lockedMetadata } from "@/app/drafts/gate";
import { draftsGate } from "@/lib/drafts-auth";

// Behind DRAFTS_PASSWORD: checked on every request.
export const dynamic = "force-dynamic";

type Params = Promise<{ city: string; service: string }>;

function resolve(city: string, service: string) {
  const ct = draftCities.includes(city) ? getCity(city) : undefined;
  const dr = getDraft(service);
  return ct && dr ? { city: ct, page: localizeService(dr, ct) } : null;
}

// No canonical or social tags: the page's real address doesn't exist until it's approved.
// robots noindex comes from app/drafts/layout.tsx.
export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { city, service } = await params;
  const r = resolve(city, service);
  if (!r || !(await draftsGate.hasAccess())) return lockedMetadata;
  return { title: `Draft: ${r.page.meta.title}`, description: r.page.meta.description };
}

export default async function DraftServicePage({ params }: { params: Params }) {
  const { city, service } = await params;
  // Password first, so an unknown address doesn't reveal which drafts exist.
  const locked = await draftsLocked(draftPath(city, service));
  if (locked) return locked;
  const r = resolve(city, service);
  if (!r) notFound();
  return (
    <>
      <DraftBanner c={r.page} city={r.city} />
      <ServicePage c={r.page} city={r.city} linkFor={draftLinkFor} />
    </>
  );
}
