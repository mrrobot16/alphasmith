import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { QuoteForm } from "@/components/QuoteForm";
import { TrustBar, Hero, Faq, Reviews } from "@/components/Shared";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { CheckIcon, PhoneIcon, WarnIcon } from "@/components/Icons";

export const metadata: Metadata = {
  alternates: { canonical: "/garage-door-services/spring-repair" },
  title: "Garage Door Spring Repair in Portland, OR | Alpha Locksmith & Garage",
  description: "Same-day garage door spring repair and replacement across the Portland metro. Call 503-505-8560.",
};

const signs = [
  "A loud bang from the garage, like a firecracker",
  "The door won't open, or the opener strains and stops",
  "A visible gap in the spring above the door",
  "The door feels very heavy when lifted by hand",
  "The door opens crooked or slams shut",
];

const steps = [
  ["01", "Inspect", "We check the springs, cables, drums and rollers to find everything that's worn, not just the broken part."],
  ["02", "Written quote", "You get the price in writing before any work starts. No surprises."],
  ["03", "Replace", "Springs sized to your door's weight, installed and wound to spec. Cables replaced if frayed."],
  ["04", "Balance and test", "We balance the door, tune the opener, and test it with you before we leave."],
];

const brands = ["LiftMaster", "Chamberlain", "Genie", "Clopay", "Amarr", "Wayne Dalton", "Overhead Door", "[Other brands you service]"];

const reviews = [
  { text: "[Real Google review about a garage door spring replacement, in the customer's words.]", by: "[First name L.] · [Town] · Google · [Month Year]" },
  { text: "[Real Google review about a same-day spring repair, in the customer's words.]", by: "[First name L.] · [Town] · Google · [Month Year]" },
  { text: "[Real Google review about a commercial overhead door spring, in the customer's words.]", by: "[First name L.] · [Town] · Google · [Month Year]" },
];

const faqs = [
  { q: "How much does garage door spring repair cost?", a: "[Price range and what affects it: spring type, door size, parts and labor. Final price confirmed in writing before work starts.]" },
  { q: "Can you come today?", a: "[Same-day availability and typical arrival window.]" },
  { q: "Should I replace both springs?", a: "[Explain why springs are usually replaced in pairs.]" },
  { q: "Is it safe to open the door with a broken spring?", a: "No. Leave the door where it is, unplug the opener, and call us." },
  { q: "Do you offer a warranty?", a: "[Warranty terms for springs and labor.]" },
];

const areas = ["Portland", "Wilsonville", "Beaverton", "Hillsboro", "Tigard", "Lake Oswego", "Gresham", "Oregon City", "Salem", "Vancouver metro area"];

export default function SpringRepairPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Spring repair", path: "/garage-door-services/spring-repair" }])} />
      <nav aria-label="Breadcrumb" className="border-b border-line text-[0.875rem] text-muted">
        <ol className="wrap flex gap-2 py-3">
          <li><Link href="/" className="hover:text-ink">Home</Link></li>
          <li aria-hidden>·</li>
          <li>Garage door services</li>
          <li aria-hidden>·</li>
          <li className="text-ink" aria-current="page">Spring repair</li>
        </ol>
      </nav>

      <Hero badge="Same-day service · Open 24/7" title="Garage door spring repair in" accent="Portland, OR" form={<QuoteForm />}>
        <p className="mt-6 max-w-[36rem] text-[1rem] leading-relaxed text-muted">
          Broken torsion or extension spring? We replace springs on residential and commercial garage doors across
          the Portland metro, usually the same day you call.
        </p>
        <ul className="mt-5 space-y-2 text-[0.875rem]">
          {["Written quote before any work starts", `Licensed and certified, ${site.license}`, "[Warranty: e.g. X-year warranty on springs and labor]"].map((t) => (
            <li key={t} className="flex items-center gap-2">
              <CheckIcon className="text-orange" /> {t}
            </li>
          ))}
        </ul>
        <a href={site.phoneHref} className="btn mt-7 px-6 py-3.5 text-[1.4rem]">
          <PhoneIcon /> Call {site.phone}
        </a>
      </Hero>

      <TrustBar />

      <div className="bg-orange text-black">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 py-4">
          <p className="flex items-center gap-3 text-[0.875rem]">
            <WarnIcon className="shrink-0" />
            <span>
              <b>Spring broke? Don&apos;t force the door.</b> Garage door springs hold hundreds of pounds of tension.
              Leave the door where it is, unplug the opener, and call us.
            </span>
          </p>
          <a href={site.phoneHref} className="btn !bg-black px-4 py-2 text-[0.875rem] !text-white">Call now</a>
        </div>
      </div>

      <section className="wrap grid gap-10 py-14 md:grid-cols-2">
        <div>
          <h2 className="h-section">Signs your spring is broken</h2>
          <ul className="mt-5 space-y-3 text-[0.875rem]">
            {signs.map((s) => (
              <li key={s} className="flex items-center gap-2"><CheckIcon className="text-orange" /> {s}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="h-section">Torsion or extension?</h2>
          <p className="mt-4 text-[0.875rem] leading-relaxed">
            <b>Torsion springs</b> sit on a bar above the door. <b>Extension springs</b> run along the side tracks.
            We repair both, and we&apos;ll tell you which you have when you call.
          </p>
          <div className="card mt-5 p-4">
            <p className="eyebrow !text-[0.875rem]">Pricing</p>
            <p className="mt-1 font-display text-[1.7rem] font-bold uppercase">Spring replacement from [$XXX]</p>
            <p className="mt-1 text-[0.875rem] text-muted">[What the price includes, e.g. parts, labor, tune-up. Final price confirmed in writing on site.]</p>
          </div>
        </div>
      </section>

      <section className="bg-bg-alt py-14">
        <div className="wrap">
          <h2 className="h-section">How a spring repair works</h2>
          <ol className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(([n, t, b]) => (
              <li key={n} className="card p-5">
                <p className="font-display text-[1.7rem] font-bold text-orange">{n}</p>
                <h3 className="mt-2 text-base">{t}</h3>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">{b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-14">
        <div className="wrap">
          <h2 className="h-section">Brands we work on</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {brands.map((b) => (<li key={b} className="chip !rounded-md">{b}</li>))}
          </ul>
        </div>
      </section>

      <section id="reviews" className="bg-bg-alt py-14">
        <div className="wrap">
          <h2 className="h-section">What customers say</h2>
          <div className="mt-6"><Reviews items={reviews} /></div>
        </div>
      </section>

      <section className="py-14">
        <div className="wrap">
          <h2 className="h-section">Frequently asked questions</h2>
          <div className="mt-6"><Faq items={faqs} /></div>
        </div>
      </section>

      <section className="bg-bg-alt py-14">
        <div className="wrap">
          <h2 className="h-section">Spring repair near you</h2>
          <p className="mt-3 text-[0.875rem] text-muted">Same-day garage door spring repair in these areas and more:</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {areas.map((a) => (
              <li key={a}><Link href={a === "Beaverton" ? "/locations/beaverton" : "#"} className="chip">{a}</Link></li>
            ))}
          </ul>
          <h3 className="mt-10 text-[1.4rem]">Related services</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {["Garage door opener repair", "Broken cable repair", "Commercial overhead doors"].map((s) => (<li key={s} className="chip">{s}</li>))}
          </ul>
        </div>
      </section>
    </>
  );
}
