import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { serviceAreas, type ServicePageConfig } from "@/lib/services";
import { cityHref } from "@/lib/cities";
import { breadcrumbJsonLd, serviceJsonLd } from "@/lib/seo";
import { TrustBar, Hero, Faq, Reviews } from "./Shared";
import { JsonLd } from "./JsonLd";
import { CheckIcon, PhoneIcon, WarnIcon } from "./Icons";

/** Renders **bold** segments inside a plain string. */
function Rich({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) => (i % 2 ? <b key={i}>{part}</b> : <span key={i}>{part}</span>))}
    </>
  );
}

export function ServicePage({ c }: { c: ServicePageConfig }) {
  return (
    <>
      <JsonLd data={serviceJsonLd({ name: c.schema.name, description: c.schema.description, path: c.path })} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: c.crumbs.label, path: c.path }])} />
      <nav aria-label="Breadcrumb" className="border-b border-line text-small text-muted">
        <ol className="wrap flex gap-2 py-3">
          <li><Link href="/" className="hover:text-ink">Home</Link></li>
          <li aria-hidden>·</li>
          <li>{c.crumbs.category}</li>
          <li aria-hidden>·</li>
          <li className="text-ink" aria-current="page">{c.crumbs.label}</li>
        </ol>
      </nav>

      <Hero badge={c.hero.badge} title={c.hero.title} accent={c.hero.accent}
        asideWide
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

      <section data-section="signs_and_pricing" className="wrap grid gap-10 py-14 md:grid-cols-2">
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
          <div className="card mt-5 p-4">
            <p className="eyebrow !text-label">Pricing</p>
            <p className="mt-1 font-display text-sub font-bold uppercase">{c.info.priceLabel}</p>
            <p className="mt-1 text-small text-muted">{c.info.priceNote}</p>
          </div>
        </div>
      </section>

      <section data-section="how_it_works" className="bg-bg-alt py-14">
        <div className="wrap">
          <h2 className="h-section">{c.steps.title}</h2>
          <ol className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.steps.items.map(([n, t, b]) => (
              <li key={n} className="card p-5">
                <p className="font-display text-sub font-bold text-orange">{n}</p>
                <h3 className="mt-2 text-title">{t}</h3>
                <p className="mt-2 text-body leading-relaxed text-muted">{b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section data-section="brands" className="py-14">
        <div className="wrap">
          <h2 className="h-section">{c.brands.title}</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {c.brands.items.map((b) => (<li key={b} className="chip !rounded-md">{b}</li>))}
          </ul>
        </div>
      </section>

      <section id="reviews" data-section="reviews" className="bg-bg-alt py-14">
        <div className="wrap">
          <h2 className="h-section">What customers say</h2>
          <div className="mt-6"><Reviews items={c.reviews} /></div>
        </div>
      </section>

      <section id="faq" data-section="faq" className="py-14">
        <div className="wrap">
          <h2 className="h-section">Frequently asked questions</h2>
          <div className="mt-6"><Faq items={c.faqs} /></div>
        </div>
      </section>

      <section data-section="areas_and_related" className="bg-bg-alt py-14">
        <div className="wrap">
          <h2 className="h-section">{c.near.title}</h2>
          <p className="mt-3 text-small text-muted">{c.near.intro}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {serviceAreas.map((a) => {
              const href = cityHref(a);
              return (
                <li key={a}>
                  {href ? <Link href={href} className="chip">{a}</Link> : <span className="chip">{a}</span>}
                </li>
              );
            })}
          </ul>
          <h3 className="mt-10 text-sub">Related services</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {c.related.map((r) => (
              <li key={r.label}>
                {r.href ? <Link href={r.href} className="chip">{r.label}</Link> : <span className="chip">{r.label}</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
