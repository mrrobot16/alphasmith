import { draftsGate } from "@/lib/drafts-auth";
import { DraftsLoginForm } from "./DraftsLoginForm";

/**
 * Every page under /drafts calls this first and returns its result if there is one.
 * The check sits in each page, not in the layout, because a layout doesn't re-run on
 * every navigation and so can't be relied on to protect a page.
 */
export async function draftsLocked(path: string): Promise<React.ReactNode | null> {
  if (!draftsGate.configured())
    return <p className="wrap py-16 text-body text-muted">Set DRAFTS_PASSWORD in the environment to turn the draft pages on.</p>;
  if (!(await draftsGate.hasAccess())) return <DraftsLoginForm next={path} />;
  return null;
}

/** Title for a locked page: nothing about the draft itself until the password is in. */
export const lockedMetadata = { title: "Draft pages" };
