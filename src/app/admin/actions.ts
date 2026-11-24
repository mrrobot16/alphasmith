"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { endSession, isAdmin, passwordMatches, startSession } from "@/lib/admin-auth";
import { setCalled } from "@/lib/leads";

export type LoginState = { error: string } | null;

// Best-effort per-IP limit on wrong guesses (in memory, so it resets on cold starts).
const fails = new Map<string, number[]>();
const WINDOW = 15 * 60_000;
const MAX_FAILS = 10;

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const ip = ((await headers()).get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  const now = Date.now();
  const recent = (fails.get(ip) ?? []).filter((t) => now - t < WINDOW);
  if (recent.length >= MAX_FAILS) return { error: "Too many attempts. Try again in 15 minutes." };

  if (!passwordMatches(String(formData.get("password") ?? ""))) {
    fails.set(ip, [...recent, now]);
    return { error: "Wrong password." };
  }

  fails.delete(ip);
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin");
}

/** "Mark as called" / "Undo" on a lead card. Server actions are public endpoints, so check the session here too. */
export async function markCalled(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin");
  try {
    await setCalled(String(formData.get("id") ?? ""), formData.get("called") === "1");
  } catch (err) {
    console.error("[admin] Could not update lead", err);
  }
  revalidatePath("/admin");
}
