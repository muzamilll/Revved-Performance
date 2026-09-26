import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { site } from "../data/site";
import { getSiteUrl } from "../lib/seo";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { PersistentCTA } from "../components/layout/PersistentCTA";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    template: `%s | ${site.name}`,
    default: site.homeTitle,
  },
  description: site.homeDescription,
  openGraph: {
    title: site.homeTitle,
    description: site.homeDescription,
    url: '/',
    siteName: site.name,
    locale: 'en_GB',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} scroll-smooth`}>
      <body className="bg-background text-text antialiased min-h-screen flex flex-col relative bg-noise">
        <Header />
        <main className="flex-1 flex flex-col relative z-10">
          {children}
        </main>
        <Footer />
        <PersistentCTA />
      </body>
    </html>
  );
}
