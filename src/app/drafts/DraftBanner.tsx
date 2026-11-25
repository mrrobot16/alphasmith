import Link from "next/link";
import { cityServicePath, type ServicePageConfig } from "@/lib/services";
import type { City } from "@/lib/cities";
import { draftNotes } from "@/lib/drafts";

/** Top of every draft page: says it isn't live yet, and shows the SEO title and meta description, which a visitor can't see on the page. */
export function DraftBanner({ c, city }: { c: ServicePageConfig; city: City }) {
  const questions = draftNotes[c.slug]?.questions;
  return (
    <aside data-section="draft_banner" className="border-b border-orange bg-orange/10">
      <div className="wrap py-4 text-small">
        <p className="font-display font-semibold uppercase tracking-[0.12em] text-orange">Draft · Not published</p>
        <p className="mt-1">
          This page is a preview waiting on approval. It isn&apos;t linked from the site or shown in search results. Once approved it goes live at{" "}
          <b>{cityServicePath(city.slug, c.slug)}</b>.
        </p>
        <dl className="mt-3 grid gap-x-4 gap-y-1 sm:grid-cols-[max-content_1fr]">
          <dt className="text-muted">SEO title</dt>
          <dd>{c.meta.title}</dd>
          <dt className="text-muted">Meta description</dt>
          <dd>{c.meta.description}</dd>
        </dl>
        {questions && (
          <div className="mt-3">
            <p className="font-semibold text-orange">Needs your answer</p>
            <ul className="mt-1 list-disc space-y-1 pl-4">
              {questions.map((q) => <li key={q}>{q}</li>)}
            </ul>
          </div>
        )}
        <Link href="/drafts" className="mt-3 inline-block underline hover:text-orange">All draft pages</Link>
      </div>
    </aside>
  );
}
