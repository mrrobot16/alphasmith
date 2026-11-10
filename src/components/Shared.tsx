import Link from "next/link";
import { site } from "@/lib/site";
import { ShieldIcon, KeyIcon, DocIcon, AwardIcon, PhoneIcon } from "./Icons";

export function TrustBar() {
  const items = [
    { Icon: ShieldIcon, label: "Contractor", more: " license", value: site.license },
    { Icon: KeyIcon, label: "Locksmith", more: " certification", value: site.certification },
    { Icon: DocIcon, label: null, more: "", value: "Insured and bonded" },
    { Icon: AwardIcon, label: "BBB rating", more: "", value: site.bbb },
  ];
  return (
    <div data-section="trust_bar" className="border-y border-line bg-surface/60">
      <ul className="wrap grid grid-cols-2 gap-x-6 gap-y-4 py-5 lg:grid-cols-4">
        {items.map(({ Icon, label, more, value }) => (
          <li key={value} className="flex items-center gap-3">
            <Icon className="size-5 shrink-0 text-orange" />
            <span className="leading-tight">
              {label && (
                <span className="block text-label font-medium uppercase tracking-[0.12em] text-muted">
                  {label}
                  {more && <span className="hidden sm:inline">{more}</span>}
                </span>
              )}
              <span className="font-display text-title font-bold">{value}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StickyCall() {
  return (
    <>
      {/* Phones and tablets: status line, call and quote buttons. */}
      <div data-section="sticky_call_bar" className="fixed inset-x-0 bottom-0 z-40 border-t-[3px] border-orange bg-black lg:hidden">
        <div className="wrap pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-2.5">
          <p className="flex items-center justify-center gap-2 text-small font-semibold">
            <span className="grid size-3.5 place-items-center rounded-full bg-orange/30">
              <span className="size-2 rounded-full bg-orange" />
            </span>
            Open now · a real person answers 24/7
          </p>
          <div className="mt-2.5 flex gap-3">
            <a href={site.phoneHref} className="btn min-w-0 flex-1 whitespace-nowrap px-3 py-3 text-title !text-black sm:text-sub">
              <PhoneIcon className="size-5 shrink-0" /> Call {site.phone}
            </a>
            <Link
              href="/#quote"
              data-track-label="Quote"
              className="btn !border-2 !border-solid !border-[#4a4a4a] !bg-black px-6 py-3 text-title !text-white sm:text-sub"
            >
              Quote
            </Link>
          </div>
        </div>
      </div>

      <div data-section="sticky_call_bar" className="fixed inset-x-0 bottom-0 z-40 hidden border-t-2 border-black bg-orange text-black lg:block">
        <div className="wrap flex items-center justify-between gap-4 py-2.5">
          <span className="flex items-center gap-2 text-small font-bold">
            <span className="size-1.5 rounded-full bg-black" />
            <span>
              Open now<span className="hidden sm:inline"> · Licensed {site.license}</span>
            </span>
          </span>
          <a href={site.phoneHref} className="btn !bg-black px-5 py-2.5 text-body !text-white">
            Tap to call {site.phone}
          </a>
        </div>
      </div>
    </>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((f) => (
        <details key={f.q} className="card group px-5 py-4">
          <summary className="font-display text-title font-semibold">{f.q}</summary>
          <p className="mt-3 text-body leading-relaxed text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function Reviews({ items }: { items: { text: string; by: string }[] }) {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {items.map((r) => (
        <li key={r.text} className="card p-5">
          <p className="text-orange" aria-label="5 out of 5 stars">
            ★★★★★
          </p>
          <p className="mt-3 text-body leading-relaxed">{r.text}</p>
          <p className="mt-3 text-small text-muted">{r.by}</p>
        </li>
      ))}
    </ul>
  );
}

export function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`grid place-items-center rounded-lg border border-line bg-surface text-center text-small text-muted ${className}`}
    >
      <span className="px-4">[{label}]</span>
    </div>
  );
}

export function Hero({
  badge,
  title,
  accent,
  children,
  form,
  formDesktopOnly = false,
  asideWide = false,
}: {
  badge: string;
  title: string;
  accent: string;
  children: React.ReactNode;
  form?: React.ReactNode;
  /** Home page: below lg the form is shown further down the page instead. */
  formDesktopOnly?: boolean;
  /** Wider right column, for a photo instead of the 340px quote form. */
  asideWide?: boolean;
}) {
  return (
    <section
      data-section="hero"
      className={`wrap grid gap-10 py-12 lg:py-20 ${form ? (asideWide ? "lg:grid-cols-[1fr_minmax(0,520px)] lg:items-center lg:gap-14" : "lg:grid-cols-[1fr_340px] lg:gap-20") : ""}`}
    >
      <div className="rise">
        <p className="inline-flex items-center gap-2.5 rounded-full border border-orange/70 py-1.5 pl-2.5 pr-4 font-display text-small font-semibold uppercase tracking-[0.12em] text-orange">
          <span className="grid size-4 place-items-center rounded-full bg-orange/30">
            <span className="size-2.5 rounded-full bg-orange" />
          </span>
          {badge}
        </p>
        <h1 className="mt-5 max-w-[14em] text-[clamp(2.5rem,5.4vw,4.25rem)] font-extrabold ![text-wrap:wrap] lg:![text-wrap:balance]">
          {title} <span className="text-orange">{accent}</span>
        </h1>
        {children}
      </div>
      {form && <div className={`rise [animation-delay:80ms] ${formDesktopOnly ? "hidden lg:block" : ""}`}>{form}</div>}
    </section>
  );
}
