import type { Metadata } from "next";
import Link from "next/link";
import { site, services } from "@/lib/site";
import { QuoteForm } from "@/components/QuoteForm";
import { TrustBar, Hero, Faq, Reviews, Placeholder } from "@/components/Shared";
import { GoogleMap } from "@/components/GoogleMap";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { CheckIcon, PhoneIcon, serviceIcons } from "@/components/Icons";

export const metadata: Metadata = {
  alternates: { canonical: "/locations/beaverton" },
  title: "Locksmith & Garage Door Service in Beaverton, OR | Alpha Locksmith & Garage",
  description: "Locksmith, garage door and automatic gate service in Beaverton, OR, day or night. Call 503-505-8560.",
};

const zips = ["97003", "97005", "97006", "97007", "97008", "97078"];

const reviews = [
  { text: "[Real Google review about a lockout in Beaverton, in the customer's words.]", by: "[First name L.] · [Town] · Google · [Month Year]" },
  { text: "[Real Google review about a garage door repair in Beaverton, in the customer's words.]", by: "[First name L.] · [Town] · Google · [Month Year]" },
  { text: "[Real Google review about a gate or access control job in Beaverton, in the customer's words.]", by: "[First name L.] · [Town] · Google · [Month Year]" },
];

const faqs = [
  { q: "How fast can you get to Beaverton?", a: "[Typical arrival time and where the team is based.]" },
  { q: "Do you charge a trip fee to Beaverton?", a: "[Trip fee policy.]" },
  { q: "Do you work on both homes and businesses in Beaverton?", a: "Yes. We handle residential and commercial work." },
  { q: "Are you licensed?", a: `Yes. Oregon contractor license ${site.license} and certified locksmith ${site.certification}.` },
];

export default function BeavertonPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Beaverton", path: "/locations/beaverton" }])} />
      <nav aria-label="Breadcrumb" className="border-b border-line text-[0.875rem] text-muted">
        <ol className="wrap flex gap-2 py-3">
          <li><Link href="/" className="hover:text-ink">Home</Link></li>
          <li aria-hidden>·</li>
          <li>Locations</li>
          <li aria-hidden>·</li>
          <li className="text-ink" aria-current="page">Beaverton</li>
        </ol>
      </nav>

      <Hero badge="Serving Beaverton · Open 24/7" title="Locksmith & garage door service" accent="in Beaverton, OR" form={<QuoteForm />}>
        <p className="mt-6 max-w-[36rem] text-[1rem] leading-relaxed text-muted">
          Locked out, broken garage door, or a gate that won&apos;t close? Alpha serves homes and businesses in
          Beaverton, day or night.
        </p>
        <ul className="mt-5 space-y-2 text-[0.875rem]">
          {["[Typical arrival time to Beaverton]", "Written quote before any work starts", `Licensed and certified, ${site.license}`].map((t) => (
            <li key={t} className="flex items-center gap-2"><CheckIcon className="text-orange" /> {t}</li>
          ))}
        </ul>
        <a href={site.phoneHref} className="btn mt-7 px-6 py-3.5 text-[1.4rem]"><PhoneIcon /> Call {site.phone}</a>
      </Hero>

      <TrustBar />

      <section className="wrap py-14">
        <h2 className="h-section">Our services in Beaverton</h2>
        <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const Icon = serviceIcons[s.icon];
            return (
              <li key={s.title} className="card flex flex-col p-5">
                <Icon className="size-5 text-orange" />
                <h3 className="mt-4 text-base">{s.title}</h3>
                <p className="mt-2 flex-1 text-[0.875rem] leading-relaxed text-muted">{s.body.replace(/\.$/, "")} in Beaverton.</p>
                <Link href="#" className="mt-4 text-[0.875rem] font-bold text-orange hover:underline">{s.cta.replace(" services", "")} in Beaverton →</Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="bg-bg-alt py-14">
        <div className="wrap grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="h-section">Your local Beaverton team</h2>
            <p className="mt-4 text-[0.875rem] leading-relaxed text-muted">
              [Local intro, written for Beaverton only: neighborhoods you work in most, the kinds of jobs you see
              here (e.g. older homes, office parks, apartment gates), and how quickly you can get there from your base.]
            </p>
            <h3 className="mt-6 text-base">ZIP codes we serve</h3>
            <ul className="mt-3 flex flex-wrap gap-2">{zips.map((z) => (<li key={z} className="chip">{z}</li>))}</ul>
            <h3 className="mt-6 text-base">Neighborhoods</h3>
            <p className="mt-2 text-[0.875rem] text-muted">[List the Beaverton neighborhoods you serve]</p>
          </div>
          <GoogleMap className="min-h-64 h-full" />
        </div>
      </section>

      <section className="py-14">
        <div className="wrap">
          <h2 className="h-section">Recent jobs in Beaverton</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <li key={i}>
                <Placeholder label="Job photo" className="aspect-[4/3]" />
                <p className="mt-2 text-[0.875rem] text-muted">[Job type, Beaverton · Month Year]</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="reviews" className="bg-bg-alt py-14">
        <div className="wrap">
          <h2 className="h-section">What Beaverton customers say</h2>
          <div className="mt-6"><Reviews items={reviews} /></div>
        </div>
      </section>

      <section className="py-14">
        <div className="wrap">
          <h2 className="h-section">Frequently asked questions</h2>
          <div className="mt-6"><Faq items={faqs} /></div>
        </div>
      </section>
    </>
  );
}
