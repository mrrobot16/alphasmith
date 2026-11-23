import type { Metadata } from "next";
import Link from "next/link";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { LEADS_PAGE_SIZE, listLeads, pageLabel, type EmailStatus } from "@/lib/leads";
import { LoginForm } from "./LoginForm";
import { logout } from "./actions";

export const metadata: Metadata = {
  title: "Leads",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

const STATUS: Record<EmailStatus, { label: string; className: string }> = {
  sent: { label: "Emailed", className: "border-line text-muted" },
  failed: { label: "Email failed", className: "border-red-400 text-red-400" },
  not_configured: { label: "Not emailed", className: "border-red-400 text-red-400" },
  pending: { label: "Email pending", className: "border-orange text-orange" },
};

const when = (d: Date) =>
  d.toLocaleString("en-US", { timeZone: "America/Los_Angeles", dateStyle: "medium", timeStyle: "short" });

type Search = Promise<{ page?: string; status?: string }>;

export default async function AdminPage({ searchParams }: { searchParams: Search }) {
  if (!adminConfigured()) return <Notice>Set ADMIN_PASSWORD in the environment to turn this page on.</Notice>;
  if (!(await isAdmin()))
    return (
      <div className="wrap">
        <LoginForm />
      </div>
    );

  const params = await searchParams;
  const failedOnly = params.status === "failed";
  const page = Math.max(1, Math.floor(Number(params.page)) || 1);

  let result: Awaited<ReturnType<typeof listLeads>>;
  try {
    result = await listLeads({ page, failedOnly });
  } catch (err) {
    console.error("[admin] Could not load leads", err);
    return <Notice>Couldn&apos;t reach the database. Try again in a minute.</Notice>;
  }
  if (!result) return <Notice>Set MONGODB_URI in the environment to store and show leads.</Notice>;

  const { items, total } = result;
  const pages = Math.max(1, Math.ceil(total / LEADS_PAGE_SIZE));
  const href = (p: number, failed = failedOnly) =>
    `/admin?${new URLSearchParams({ ...(failed ? { status: "failed" } : {}), ...(p > 1 ? { page: String(p) } : {}) })}`;

  return (
    <div className="wrap py-10" data-clarity-mask="True">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-[2rem]">Leads</h1>
          <p className="mt-1 text-small text-muted">
            {total} {failedOnly ? "not emailed" : total === 1 ? "quote request" : "quote requests"}, newest first
          </p>
        </div>
        <form action={logout}>
          <button type="submit" className="chip">
            Log out
          </button>
        </form>
      </div>

      <nav className="mt-6 flex gap-2" aria-label="Filter leads">
        <Link href={href(1, false)} className={`chip ${failedOnly ? "" : "border-orange"}`} aria-current={!failedOnly || undefined}>
          All
        </Link>
        <Link href={href(1, true)} className={`chip ${failedOnly ? "border-orange" : ""}`} aria-current={failedOnly || undefined}>
          Not emailed
        </Link>
      </nav>

      {items.length === 0 ? (
        <p className="mt-8 text-muted">{failedOnly ? "Every lead was emailed." : "No leads yet."}</p>
      ) : (
        <ul className="mt-6 grid gap-3">
          {items.map((lead) => {
            const status = STATUS[lead.emailStatus] ?? STATUS.pending;
            return (
              <li key={String(lead._id)} className="card p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h2 className="text-title">{lead.name}</h2>
                  <span className="text-small text-muted">{when(lead.createdAt)}</span>
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-body">
                  <a href={`tel:${lead.phone.replace(/\D/g, "")}`} className="font-semibold text-orange">
                    {lead.phone}
                  </a>
                  <span>{lead.service}</span>
                  {lead.zip && <span className="text-muted">ZIP {lead.zip}</span>}
                  <span className={`rounded-full border px-2 py-0.5 text-label ${status.className}`}>{status.label}</span>
                </div>
                {lead.details && <p className="mt-3 whitespace-pre-wrap break-words text-body">{lead.details}</p>}
                <p className="mt-3 text-small text-muted">From: {lead.page ? pageLabel(lead.page) : "The website"}</p>
              </li>
            );
          })}
        </ul>
      )}

      {pages > 1 && (
        <nav className="mt-6 flex items-center gap-3 text-small" aria-label="Pages">
          {page > 1 && (
            <Link href={href(page - 1)} className="chip">
              Newer
            </Link>
          )}
          <span className="text-muted">
            Page {page} of {pages}
          </span>
          {page < pages && (
            <Link href={href(page + 1)} className="chip">
              Older
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}

function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrap py-16">
      <p className="card mx-auto max-w-md p-5 text-center text-muted">{children}</p>
    </div>
  );
}
