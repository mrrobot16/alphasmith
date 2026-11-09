import Image from "next/image";
import Link from "next/link";
import { site, services } from "@/lib/site";
import { cityHref, type City } from "@/lib/cities";
import { breadcrumbJsonLd } from "@/lib/seo";
import { QuoteForm } from "./QuoteForm";
import { TrustBar, Hero, Faq, Reviews } from "./Shared";
import { GoogleMap } from "./GoogleMap";
import { JsonLd } from "./JsonLd";
import { CheckIcon, PhoneIcon, serviceIcons } from "./Icons";

const REVIEW_BY = "[First name L.] · [Town] · Google · [Month Year]";

// Replace with real photos of jobs in each city when available.
const recentJobs = [
  { src: "/work/job-slat-gate.jpg", alt: "Black steel slat driveway gate installed by Alpha" },
  { src: "/work/job-overhead-door.jpg", alt: "Alpha technician inspecting an overhead door" },
  { src: "/work/job-door-hardware.jpg", alt: "Installing new door hardware" },
];

export function CityPage({ city }: { city: City }) {
  const { name } = city;
  const path = `/locations/${city.slug}`;
  const reviews = [
    { text: `[Real Google review about a lockout in ${name}, in the customer's words.]`, by: REVIEW_BY },
    { text: `[Real Google review about a garage door repair in ${name}, in the customer's words.]`, by: REVIEW_BY },
    { text: `[Real Google review about a gate or access control job in ${name}, in the customer's words.]`, by: REVIEW_BY },
  ];
  const faqs = [
    { q: `How fast can you get to ${name}?`, a: "[Typical arrival time and where the team is based.]" },
    { q: `Do you charge a trip fee to ${name}?`, a: "[Trip fee policy.]" },
    { q: `Do you work on both homes and businesses in ${name}?`, a: "Yes. We handle residential and commercial work." },
    { q: "Are you licensed?", a: `Yes. Oregon contractor license ${site.license} and certified locksmith ${site.certification}.` },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name, path }])} />
      <nav aria-label="Breadcrumb" className="border-b border-line text-small text-muted">
        <ol className="wrap flex gap-2 py-3">
          <li><Link href="/" className="hover:text-ink">Home</Link></li>
          <li aria-hidden>·</li>
          <li><Link href="/#service-area" className="hover:text-ink">Locations</Link></li>
          <li aria-hidden>·</li>
          <li className="text-ink" aria-current="page">{name}</li>
        </ol>
      </nav>

      <Hero badge={`Serving ${name} · Open 24/7`} title="Locksmith & garage door service" accent={`in ${name}, OR`} form={<QuoteForm />}>
        <p className="mt-6 max-w-[36rem] text-body leading-relaxed text-muted">
          Locked out, broken garage door, or a gate that won&apos;t close? Alpha serves homes and businesses in {name},
          day or night.
        </p>
        <ul className="mt-5 space-y-2 text-body">
          {[`[Typical arrival time to ${name}]`, "Written quote before any work starts", `Licensed and certified, ${site.license}`].map((t) => (
            <li key={t} className="flex items-center gap-2"><CheckIcon className="text-orange" /> {t}</li>
          ))}
        </ul>
        <a href={site.phoneHref} className="btn mt-7 px-6 py-3.5 text-sub"><PhoneIcon /> Call {site.phone}</a>
      </Hero>

      <TrustBar />

      <section className="wrap py-14">
        <h2 className="h-section">Our services in {name}</h2>
        <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const Icon = serviceIcons[s.icon];
            return (
              <li key={s.title} className="card flex flex-col p-5">
                <Icon className="size-5 text-orange" />
                <h3 className="mt-4 text-title">{s.title}</h3>
                <p className="mt-2 flex-1 text-body leading-relaxed text-muted">{s.body.replace(/\.$/, "")} in {name}.</p>
                <Link href={s.href} className="mt-4 text-body font-bold text-orange hover:underline">
                  {s.cta.replace(" services", "")}&nbsp;in&nbsp;{name.replace(/ /g, " ")}&nbsp;→
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="bg-bg-alt py-14">
        <div className="wrap grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="h-section">Your local {name} team</h2>
            <p className="mt-4 text-body leading-relaxed text-muted">
              [Local intro, written for {name} only: neighborhoods you work in most, the kinds of jobs you see here
              (e.g. older homes, office parks, apartment gates), and how quickly you can get there from your base.]
            </p>
            <h3 className="mt-6 text-title">ZIP codes we serve</h3>
            <ul className="mt-3 flex flex-wrap gap-2">{city.zips.map((z) => (<li key={z} className="chip">{z}</li>))}</ul>
            <h3 className="mt-6 text-title">Neighborhoods</h3>
            <p className="mt-2 text-small text-muted">[List the {name} neighborhoods you serve]</p>
          </div>
          <GoogleMap place={`${name}, OR`} className="h-full min-h-64" />
        </div>
      </section>

      <section className="py-14">
        <div className="wrap">
          <h2 className="h-section">Recent jobs in {name}</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {recentJobs.map((j) => (
              <li key={j.src}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line">
                  <Image src={j.src} alt={j.alt} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
                </div>
                <p className="mt-2 text-small text-muted">[Job type, {name} · Month Year]</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="reviews" className="bg-bg-alt py-14">
        <div className="wrap">
          <h2 className="h-section">What {name} customers say</h2>
          <div className="mt-6"><Reviews items={reviews} /></div>
        </div>
      </section>

      <section className="py-14">
        <div className="wrap">
          <h2 className="h-section">Frequently asked questions</h2>
          <div className="mt-6"><Faq items={faqs} /></div>
        </div>
      </section>

      <section className="border-t border-line bg-bg-alt py-14">
        <div className="wrap">
          <h2 className="h-section">Nearby areas we serve</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {city.nearby.map((a) => {
              const href = cityHref(a);
              return (
                <li key={a}>
                  {href ? (
                    <Link href={href} className="chip px-4 py-2 text-body">{a}</Link>
                  ) : (
                    <span className="chip px-4 py-2 text-body">{a}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
