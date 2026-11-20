import Link from "next/link";
import { site } from "@/lib/site";
// Add legalPlaceholders back to this import when the address or effective date is uncommented below.
import { type LegalBlock, type LegalDoc } from "@/lib/legal";

/** Renders [label](/path) links inside a plain string. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (!m) return <span key={i}>{part}</span>;
        return (
          <Link key={i} href={m[2]} className="font-semibold text-orange underline underline-offset-4 hover:text-ink">
            {m[1]}
          </Link>
        );
      })}
    </>
  );
}

function Contact() {
  return (
    <address className="card mt-4 not-italic">
      <div className="space-y-1.5 p-5 text-body">
        <p className="font-display text-title font-bold">{site.name}</p>
        <p>
          Email:{" "}
          <a href={`mailto:${site.email}`} className="underline underline-offset-4 hover:text-orange">
            {site.email}
          </a>
        </p>
        <p>
          Phone:{" "}
          <a href={site.phoneHref} className="underline underline-offset-4 hover:text-orange">
            {site.phone}
          </a>
        </p>
        {/* Hidden until the street address is confirmed. Set legalPlaceholders.address in lib/legal.ts, then uncomment.
        <p className="text-muted">Address: {legalPlaceholders.address}</p>
        */}
      </div>
    </address>
  );
}

function Block({ b }: { b: LegalBlock }) {
  if ("p" in b) return <p className="mt-4"><Inline text={b.p} /></p>;
  // Owner notes stay in the data but are hidden for now. Remove "hidden" to show them again.
  if ("todo" in b) return <p className="mt-4 hidden text-muted">{b.todo}</p>;
  if ("h" in b) return <h3 className="mt-8 text-title">{b.h}</h3>;
  if ("ul" in b)
    return (
      <ul className="mt-4 list-disc space-y-2 pl-5 marker:text-orange">
        {b.ul.map((t) => (
          <li key={t}><Inline text={t} /></li>
        ))}
      </ul>
    );
  if ("ol" in b)
    return (
      <ol className="mt-4 list-decimal space-y-2 pl-5 marker:text-orange">
        {b.ol.map((t) => (
          <li key={t}><Inline text={t} /></li>
        ))}
      </ol>
    );
  return <Contact />;
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export function LegalPage({ doc, path }: { doc: LegalDoc; path: string }) {
  return (
    <>
      <nav aria-label="Breadcrumb" className="border-b border-line text-small text-muted">
        <ol className="wrap flex gap-2 py-3">
          <li><Link href="/" className="hover:text-ink">Home</Link></li>
          <li aria-hidden>·</li>
          <li className="text-ink" aria-current="page">{doc.title}</li>
        </ol>
      </nav>

      <article data-section="legal" data-path={path} className="wrap py-10 lg:py-16">
        <header className="max-w-[44rem]">
          <h1 className="text-[clamp(2.25rem,5vw,3.5rem)] font-extrabold">{doc.title}</h1>
          {/* Hidden until a full effective date is set (e.g. "November 19, 2026") in lib/legal.ts, then uncomment.
          <p className="mt-3 text-small text-muted">Effective date: {legalPlaceholders.effectiveDate}</p>
          */}
          <p className="mt-6 text-body leading-relaxed">{doc.intro}</p>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[15rem_minmax(0,44rem)] lg:gap-16">
          <nav aria-label={`${doc.title} sections`} className="lg:sticky lg:top-6 lg:self-start">
            <p className="font-display text-label font-bold uppercase tracking-[0.14em] text-muted">On this page</p>
            <ol className="mt-3 space-y-1.5 text-small">
              {doc.sections.map((s, i) => (
                <li key={s.title}>
                  <a href={`#${slug(s.title)}`} className="flex gap-2 text-muted hover:text-orange">
                    <span className="w-5 shrink-0 tabular-nums">{i + 1}.</span>
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="text-body leading-relaxed">
            {doc.sections.map((s, i) => (
              <section key={s.title} id={slug(s.title)} className="scroll-mt-6 border-t border-line pt-8 first:border-t-0 first:pt-0 [&:not(:first-child)]:mt-10">
                <h2 className="h-section">
                  <span className="tabular-nums text-orange">{i + 1}.</span> {s.title}
                </h2>
                {s.blocks.map((b, j) => (
                  <Block key={j} b={b} />
                ))}
              </section>
            ))}
            <p className="mt-12 border-t border-line pt-8 font-semibold">{doc.closing}</p>
          </div>
        </div>
      </article>
    </>
  );
}
