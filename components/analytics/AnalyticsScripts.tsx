"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useConsent } from "../../lib/consent";
import { clearAttribution, persistAttribution } from "../../lib/analytics/attribution";
import {
  GA4_ID,
  META_PIXEL_ID,
  clearCookies,
  initGtag,
  initPixel,
  isGaCookie,
  isPixelCookie,
  setPixelConsent,
  updateGtagConsent,
} from "../../lib/analytics/providers";

// Loads GA4 and the Meta Pixel only after the matching consent. Before a choice
// is made (or if it's declined, or the ID env var is missing) this renders nothing
// and touches no cookies or storage.
export function AnalyticsScripts() {
  const { analytics, marketing, status } = useConsent();
  const pathname = usePathname();
  const lastPixelPath = useRef<string | null>(null);

  const loadGa = !!GA4_ID && analytics;
  const loadPixel = !!META_PIXEL_ID && marketing;

  // Attribution is stored only once the user has consented to either category
  useEffect(() => {
    if (status !== "decided") return;
    if (analytics || marketing) persistAttribution();
    else clearAttribution();
  }, [status, analytics, marketing]);

  // GA4: set up consent mode on first acceptance, and keep it in step with later changes
  useEffect(() => {
    if (status !== "decided" || !GA4_ID) return;
    if (analytics) initGtag(GA4_ID, marketing);
    updateGtagConsent(analytics, marketing);
    if (!analytics) clearCookies(isGaCookie);
  }, [status, analytics, marketing]);

  // Meta Pixel: init (with its first PageView) on consent, revoke if withdrawn
  useEffect(() => {
    if (status !== "decided" || !META_PIXEL_ID) return;
    if (marketing) {
      initPixel(META_PIXEL_ID);
      setPixelConsent(true);
    } else {
      setPixelConsent(false);
      clearCookies(isPixelCookie);
    }
  }, [status, marketing]);

  // Meta Pixel: PageView on client-side navigation (GA4 handles this itself
  // through enhanced measurement's browser-history page views)
  useEffect(() => {
    if (!loadPixel) return;
    if (lastPixelPath.current === null) {
      lastPixelPath.current = pathname; // initPixel already sent this one
      return;
    }
    if (lastPixelPath.current === pathname) return;
    lastPixelPath.current = pathname;
    window.fbq?.("track", "PageView");
  }, [loadPixel, pathname]);

  return (
    <>
      {loadGa && (
        <Script
          id="ga4"
          src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID!)}`}
          strategy="afterInteractive"
        />
      )}
      {loadPixel && (
        <Script id="meta-pixel" src="https://connect.facebook.net/en_US/fbevents.js" strategy="afterInteractive" />
      )}
    </>
  );
}
