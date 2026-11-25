import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

/**
 * One shared password for a section of the site. The password lives only in the env var.
 * A correct password sets a signed cookie that lasts `days`. The signature is keyed on the
 * password, so changing the password logs everyone out.
 */
export function createPasswordGate(opts: {
  /** Env var holding the password; blank switches the section off. */
  envVar: string;
  cookie: string;
  /** Cookie path: the section the cookie is sent to. */
  path: string;
  /** Mixed into the signature, so a cookie from one section isn't valid in another. */
  scope: string;
  days: number;
  sameSite: "strict" | "lax";
}) {
  const password = () => process.env[opts.envVar];
  const sha256 = (s: string) => createHash("sha256").update(s).digest();
  const sign = (pw: string, expires: number) => createHmac("sha256", pw).update(`${opts.scope}:${expires}`).digest("base64url");

  return {
    configured: () => Boolean(password()),

    /** Constant-time comparison, so response timing gives nothing away. */
    passwordMatches(attempt: string) {
      const pw = password();
      if (!pw) return false;
      return timingSafeEqual(sha256(attempt), sha256(pw));
    },

    async startSession() {
      const pw = password();
      if (!pw) return;
      const expires = Date.now() + opts.days * 86_400_000;
      (await cookies()).set(opts.cookie, `${expires}.${sign(pw, expires)}`, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: opts.sameSite,
        path: opts.path,
        maxAge: opts.days * 86_400,
      });
    },

    async endSession() {
      (await cookies()).delete({ name: opts.cookie, path: opts.path });
    },

    async hasAccess() {
      const pw = password();
      const value = (await cookies()).get(opts.cookie)?.value;
      if (!pw || !value) return false;
      const [exp, sig] = value.split(".");
      const expires = Number(exp);
      if (!sig || !Number.isFinite(expires) || expires < Date.now()) return false;
      const expected = Buffer.from(sign(pw, expires));
      const given = Buffer.from(sig);
      return given.length === expected.length && timingSafeEqual(given, expected);
    },
  };
}

/** Best-effort per-IP limit on wrong guesses (in memory, so it resets on cold starts). */
export function createAttemptLimiter({ max = 10, windowMs = 15 * 60_000 } = {}) {
  const fails = new Map<string, number[]>();
  const recent = (ip: string) => (fails.get(ip) ?? []).filter((t) => Date.now() - t < windowMs);
  return {
    blocked: (ip: string) => recent(ip).length >= max,
    fail: (ip: string) => fails.set(ip, [...recent(ip), Date.now()]),
    clear: (ip: string) => fails.delete(ip),
  };
}
