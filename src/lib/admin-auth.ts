import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * Shared-password access to /admin. The password lives only in ADMIN_PASSWORD.
 * A correct password sets a signed cookie that lasts SESSION_DAYS. The signature is
 * keyed on the password, so changing ADMIN_PASSWORD logs everyone out.
 */
export const SESSION_COOKIE = "admin_session";
const SESSION_DAYS = 7;

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD);

const sha256 = (s: string) => createHash("sha256").update(s).digest();
const sign = (password: string, expires: number) =>
  createHmac("sha256", password).update(`admin:${expires}`).digest("base64url");

/** Constant-time comparison, so response timing gives nothing away. */
export function passwordMatches(attempt: string) {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  return timingSafeEqual(sha256(attempt), sha256(password));
}

export async function startSession() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return;
  const expires = Date.now() + SESSION_DAYS * 86_400_000;
  (await cookies()).set(SESSION_COOKIE, `${expires}.${sign(password, expires)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    maxAge: SESSION_DAYS * 86_400,
  });
}

export async function endSession() {
  (await cookies()).delete({ name: SESSION_COOKIE, path: "/admin" });
}

export async function isAdmin() {
  const password = process.env.ADMIN_PASSWORD;
  const value = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!password || !value) return false;
  const [exp, sig] = value.split(".");
  const expires = Number(exp);
  if (!sig || !Number.isFinite(expires) || expires < Date.now()) return false;
  const expected = Buffer.from(sign(password, expires));
  const given = Buffer.from(sig);
  return given.length === expected.length && timingSafeEqual(given, expected);
}
