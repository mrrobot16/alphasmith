import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { terms } from "@/lib/legal";

// Reachable by URL only: not in the sitemap and kept out of search results until the owner approves the text.
export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Terms and Conditions for Alpha Locksmith & Garage.",
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return <LegalPage doc={terms} path="/terms-and-conditions" />;
}
