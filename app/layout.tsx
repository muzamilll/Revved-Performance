import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site } from "../data/site";
import { getSiteUrl } from "../lib/seo";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { Wordmark } from "../components/layout/Logo";
import { BottomBar } from "../components/layout/BottomBar";
import { EnquiryProvider } from "../components/enquiry/EnquiryProvider";
import { ConsentBanner } from "../components/consent/ConsentBanner";
import { AnalyticsScripts } from "../components/analytics/AnalyticsScripts";
import { MotionProvider } from "../components/motion/MotionProvider";
import { getEnquiryChoices } from "../lib/enquiry";

// All three families are self-hosted (app/fonts). Nothing is fetched from Google at build or run time.
const inter = localFont({
  src: "./fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-inter",
  display: "swap",
});

// Poster lettering: the hero headline, the Performance headline, the final band and the wordmark
const anton = localFont({
  src: "./fonts/anton-latin-400-normal.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-anton",
  display: "swap",
});

// Small italic accents
const oldStandard = localFont({
  src: "./fonts/old-standard-tt-latin-400-italic.woff2",
  weight: "400",
  style: "italic",
  variable: "--font-old-standard",
  display: "swap",
});

// Handwritten notes (decorative, at most two on the home page)
const caveat = localFont({
  src: "./fonts/caveat-latin-600-normal.woff2",
  weight: "600",
  style: "normal",
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    template: `%s | ${site.name}`,
    default: site.homeTitle,
  },
  description: site.homeDescription,
  // Search Console and Bing Webmaster Tools ownership tags; set the env vars in Vercel
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  openGraph: {
    title: site.homeTitle,
    description: site.homeDescription,
    url: "/",
    siteName: site.name,
    locale: "en_GB",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#693C56",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${anton.variable} ${oldStandard.variable} ${caveat.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        {/* Marks JavaScript as on (for the hero entrance), and skips the loader after the first view in a session */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js");try{if(sessionStorage.getItem("rp-seen")){document.documentElement.classList.add("no-loader")}else{sessionStorage.setItem("rp-seen","1")}}catch(e){}`,
          }}
        />
        <div id="boot-loader" aria-hidden="true">
          <div className="boot-mark">
            <div className="boot-line"><span /><span /><span /><span /></div>
            <Wordmark tone="plum" className="boot-word text-[30px]" />
          </div>
        </div>
        <EnquiryProvider choices={getEnquiryChoices()}>
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
          <BottomBar />
        </EnquiryProvider>
        <ConsentBanner />
        <AnalyticsScripts />
        <MotionProvider />
      </body>
    </html>
  );
}
