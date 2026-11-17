import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { privacy } from "@/lib/legal";

// Reachable by URL only: not in the sitemap and kept out of search results until the owner approves the text.
export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Alpha Locksmith & Garage.",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return <LegalPage doc={privacy} path="/privacy-policy" />;
}
