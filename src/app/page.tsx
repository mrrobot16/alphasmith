import Image from "next/image";
import Link from "next/link";
import { site, services, cities } from "@/lib/site";
import { serviceIcons, PhoneIcon } from "@/components/Icons";
import { QuoteForm } from "@/components/QuoteForm";
import { TrustBar, Hero } from "@/components/Shared";
import { GoogleMap } from "@/components/GoogleMap";
import { WorkGallery } from "@/components/WorkGallery";

export default function Home() {
  return (
    <>
      <Hero
        badge="Open now · Answering 24/7"
        title="Portland locksmith & garage door repair ·"
        accent="Open 24/7"
        form={<QuoteForm />}
      >
        <p className="mt-6 max-w-[36rem] text-[1.1rem] font-semibold leading-snug">
          Reliable Portland locksmith, garage door, and automatic gate services.{" "}
          <span className="text-orange">Local expertise, quick and friendly service here when you need us.</span>
        </p>
        <p className="mt-4 max-w-[36rem] text-[1rem] leading-relaxed text-muted">
          Commercial &amp; residential licensed locksmith and garage door service for the Portland area. Tap to
          call and talk to the team that does the work.
        </p>
        <a href={site.phoneHref} className="btn mt-7 px-6 py-3.5 text-[1.5rem]">
          <PhoneIcon /> Call {site.phone}
        </a>
      </Hero>

      <TrustBar />

      <section id="services" className="wrap py-16">
        <h2 className="h-section">Our services</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const Icon = serviceIcons[s.icon];
            return (
              <li key={s.title} className="card flex flex-col p-5">
                <Icon className="size-5 text-orange" />
                <h3 className="mt-5 text-lg">{s.title}</h3>
                <p className="mt-3 flex-1 text-[0.875rem] leading-relaxed text-muted">{s.body}</p>
                <Link
                  href={"href" in s ? s.href : "#"}
                  className="mt-5 text-[0.875rem] font-bold text-orange hover:underline"
                >
                  {s.cta} →
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="border-t border-line py-16">
        <div className="wrap">
          <h2 className="h-section">Our work</h2>
          <div className="mt-6">
            <WorkGallery />
          </div>
        </div>
      </section>

      <section id="about" className="bg-bg-alt py-16">
        <div className="wrap grid items-center gap-8 md:grid-cols-[340px_1fr] md:gap-12">
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
            <p className="eyebrow">About us</p>
            <h2 className="mt-2 text-[clamp(2.2rem,4.4vw,3.6rem)]">Meet Andres, the owner</h2>
            <p className="mt-4 max-w-[34rem] text-[1rem] leading-relaxed">
              Alpha Locksmith &amp; Garage is owned and run by Andres, a licensed Oregon locksmith and contractor.
              When you call, you talk to the team that does the work, and Andres stands behind every job, from a
              2 a.m. lockout to a new garage door.
            </p>
            <p className="mt-3 text-[0.875rem] text-muted">
              [Andres&apos;s story: how long he&apos;s been in the trade, how Alpha started, and what customers can
              count on.]
            </p>
            <dl className="mt-6 grid max-w-xl grid-cols-2 gap-5 sm:grid-cols-4">
              {[
                ["10+ years", "in the trade"],
                [site.license, "Oregon contractor license"],
                [site.certification, "Certified locksmith"],
                ["24/7", "Emergency service"],
              ].map(([v, l]) => (
                <div key={l} className="border-l-2 border-orange pl-3">
                  <dt className="font-display text-lg font-bold leading-none">{v}</dt>
                  <dd className="mt-1 text-[0.875rem] text-muted">{l}</dd>
                </div>
              ))}
            </dl>
            <a href={site.phoneHref} className="btn mt-7 px-5 py-2.5 text-[0.95rem]">
              Call {site.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="bg-orange py-14 text-black">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="text-[clamp(2.2rem,4.4vw,3.6rem)]">Do you serve my area?</h2>
              <p className="mt-3 text-[0.9rem] font-medium">We cover a 30-mile radius around Portland, Oregon.</p>
              <hr className="my-4 border-t-2 border-black" />
              <h3 className="text-lg">Don&apos;t see your city?</h3>
              <p className="mt-2 max-w-md text-[0.875rem] font-medium leading-relaxed">
                We often travel outside our usual area. Give us a call before you look elsewhere, there&apos;s a good
                chance we can still help.
              </p>
              <a href={site.phoneHref} className="mt-3 inline-block text-[0.875rem] font-bold underline">
                Call {site.phone} →
              </a>
            </div>
            <div>
              <p className="font-display text-[0.875rem] font-bold uppercase tracking-[0.14em]">Cities we serve</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {cities.map((c) => (
                  <li key={c}>
                    <Link
                      href={c === "Beaverton" ? "/locations/beaverton" : "#"}
                      className="chip !border-black !text-black transition-colors hover:!bg-black hover:!text-white"
                    >
                      {c}
                    </Link>
                  </li>
                ))}
                <li className="chip !border-black !bg-black !text-white">+22 more</li>
              </ul>
            </div>
          </div>
          <GoogleMap className="mt-8 h-72 !border-2 !border-black" />
        </div>
      </section>
    </>
  );
}
