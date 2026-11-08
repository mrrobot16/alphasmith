import { site } from "@/lib/site";
import { ShieldIcon, KeyIcon, DocIcon, AwardIcon } from "./Icons";

export function TrustBar() {
  const items = [
    { Icon: ShieldIcon, label: "Contractor license", value: site.license },
    { Icon: KeyIcon, label: "Locksmith certification", value: site.certification },
    { Icon: DocIcon, label: null, value: "Insured and bonded" },
    { Icon: AwardIcon, label: "BBB rating", value: site.bbb },
  ];
  return (
    <div className="border-y border-line bg-surface/60">
      <ul className="wrap grid grid-cols-2 gap-x-6 gap-y-4 py-5 lg:grid-cols-4">
        {items.map(({ Icon, label, value }) => (
          <li key={value} className="flex items-center gap-3">
            <Icon className="size-5 shrink-0 text-orange" />
            <span className="leading-tight">
              {label && (
                <span className="block text-[0.875rem] font-medium uppercase tracking-[0.12em] text-muted">
                  {label}
                </span>
              )}
              <span className="font-display text-base font-bold">{value}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StickyCall() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-black bg-orange text-black">
      <div className="wrap flex items-center justify-between gap-4 py-2.5">
        <span className="flex items-center gap-2 text-[0.875rem] font-bold">
          <span className="size-1.5 rounded-full bg-black" />
          <span>
            Open now<span className="hidden sm:inline"> · Licensed {site.license}</span>
          </span>
        </span>
        <a
          href={site.phoneHref}
          className="btn !bg-black px-5 py-2.5 text-[0.95rem] !text-white"
        >
          Tap to call {site.phone}
        </a>
      </div>
    </div>
  );
}

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-3">
      {items.map((f) => (
        <details key={f.q} className="card group px-5 py-4">
          <summary className="font-display text-base font-semibold">{f.q}</summary>
          <p className="mt-3 text-[0.92rem] leading-relaxed text-muted">{f.a}</p>
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
          <p className="mt-3 text-[0.92rem] leading-relaxed">{r.text}</p>
          <p className="mt-3 text-[0.875rem] text-muted">{r.by}</p>
        </li>
      ))}
    </ul>
  );
}

export function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div
      className={`grid place-items-center rounded-lg border border-line bg-surface text-center text-[0.875rem] text-muted ${className}`}
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
}: {
  badge: string;
  title: string;
  accent: string;
  children: React.ReactNode;
  form: React.ReactNode;
}) {
  return (
    <section className="wrap grid gap-10 py-12 lg:grid-cols-[1fr_340px] lg:gap-20 lg:py-20">
      <div className="rise">
        <p className="inline-flex items-center gap-2 rounded-full border border-orange/70 px-3 py-1 font-display text-[0.875rem] font-semibold uppercase tracking-[0.12em] text-orange">
          <span className="size-1.5 rounded-full bg-orange" /> {badge}
        </p>
        <h1 className="mt-5 text-[clamp(2.4rem,5.4vw,4.25rem)] font-extrabold max-w-[14em]">
          {title} <span className="text-orange">{accent}</span>
        </h1>
        {children}
      </div>
      <div className="rise [animation-delay:80ms]">{form}</div>
    </section>
  );
}
