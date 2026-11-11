import Link from "next/link";
import { site } from "@/lib/site";
import { Logo } from "./Logo";

const CCB_SEARCH = "https://search.ccb.state.or.us/search/business_details.aspx";

export function NeedHelpBand() {
  return (
    <section data-section="need_help_band" className="hidden border-t-[3px] border-orange bg-black py-12 lg:block">
      <div className="wrap flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div>
          <h2 className="h-section">Need help now?</h2>
          <p className="mt-2 text-body">Call any time, day or night. Locksmith, garage door, gate and fence service.</p>
        </div>
        <a href={site.phoneHref} className="btn px-8 py-4 text-sub !text-black">
          {site.phone}
        </a>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <>
      <NeedHelpBand />
      <footer data-section="footer" className="border-t border-line bg-bg">
        <div className="wrap grid gap-10 py-12 md:grid-cols-3">
          <div>
            <Logo size="lg" />
            <p className="mt-3 text-small font-bold">Alpha Locksmith and Garage</p>
            <ul className="mt-2 space-y-1.5 text-small">
              <li>
                <a href={site.phoneHref} className="hover:text-orange">{site.phone}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-orange">{site.email}</a>
              </li>
              <li className="text-muted">Open 24 hours, 7 days</li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-label font-bold uppercase tracking-[0.14em]">Licensed and certified</h2>
            <ul className="mt-3 space-y-1.5 text-small">
              <li>
                <a href={CCB_SEARCH} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-orange md:text-ink md:underline">
                  Contractor License {site.license}
                </a>
              </li>
              <li>
                <a href={CCB_SEARCH} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-orange md:text-ink md:underline">
                  Locksmith Certification {site.certification}
                </a>
              </li>
              <li>
                <a href={site.bbbUrl} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-orange md:text-ink md:underline">
                  BBB Rating {site.bbb}
                </a>
              </li>
              <li className="hidden text-muted md:list-item">Issued by the Oregon Construction Contractors Board</li>
              <li className="hidden text-muted md:list-item">[Insured and bonded]</li>
            </ul>
          </div>

          <div>
            <nav aria-label="Company" className="hidden md:block">
              <h2 className="font-display text-label font-bold uppercase tracking-[0.14em]">Company</h2>
              <ul className="mt-3 space-y-1.5 text-small text-muted">
                {[
                  ["About Us", "/#about"],
                  ["Reviews", "/#reviews"],
                  ["FAQ", "/garage-door-services/spring-repair#faq"],
                  ["Contact and booking", "/#quote"],
                ].map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="hover:text-orange">{label}</Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="md:mt-8">
              <h2 className="font-display text-label font-bold uppercase tracking-[0.14em]">Follow us</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {site.social.map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${site.name} on ${s.label} (${s.handle})`}
                      className="chip px-4 py-2 text-body"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
