"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { draftsGate } from "@/lib/drafts-auth";
import { createAttemptLimiter } from "@/lib/password-gate";

export type DraftsLoginState = { error: string } | null;

const limiter = createAttemptLimiter();

export async function loginToDrafts(_prev: DraftsLoginState, formData: FormData): Promise<DraftsLoginState> {
  const ip = ((await headers()).get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (limiter.blocked(ip)) return { error: "Too many attempts. Try again in 15 minutes." };

  if (!draftsGate.passwordMatches(String(formData.get("password") ?? ""))) {
    limiter.fail(ip);
    return { error: "Wrong password." };
  }

  limiter.clear(ip);
  await draftsGate.startSession();
  // Back to the draft page they asked for; anything else goes to the list.
  const next = String(formData.get("next") ?? "");
  redirect(/^\/drafts(\/[\w/-]*)?$/.test(next) ? next : "/drafts");
}
