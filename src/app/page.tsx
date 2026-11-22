import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { site, services, homeReviews, homeFaqs } from "@/lib/site";
import { serviceIcons, PhoneIcon } from "@/components/Icons";
import { QuoteForm } from "@/components/QuoteForm";
import { TrustBar, Hero, Faq } from "@/components/Shared";
import { Hours } from "@/components/Hours";
import { GoogleMap } from "@/components/GoogleMap";
import { pageMeta } from "@/lib/seo";
import { WorkGallery } from "@/components/WorkGallery";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { ServiceAreaCities } from "@/components/ServiceAreaCities";
// AdSense is disabled. See src/lib/ads.ts to turn it back on.
// import { AdSlot } from "@/components/AdSlot";

export const metadata: Metadata = {
  ...pageMeta({
    title: "Portland Locksmith & Garage Door Repair",
    description:
      "Licensed Portland locksmith, garage door and automatic gate service, open 24/7. Lockouts, rekeys, spring repair and gate repair. Call 503-505-8560.",
    path: "/",
  }),
  title: { absolute: "Portland Locksmith & Garage Door Repair" },
};

// Phone layout (below 1024px): the quote form sits after the services section instead of beside the hero.
export default function Home() {
  return (
    <>
      <Hero
        badge={<Hours open="Open now · Answering 24/7" closed="Licensed · Insured · Bonded" />}
        title="Portland locksmith & garage door repair ·"
        accent={<Hours open="Open 24/7" closed="Licensed & insured" />}
        form={<QuoteForm id="quote-hero" />}
        formDesktopOnly
      >
        <p className="mt-6 max-w-[36rem] text-lead font-semibold leading-snug">
          Reliable Portland locksmith, garage door, and automatic gate services.{" "}
          <span className="text-orange">Local expertise, quick and friendly service here when you need us.</span>
        </p>
        <p className="mt-4 max-w-[36rem] text-body leading-relaxed text-muted">
          Commercial &amp; residential licensed locksmith and garage door service for the Portland area. Tap to
          call and talk to the team that does the work.
        </p>
        <div className="hidden lg:block">
          <a href={site.phoneHref} className="btn mt-7 px-6 py-3.5 text-sub">
            <PhoneIcon /> Call {site.phone}
          </a>
        </div>
      </Hero>

      <TrustBar />

      <section id="services" data-section="services" className="wrap py-14 lg:py-16">
        <h2 className="h-section">Our services</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const Icon = serviceIcons[s.icon];
            const href = "href" in s ? s.href : "#";
            return (
              <li
                key={s.title}
                className="card relative flex items-center gap-4 p-5 sm:flex-col sm:items-stretch sm:gap-0"
              >
                <Icon className="size-7 shrink-0 text-orange sm:size-5" />
                <div className="min-w-0 flex-1 sm:flex sm:flex-col">
                  <h3 className="text-title sm:mt-5">{s.title}</h3>
                  <p className="mt-2 text-body leading-relaxed text-muted sm:mt-3 sm:flex-1">{s.body}</p>
                </div>
                {/* Phones: the whole card is the link, with an arrow. Larger screens keep the text link. */}
                <Link href={href} aria-label={s.title} className="absolute inset-0 sm:hidden" />
                <span aria-hidden className="text-sub font-bold text-orange sm:hidden">
                  →
                </span>
                <Link href={href} className="mt-5 hidden text-small font-bold text-orange hover:underline sm:block">
                  {s.cta}&nbsp;→
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* <AdSlot placement="home_mid" /> */}

      <section data-section="our_work" className="border-t border-line py-14 lg:py-16">
        <div className="wrap">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="h-section">Our work</h2>
            <p className="text-small text-muted sm:hidden">Real jobs by the Alpha team</p>
          </div>
          <div className="mt-6">
            <WorkGallery />
          </div>
        </div>
      </section>

      <section id="about" data-section="about" className="border-t border-line bg-bg-alt py-14 lg:border-t-0 lg:py-16">
        <div className="wrap grid items-center gap-8 md:grid-cols-[340px_1fr] md:gap-12">
          {/* Phones: eyebrow and heading come first, then the photo. */}
          <div className="md:hidden">
            <p className="eyebrow">About us</p>
            <h2 className="mt-3 h-section">Meet Andres</h2>
          </div>
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line">
            <Image
              src="/andres.jpg"
              alt="Andres, owner of Alpha Locksmith & Garage"
              fill
              sizes="(min-width:768px) 340px, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <div className="hidden md:block">
              <p className="eyebrow">About us</p>
              <h2 className="mt-2 h-section">Meet Andres, the owner</h2>
            </div>
            <p className="max-w-[34rem] text-body leading-relaxed md:mt-4">
              Alpha Locksmith &amp; Garage is owned and run by Andres, a licensed Oregon locksmith and contractor.
              When you call, you talk to the team that does the work, and Andres stands behind every job, from a
              2 a.m. lockout to a new garage door.
            </p>
            <dl className="mt-6 grid auto-rows-fr grid-cols-2 gap-3 md:flex md:flex-wrap md:gap-x-8 md:gap-y-5">
              {[
                ["10+ years", "in the trade"],
                [site.license, "Oregon contractor license"],
                [site.certification, "Certified locksmith"],
                [<Hours key="v" open="24/7" closed={site.bbb} />, <Hours key="l" open="Emergency service" closed="BBB rating" />],
              ].map(([v, l], i) => (
                <div
                  key={i}
                  className="rounded-lg border border-line bg-surface p-4 md:rounded-none md:border-0 md:border-l-2 md:border-orange md:bg-transparent md:p-0 md:pl-3"
                >
                  <dt className="font-display text-title font-bold leading-none text-orange md:text-ink">{v}</dt>
                  <dd className="mt-1.5 text-small leading-snug text-muted md:mt-1 md:whitespace-nowrap">{l}</dd>
                </div>
              ))}
            </dl>
            <div className="hidden md:block">
              <a href={site.phoneHref} className="btn mt-7 px-5 py-2.5 text-body">
                Call {site.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="service-area" data-section="service_area" className="scroll-mt-4 bg-orange py-14 text-black">
        <div className="wrap">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-0">
            <div className="lg:col-start-1 lg:row-start-1">
              <h2 className="h-section">Do you serve my area?</h2>
              <p className="mt-3 text-body font-medium">We cover a 30-mile radius around Portland, Oregon.</p>
            </div>
            <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <p className="hidden font-display text-label font-bold uppercase tracking-[0.14em] lg:block">
                Cities we serve
              </p>
              <ServiceAreaCities />
            </div>
            <div className="lg:col-start-1 lg:row-start-2">
              <hr className="mb-4 border-t-2 border-black lg:my-4" />
              <h3 className="text-title">Don&apos;t see your city?</h3>
              <p className="mt-2 max-w-md text-body font-medium leading-relaxed">
                We often travel outside our usual area. Give us a call before you look elsewhere, there&apos;s a good
                chance we can still help.
              </p>
              <a href={site.phoneHref} className="mt-3 inline-block text-body font-bold underline">
                Call {site.phone} →
              </a>
            </div>
          </div>
          <GoogleMap
            center={site.serviceAreaMap.center}
            zoom={site.serviceAreaMap.zoom}
            title="Map of the Portland metro area we serve"
            className="mt-8 h-96 !border-2 !border-black lg:h-[28rem]"
          />
        </div>
      </section>

      <section id="reviews" data-section="reviews" className="scroll-mt-6 py-14 lg:py-16">
        <div className="wrap">
          <ReviewsCarousel items={homeReviews} />
        </div>
      </section>

      <section id="faq" data-section="faq" className="scroll-mt-6 border-t border-line py-14 lg:py-16">
        <div className="wrap">
          <h2 className="h-section">Frequently asked questions</h2>
          <div className="mt-6"><Faq items={homeFaqs} /></div>
        </div>
      </section>

      {/* <AdSlot placement="home_bottom" /> */}

      {/* Phones and tablets: the quote form sits at the end of the page instead of beside the hero. It comes last, just above the footer. */}
      <section className="wrap pb-14 lg:hidden">
        <QuoteForm id="quote-m" />
      </section>
    </>
  );
}
