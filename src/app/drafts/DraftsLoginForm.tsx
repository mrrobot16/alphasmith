"use client";

import { useActionState } from "react";
import { loginToDrafts, type DraftsLoginState } from "./actions";

export function DraftsLoginForm({ next }: { next: string }) {
  const [state, action, pending] = useActionState<DraftsLoginState, FormData>(loginToDrafts, null);
  return (
    <form action={action} className="card mx-auto my-16 max-w-sm p-5">
      <h1 className="text-sub">Draft pages</h1>
      <p className="mt-2 text-small text-muted">These pages are previews waiting on approval. Enter the password you were given to view them.</p>
      <input type="hidden" name="next" value={next} />
      <label className="mt-4 block text-small font-semibold">
        Password
        <input name="password" type="password" autoComplete="current-password" required autoFocus className="field mt-1" />
      </label>
      <button type="submit" disabled={pending} className="btn mt-4 w-full py-2.5 text-body disabled:opacity-60">
        {pending ? "Checking…" : "View drafts"}
      </button>
      <p role="alert" className={`mt-3 text-small text-red-400 ${state?.error ? "" : "hidden"}`}>
        {state?.error}
      </p>
    </form>
  );
}
