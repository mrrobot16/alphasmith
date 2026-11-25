import { createPasswordGate } from "./password-gate";

/**
 * Shared-password access to the draft pages under /drafts, for the client to review them.
 * Separate from ADMIN_PASSWORD, so the client never gets access to the leads page.
 * `lax` so the client stays signed in when they open a /drafts link from an email.
 */
export const draftsGate = createPasswordGate({
  envVar: "DRAFTS_PASSWORD",
  cookie: "drafts_session",
  path: "/drafts",
  scope: "drafts",
  days: 30,
  sameSite: "lax",
});
