"use client";

import { useActionState, useEffect } from "react";
import { track, leadConversion } from "./Analytics";
import { submitQuote, type QuoteState } from "@/app/actions";

const services = ["Locksmith", "Garage doors", "Automatic gates", "Fencing", "Access control"];

export function QuoteForm() {
  const [state, action, pending] = useActionState<QuoteState, FormData>(submitQuote, null);

  useEffect(() => {
    if (state?.ok) track("generate_lead", { form: "quote" }, leadConversion);
  }, [state]);

  return (
    <form action={action} className="card p-5" aria-labelledby="quote-title">
      <h2 id="quote-title" className="text-xl">
        Request a quote
      </h2>
      <p className="mt-1 text-[0.875rem] leading-snug text-muted">
        Not an emergency? Tell us what you need and we will call you back.
      </p>

      <div className="mt-4 space-y-3 text-[0.875rem] font-semibold">
        <label className="block">
          Name
          <input name="name" autoComplete="name" required placeholder="Your name" className="field mt-1" />
        </label>
        <label className="block">
          Phone
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            placeholder="(503) 000-0000"
            className="field mt-1"
          />
        </label>
        <label className="block">
          Service
          <select name="service" className="field mt-1" defaultValue="Locksmith">
            {services.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <label className="block">
          ZIP
          <input
            name="zip"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={5}
            placeholder="97201"
            className="field mt-1"
          />
        </label>
        <label className="block">
          What&apos;s going on?
          <textarea
            name="details"
            rows={3}
            placeholder="e.g. rekey 3 exterior doors"
            className="field mt-1 resize-none"
          />
        </label>
      </div>

      <button type="submit" disabled={pending} className="btn mt-4 w-full py-2.5 text-[1rem] disabled:opacity-60">
        {pending ? "Sending…" : "Send request"}
      </button>

      <p
        role="status"
        aria-live="polite"
        className={`mt-3 text-[0.875rem] ${state?.ok ? "text-orange" : "text-red-400"} ${state ? "" : "hidden"}`}
      >
        {state?.message}
      </p>
    </form>
  );
}
