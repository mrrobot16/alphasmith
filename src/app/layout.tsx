import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { StickyCall } from "@/components/Shared";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, localBusinessJsonLd } from "@/lib/seo";
import "./globals.css";

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
});
const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Alpha Locksmith & Garage",
    locale: "en_US",
    title: "Portland Locksmith & Garage Door Repair | Alpha Locksmith & Garage",
    description: "Licensed Portland locksmith, garage door and automatic gate service, open 24/7. Call 503-505-8560.",
  },
  twitter: { card: "summary_large_image" },
  title: "Portland Locksmith & Garage Door Repair | Alpha Locksmith & Garage",
  description:
    "Licensed Portland locksmith, garage door and automatic gate service, open 24/7. Call 503-505-8560.",
};

export const viewport: Viewport = { themeColor: "#151515" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      <body>
        <Analytics />
        <JsonLd data={localBusinessJsonLd} />
        <SiteHeader />
        <main>{children}</main>
        <StickyCall />
      </body>
    </html>
  );
}
