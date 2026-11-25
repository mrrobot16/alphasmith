import type { Metadata } from "next";
import Link from "next/link";
import { getServiceBySlug, cityServicePath } from "@/lib/services";
import { copyNeeded, draftCities, draftNotes, draftPages, draftPath } from "@/lib/drafts";
import { draftsLocked, lockedMetadata } from "./gate";

export const metadata: Metadata = lockedMetadata;
// Behind DRAFTS_PASSWORD: checked on every request.
export const dynamic = "force-dynamic";

/** Every draft page, grouped under the service it belongs to. This is the link to share with the client. */
export default async function DraftsIndex() {
  const locked = await draftsLocked("/drafts");
  if (locked) return locked;

  const groups = new Map<string, typeof draftPages>();
  for (const p of draftPages) {
    const key = p.parent ?? "";
    groups.set(key, [...(groups.get(key) ?? []), p]);
  }
  const questionCount = draftPages.reduce((n, p) => n + (draftNotes[p.slug]?.questions?.length ?? 0), 0);

  return (
    <section className="wrap py-10 sm:py-14">
      <p className="font-display text-small font-semibold uppercase tracking-[0.12em] text-orange">Draft · Not published</p>
      <h1 className="mt-3 text-[clamp(2rem,4vw,3rem)] font-extrabold">Draft pages</h1>
      <div className="mt-4 max-w-[44rem] space-y-3 text-body leading-relaxed text-muted">
        <p>
          These {draftPages.length} new service pages use the copy from your SEO document. They are previews waiting on approval: they
          aren&apos;t linked from the site or shown in search results. Each one lists the address it will go live at once approved.
        </p>
        <p>
          The photos are placeholders taken from existing job photos. Each page shows its search-result title and description at the top.
          {questionCount > 0 && ` ${questionCount} ${questionCount === 1 ? "question needs" : "questions need"} your answer, marked below.`}
        </p>
      </div>

      {draftCities.map((city) =>
        [...groups].map(([parentSlug, pages]) => {
          const parent = getServiceBySlug(parentSlug);
          return (
            <div key={`${city}-${parentSlug}`} className="mt-10">
              <h2 className="h-section">{parent?.crumbs.label ?? "Other"}</h2>
              <ul className="mt-5 grid gap-4 md:grid-cols-2">
                {pages.map((p) => {
                  const notes = draftNotes[p.slug];
                  return (
                    <li key={p.slug} className="card flex flex-col px-5 py-4">
                      <Link href={draftPath(city, p.slug)} className="font-display text-title font-semibold underline-offset-4 hover:text-orange hover:underline">
                        {p.crumbs.label}
                      </Link>
                      {notes?.summary && <p className="mt-2 text-body leading-relaxed">{notes.summary}</p>}
                      {notes?.questions && (
                        <div className="mt-3 rounded-md border border-orange/70 bg-orange/10 px-3 py-2 text-small">
                          <p className="font-semibold text-orange">Needs your answer</p>
                          <ul className="mt-1 list-disc space-y-1 pl-4">
                            {notes.questions.map((q) => <li key={q}>{q}</li>)}
                          </ul>
                        </div>
                      )}
                      <p className="mt-auto pt-3 text-small text-muted">Goes live at {cityServicePath(city, p.slug)}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        }),
      )}

      {copyNeeded.length > 0 && (
        <div className="mt-14">
          <h2 className="h-section">Copy needed</h2>
          <p className="mt-3 max-w-[44rem] text-body leading-relaxed text-muted">
            The site already mentions these pages, but the SEO document has no copy for them. Send the SEO title, meta description, main
            heading, intro and sections for each, and we&apos;ll add them here as drafts.
          </p>
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {copyNeeded.map((p) => (
              <li key={p.label} className="card border-dashed px-5 py-4">
                <p className="font-display text-title font-semibold">{p.label}</p>
                <p className="mt-1 text-small text-muted">Under {getServiceBySlug(p.parent)?.crumbs.label ?? p.parent}</p>
                <p className="mt-2 text-body leading-relaxed">{p.namedOn}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
