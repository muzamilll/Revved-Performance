"use client";

import * as React from "react";
import Link from "next/link";
import { site } from "../../data/site";
import { Logo } from "./Logo";
import { buildWhatsAppUrl, getPhoneUrl } from "../../lib/whatsapp";
import { trackEvent } from "../../lib/analytics";

export function Footer() {
  const handlePhoneClick = () => {
    trackEvent("phone_click");
  };

  const handleWhatsAppClick = () => {
    trackEvent("whatsapp_click");
  };

  return (
    <footer className="border-t border-thin bg-surface mt-auto">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <Logo className="mb-4" />
            <p className="text-muted max-w-sm">
              Mobile ECU remapping and diagnostics based in {site.baseTown}, serving {site.serviceAreaSummary}.
            </p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/services" className="text-muted hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/offers" className="text-muted hover:text-white transition-colors">
                  Offers
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-muted hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={buildWhatsAppUrl()}
                  onClick={handleWhatsAppClick}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted hover:text-white transition-colors"
                >
                  WhatsApp Us
                </a>
              </li>
              <li>
                <a
                  href={getPhoneUrl()}
                  onClick={handlePhoneClick}
                  className="text-muted hover:text-white transition-colors"
                >
                  Call Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-thin/50 flex flex-col md:flex-row items-center justify-between text-sm text-muted/60">
          <p>&copy; {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
