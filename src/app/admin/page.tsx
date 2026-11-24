import type { Metadata } from "next";
import Link from "next/link";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { LEADS_PAGE_SIZE, LEAD_VIEWS, listLeads, pageLabel, type EmailStatus, type LeadView } from "@/lib/leads";
import { LoginForm } from "./LoginForm";
import { AutoRefresh } from "./AutoRefresh";
import { CalledButton } from "./CalledButton";
import { logout, markCalled } from "./actions";

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

const VIEWS: Record<LeadView, { tab: string; summary: string; empty: string }> = {
  open: { tab: "To call", summary: "to call", empty: "Nobody waiting for a call." },
  called: { tab: "Called", summary: "called", empty: "No leads marked as called yet." },
  all: { tab: "All", summary: "in total", empty: "No leads yet." },
  failed: { tab: "Not emailed", summary: "not emailed", empty: "Every lead was emailed." },
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
  const view: LeadView = LEAD_VIEWS.includes(params.status as LeadView) ? (params.status as LeadView) : "open";
  const page = Math.max(1, Math.floor(Number(params.page)) || 1);

  let result: Awaited<ReturnType<typeof listLeads>>;
  try {
    result = await listLeads({ page, view });
  } catch (err) {
    console.error("[admin] Could not load leads", err);
    return <Notice>Couldn&apos;t reach the database. Try again in a minute.</Notice>;
  }
  if (!result) return <Notice>Set MONGODB_URI in the environment to store and show leads.</Notice>;

  const { items, counts } = result;
  const total = counts[view];
  const pages = Math.max(1, Math.ceil(total / LEADS_PAGE_SIZE));
  const href = (p: number, v: LeadView = view) =>
    `/admin?${new URLSearchParams({ ...(v !== "open" ? { status: v } : {}), ...(p > 1 ? { page: String(p) } : {}) })}`;

  return (
    <div className="wrap py-10" data-clarity-mask="True">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-[2rem]">Leads</h1>
          <p className="mt-1 text-small text-muted">
            {total} {VIEWS[view].summary}, newest first
          </p>
        </div>
        <div className="flex items-center gap-4">
          <AutoRefresh />
          <form action={logout}>
            <button type="submit" className="chip">
              Log out
            </button>
          </form>
        </div>
      </div>

      <nav className="mt-6 flex flex-wrap gap-2" aria-label="Filter leads">
        {LEAD_VIEWS.map((v) => (
          <Link
            key={v}
            href={href(1, v)}
            className={`chip gap-1.5 ${v === view ? "border-orange" : ""}`}
            aria-current={v === view ? "page" : undefined}
          >
            {VIEWS[v].tab}
            <span className="text-muted">{counts[v]}</span>
          </Link>
        ))}
      </nav>

      {items.length === 0 ? (
        <p className="mt-8 text-muted">{VIEWS[view].empty}</p>
      ) : (
        <ul className="mt-6 grid gap-3">
          {items.map((lead) => {
            const status = STATUS[lead.emailStatus] ?? STATUS.pending;
            const called = Boolean(lead.calledAt);
            return (
              <li key={String(lead._id)} className={`card p-4 ${called && view !== "called" ? "opacity-60" : ""}`}>
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
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-small text-muted">
                    From: {lead.page ? pageLabel(lead.page) : "The website"}
                    {lead.calledAt && <> · Called {when(lead.calledAt)}</>}
                  </p>
                  <form action={markCalled}>
                    <input type="hidden" name="id" value={String(lead._id)} />
                    <input type="hidden" name="called" value={called ? "0" : "1"} />
                    <CalledButton called={called} />
                  </form>
                </div>
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
