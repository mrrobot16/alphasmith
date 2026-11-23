import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { StickyCall } from "@/components/Shared";
import { SiteFooter } from "@/components/SiteFooter";
import { Analytics } from "@/components/Analytics";
import { QuoteAnchor } from "@/components/QuoteAnchor";
import { JsonLd } from "@/components/JsonLd";
import { SITE_URL, localBusinessJsonLd } from "@/lib/seo";
import { hoursScript, fixedHoursState } from "@/lib/hours";
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
  title: { default: "Portland Locksmith & Garage Door Repair | Alpha Locksmith", template: "%s | Alpha Locksmith" },
};

export const viewport: Viewport = { themeColor: "#151515" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // data-hours is fixed in "show"/"hide" mode; in "auto" the hours script sets it before React
    // hydrates, hence suppressHydrationWarning. See lib/hours.ts.
    <html
      lang="en"
      className={`${barlow.variable} ${barlowCondensed.variable}`}
      data-hours={fixedHoursState}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before paint so after-hours visitors never see "Open 24/7" flash. */}
        {hoursScript && <script dangerouslySetInnerHTML={{ __html: hoursScript }} />}
      </head>
      <body>
        <Analytics />
        <QuoteAnchor />
        <JsonLd data={localBusinessJsonLd} />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <StickyCall />
      </body>
    </html>
  );
}
