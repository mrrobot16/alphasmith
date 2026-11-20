import Image from "next/image";
import Link from "next/link";
import { site, homeReviews } from "@/lib/site";
import { cityServicePath, type ServicePageConfig } from "@/lib/services";
import { cityHref, getCity, type City } from "@/lib/cities";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { TrustBar, Hero, Faq } from "./Shared";
import { ReviewsCarousel } from "./ReviewsCarousel";
import { JsonLd } from "./JsonLd";
import { StepsList } from "./StepsList";
// AdSense is disabled. See src/lib/ads.ts to turn it back on.
// import { AdSlot } from "./AdSlot";
import { CheckIcon, PhoneIcon, WarnIcon } from "./Icons";

/** Renders **bold** segments inside a plain string. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) => (i % 2 ? <b key={i}>{part}</b> : <span key={i}>{part}</span>))}
    </>
  );
}

export function ServicePage({ c, city }: { c: ServicePageConfig; city: City }) {
  const pagePath = cityServicePath(city.slug, c.slug);
  // Nearby cities, each linking to the same service in that city.
  const areas = city.nearby.map((a) => {
    const other = getCity(cityHref(a)?.split("/").pop() ?? "");
    return { label: a, href: other ? cityServicePath(other.slug, c.slug) : undefined };
  });
  return (
    <>
      <JsonLd data={serviceJsonLd({ name: c.schema.name, description: c.schema.description, path: pagePath, area: `${city.name}, ${city.state}` })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: city.name, path: `/locations/${city.slug}` }, { name: c.crumbs.label, path: pagePath }])} />
      <nav aria-label="Breadcrumb" className="border-b border-line text-small text-muted">
        <ol className="wrap flex gap-2 py-3">
          <li><Link href="/" className="hover:text-ink">Home</Link></li>
          <li aria-hidden>·</li>
          <li><Link href={`/locations/${city.slug}`} className="hover:text-ink">{city.name}</Link></li>
          <li aria-hidden>·</li>
          <li className="text-ink" aria-current="page">{c.crumbs.label}</li>
        </ol>
      </nav>

      <Hero badge={c.hero.badge} title={c.hero.title} accent={c.hero.accent}
        asideWide
        asideHiddenOnPhones
        form={
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line lg:aspect-[5/4]">
            <Image
              src={c.hero.image.src}
              alt={c.hero.image.alt}
              fill
              priority
              sizes="(min-width:1024px) 520px, 100vw"
              className="object-cover"
            />
          </div>
        }
      >
        <p className="mt-6 max-w-[36rem] text-body leading-relaxed text-muted">{c.hero.lead}</p>
        <ul className="mt-5 space-y-2 text-body">
          {c.hero.checks.map((t) => (
            <li key={t} className="flex items-center gap-2">
              <CheckIcon className="text-orange" /> {t}
            </li>
          ))}
        </ul>
        <a href={site.phoneHref} className="btn mt-7 px-6 py-3.5 text-sub">
          <PhoneIcon /> Call {site.phone}
        </a>
      </Hero>

      <TrustBar />

      <div data-section="warning_band" className="bg-orange text-black">
        <div className="wrap flex flex-col items-start gap-3 py-4 md:flex-row md:items-center md:justify-between md:gap-6">
          <p className="flex min-w-0 flex-1 items-center gap-3 text-body">
            <WarnIcon className="shrink-0" />
            <span>
              <b>{c.warning.bold}</b> {c.warning.text}
            </span>
          </p>
          <a href={site.phoneHref} className="btn shrink-0 whitespace-nowrap !bg-black px-4 py-2 text-body !text-white">Call now</a>
        </div>
      </div>

      <section data-section="signs_and_info" className="wrap grid gap-6 py-8 sm:py-14 md:grid-cols-2 md:gap-10">
        <div>
          <h2 className="h-section">{c.signs.title}</h2>
          <ul className="mt-5 space-y-3 text-body">
            {c.signs.items.map((s) => (
              <li key={s} className="flex items-center gap-2"><CheckIcon className="text-orange" /> {s}</li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="h-section">{c.info.title}</h2>
          <p className="mt-4 text-body leading-relaxed"><Rich text={c.info.body} /></p>
        </div>
      </section>

      {/* <AdSlot placement="service_mid" /> */}

      <section data-section="how_it_works" className="bg-bg-alt py-8 sm:py-14">
        <div className="wrap">
          <h2 className="h-section">{c.steps.title}</h2>
          <StepsList items={c.steps.items} />
        </div>
      </section>

      <section data-section="brands" className="py-8 sm:py-14">
        <div className="wrap">
          <h2 className="h-section">{c.brands.title}</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {c.brands.items.map((b) => (<li key={b} className="chip !rounded-md">{b}</li>))}
          </ul>
        </div>
      </section>

      <section id="reviews" data-section="reviews" className="bg-bg-alt py-8 sm:py-14">
        <div className="wrap">
          <ReviewsCarousel items={homeReviews} />
        </div>
      </section>

      <section id="faq" data-section="faq" className="py-8 sm:py-14">
        <div className="wrap">
          <h2 className="h-section">Frequently asked questions</h2>
          <div className="mt-6"><Faq items={c.faqs} /></div>
        </div>
      </section>

      {/* <AdSlot placement="service_bottom" /> */}

      <section data-section="areas_and_related" className="bg-bg-alt py-8 sm:py-14">
        <div className="wrap">
          <h2 className="h-section">{c.near.title}</h2>
          <p className="mt-3 text-small text-muted">{c.near.intro}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {areas.map((a) => (
              <li key={a.label}>
                {a.href ? <Link href={a.href} className="chip">{a.label}</Link> : <span className="chip">{a.label}</span>}
              </li>
            ))}
          </ul>
          <h3 className="mt-10 text-sub">Related services</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {c.related.map((r) => {
              const href = r.slug ? cityServicePath(city.slug, r.slug) : undefined;
              return (
                <li key={r.label}>
                  {href ? <Link href={href} className="chip">{r.label}</Link> : <span className="chip">{r.label}</span>}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </>
  );
}
