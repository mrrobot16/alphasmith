"use client";

import { useActionState } from "react";
import { login, type LoginState } from "./actions";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, null);
  return (
    <form action={action} className="card mx-auto mt-16 max-w-sm p-5">
      <h1 className="text-sub">Leads</h1>
      <p className="mt-2 text-small text-muted">Enter the admin password to see quote requests.</p>
      <label className="mt-4 block text-small font-semibold">
        Password
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          autoFocus
          className="field mt-1"
        />
      </label>
      <button type="submit" disabled={pending} className="btn mt-4 w-full py-2.5 text-body disabled:opacity-60">
        {pending ? "Checking…" : "Log in"}
      </button>
      <p role="alert" className={`mt-3 text-small text-red-400 ${state?.error ? "" : "hidden"}`}>
        {state?.error}
      </p>
    </form>
  );
}
