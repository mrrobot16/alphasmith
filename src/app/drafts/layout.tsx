import type { Metadata } from "next";

// Draft pages wait on client approval: keep every page under /drafts out of search results.
// They are also left out of the sitemap and nothing on the live site links to them.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DraftsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
