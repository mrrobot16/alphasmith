"use client";

import { useFormStatus } from "react-dom";

/** Submit button for the mark-as-called form; shows progress while the update runs. */
export function CalledButton({ called }: { called: boolean }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={called ? "chip disabled:opacity-60" : "btn px-4 py-2 text-body disabled:opacity-60"}
    >
      {pending ? "Saving…" : called ? "Undo" : "Mark as called"}
    </button>
  );
}
