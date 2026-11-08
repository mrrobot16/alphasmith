"use server";

export type QuoteState = { ok: boolean; message: string } | null;

/**
 * Quote request handler. Currently validates only; wire up email/CRM here.
 */
export async function submitQuote(_prev: QuoteState, formData: FormData): Promise<QuoteState> {
  const name = String(formData.get("name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").replace(/\D/g, "");

  if (name.length < 2) return { ok: false, message: "Please enter your name." };
  if (phone.length < 10) return { ok: false, message: "Please enter a phone number we can call." };

  // TODO: send to email / CRM. Nothing is stored or sent yet.
  return { ok: true, message: "Thanks. We'll call you shortly. For an emergency, call 503-505-8560." };
}
