import { createPasswordGate } from "./password-gate";

/**
 * Shared-password access to /admin. The password lives only in ADMIN_PASSWORD.
 * A correct password sets a signed cookie that lasts 7 days. The signature is
 * keyed on the password, so changing ADMIN_PASSWORD logs everyone out.
 */
export const SESSION_COOKIE = "admin_session";

const gate = createPasswordGate({
  envVar: "ADMIN_PASSWORD",
  cookie: SESSION_COOKIE,
  path: "/admin",
  scope: "admin",
  days: 7,
  sameSite: "strict",
});

export const adminConfigured = gate.configured;
export const passwordMatches = gate.passwordMatches;
export const startSession = gate.startSession;
export const endSession = gate.endSession;
export const isAdmin = gate.hasAccess;
