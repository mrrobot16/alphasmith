"use server";

import { headers } from "next/headers";
import { site } from "@/lib/site";

export type QuoteState = { ok: boolean; message: string } | null;

const SERVICES = ["Locksmith", "Garage doors", "Automatic gates", "Fencing", "Access control"];
const CALL_US = `call us at ${site.phone}`;

// Best-effort per-IP limit (in memory, so it resets on cold starts).
const hits = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const clean = (v: FormDataEntryValue | null, max: number) =>
  String(v ?? "")
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "")
    .trim()
    .slice(0, max);

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function formatPhone(digits: string) {
  const d = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  return d.length === 10 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : digits;
}

/** Turns a page path into a plain-English label for the owner. */
function pageLabel(path: string) {
  const known: Record<string, string> = {
    "/": "Homepage",
  };
  if (known[path]) return known[path];
  const title = (slug: string) => slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
  const cs = path.match(/^\/locations\/([^/]+)\/service\/([^/]+)/);
  if (cs) return `${title(cs[2])} page in ${title(cs[1])}`;
  if (path.startsWith("/locations/")) return `${title(path.slice("/locations/".length))} city page`;
  const last = path.split("/").filter(Boolean).pop();
  if (!last) return "Website";
  const words = last.replace(/-/g, " ");
  return `${words.charAt(0).toUpperCase()}${words.slice(1)} page`;
}

/** Validates the quote form and emails it to LEADS_TO_EMAIL through Resend. */
export async function submitQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  // Honeypot: real visitors never fill this hidden field. Pretend success to bots.
  if (clean(formData.get("website"), 100)) return { ok: true, message: "Thanks. We'll call you shortly." };

  const name = clean(formData.get("name"), 100);
  const digits = clean(formData.get("phone"), 30).replace(/\D/g, "");
  const serviceRaw = clean(formData.get("service"), 40);
  const service = SERVICES.includes(serviceRaw) ? serviceRaw : "Not specified";
  const zip = clean(formData.get("zip"), 5).replace(/\D/g, "");
  const details = clean(formData.get("details"), 1500);
  const page = clean(formData.get("page"), 200);

  if (name.length < 2) return { ok: false, message: "Please enter your name." };
  if (digits.length < 10) return { ok: false, message: "Please enter a phone number we can call." };

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (rateLimited(ip)) return { ok: false, message: `Too many requests. Please ${CALL_US}.` };

  const phone = formatPhone(digits);
  const lines: [string, string][] = [
    ["Name", name],
    ["Phone", phone],
    ["Service", service],
    ["ZIP", zip || "Not given"],
    ["Details", details || "None"],
    ["Request came from", page ? `${pageLabel(page)} on the website` : "The website"],
    ["Time", new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles", dateStyle: "medium", timeStyle: "short" })],
  ];
  const subject = `New lead: ${service}${zip ? `, ${zip}` : ""} · ${phone}`;
  const text = lines.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5">
<h2 style="margin:0 0 12px">New quote request</h2>
<table cellpadding="6" style="border-collapse:collapse">${lines
    .map(([k, v]) => `<tr><td style="color:#666;vertical-align:top">${k}</td><td style="white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join("")}</table></div>`;

  const key = process.env.RESEND_API_KEY;
  const to = (process.env.LEADS_TO_EMAIL ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  const from = process.env.LEADS_FROM_EMAIL || "Alpha Website <onboarding@resend.dev>";

  if (!key || to.length === 0) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[quote form] Email not configured (RESEND_API_KEY / LEADS_TO_EMAIL). Would send:\n${subject}\n${text}`);
      return { ok: true, message: "Thanks. We'll call you shortly." };
    }
    console.error("[quote form] RESEND_API_KEY or LEADS_TO_EMAIL is not set; lead was not delivered.");
    return { ok: false, message: `We couldn't send your request. Please ${CALL_US}.` };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to, subject, text, html }),
    });
    if (!res.ok) {
      console.error("[quote form] Resend error", res.status, await res.text());
      return { ok: false, message: `We couldn't send your request. Please ${CALL_US}.` };
    }
  } catch (err) {
    console.error("[quote form] Resend request failed", err);
    return { ok: false, message: `We couldn't send your request. Please ${CALL_US}.` };
  }

  return { ok: true, message: `Thanks. We'll call you shortly. For an emergency, ${CALL_US}.` };
}
