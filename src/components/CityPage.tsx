import Link from "next/link";
import { site, homeReviews } from "@/lib/site";
import { serviceCards, cityServicePath } from "@/lib/services";
import { cityHref, type City } from "@/lib/cities";
import { breadcrumbJsonLd } from "@/lib/seo";
import { TrustBar, Hero, Faq } from "./Shared";
import { ReviewsCarousel } from "./ReviewsCarousel";
import { RecentJobs } from "./RecentJobs";
// AdSense is disabled. See src/lib/ads.ts to turn it back on.
// import { AdSlot } from "./AdSlot";
import { GoogleMap } from "./GoogleMap";
import { JsonLd } from "./JsonLd";
import { CheckIcon, PhoneIcon, serviceIcons } from "./Icons";


export function CityPage({ city }: { city: City }) {
  const { name, state } = city;
  const path = `/locations/${city.slug}`;
  const nearbyText = new Intl.ListFormat("en", { type: "conjunction" }).format(city.nearby.slice(0, 4));
  const faqs = [
    { q: `How fast can you get to ${name}?`, a: `Call us any time, day or night. We give you an arrival time to ${name} when you call, based on where our team is and what you need.` },
    { q: `Do you charge a trip fee to ${name}?`, a: "We confirm the full price, including any service call or travel charge, in writing before work starts, so there are no surprises." },
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

      <Hero badge={`Serving ${name} · Open 24/7`} title="Locksmith & garage door service" accent={`in ${name}, ${state}`}>
        <p className="mt-6 max-w-[36rem] text-body leading-relaxed text-muted">
          Locked out, broken garage door, or a gate that won&apos;t close? Alpha serves homes and businesses in {name},
          day or night.
        </p>
        <ul className="mt-5 space-y-2 text-body">
          {[`Open 24/7 in ${name}`, "Written quote before any work starts", `Licensed and certified, ${site.license}`].map((t) => (
            <li key={t} className="flex items-center gap-2"><CheckIcon className="text-orange" /> {t}</li>
          ))}
        </ul>
        <a href={site.phoneHref} className="btn mt-7 px-6 py-3.5 text-sub"><PhoneIcon /> Call {site.phone}</a>
      </Hero>

      <TrustBar />

      <section data-section="services" className="wrap py-8 sm:py-14">
        <h2 className="h-section">Our services in {name}</h2>
        <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {serviceCards.map((s) => {
            const Icon = serviceIcons[s.icon];
            const href = cityServicePath(city.slug, s.slug);
            return (
              <li key={s.slug} className="card flex flex-col p-5">
                <Icon className="size-5 text-orange" />
                <h3 className="mt-4 text-title">{s.title}</h3>
                <p className="mt-2 flex-1 text-body leading-relaxed text-muted">{s.body.replace(/\.$/, "")} in {name}.</p>
                <Link href={href} className="mt-4 text-body font-bold text-orange hover:underline">
                  {s.cta}&nbsp;in&nbsp;{name.replace(/ /g, " ")}&nbsp;→
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section data-section="local_team_and_map" className="bg-bg-alt py-8 sm:py-14">
        <div className="wrap grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="h-section">Your local {name} team</h2>
            <p className="mt-4 text-body leading-relaxed text-muted">
              Alpha serves homes and businesses in {name} and nearby {nearbyText}. Call any time, day or night, and you
              talk to the team that does the work: lockouts, rekeys and lock changes, garage doors and springs, automatic
              gates, fences and access control.
            </p>
            <h3 className="mt-6 text-title">ZIP codes we serve</h3>
            <ul className="mt-3 flex flex-wrap gap-2">{city.zips.map((z) => (<li key={z} className="chip">{z}</li>))}</ul>
          </div>
          <GoogleMap place={`${name}, ${state}`} className="h-full min-h-64" />
        </div>
      </section>

      <section data-section="recent_jobs" className="py-8 sm:py-14">
        <div className="wrap">
          <h2 className="h-section">Recent jobs near you</h2>
          <RecentJobs name={name} />
        </div>
      </section>

      {/* <AdSlot placement="city_mid" /> */}

      <section id="reviews" data-section="reviews" className="bg-bg-alt py-8 sm:py-14">
        <div className="wrap">
          <ReviewsCarousel items={homeReviews} title={`What ${name} customers say`} />
        </div>
      </section>

      <section data-section="faq" className="py-8 sm:py-14">
        <div className="wrap">
          <h2 className="h-section">Frequently asked questions</h2>
          <div className="mt-6"><Faq items={faqs} /></div>
        </div>
      </section>

      {/* <AdSlot placement="city_bottom" /> */}

      <section data-section="nearby_areas" className="border-t border-line bg-bg-alt py-8 sm:py-14">
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
