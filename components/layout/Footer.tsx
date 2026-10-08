"use client";

import * as React from "react";
import Link from "next/link";
import { site } from "../../data/site";
import { Logo } from "./Logo";
import { buildWhatsAppUrl, getPhoneUrl } from "../../lib/whatsapp";
import { trackEvent } from "../../lib/analytics";
import { Mail } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function Footer() {
  const handlePhoneClick = () => {
    trackEvent("phone_click");
  };

  const handleWhatsAppClick = () => {
    trackEvent("whatsapp_click");
  };

  return (
    <footer className="border-t border-border bg-surface mt-auto">
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
                <Link href="/terms" className="text-muted hover:text-white transition-colors">
                  Terms &amp; Conditions
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
              {[
                { label: "Instagram", href: site.social.instagram, icon: InstagramIcon, external: true },
                { label: "Facebook", href: site.social.facebook, icon: FacebookIcon, external: true },
                { label: site.social.email || "Email", href: site.social.email ? `mailto:${site.social.email}` : "", icon: Mail, external: false },
              ].map(({ label, href, icon: Icon, external }) => (
                <li key={label}>
                  {href ? (
                    <a
                      href={href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-2 text-muted hover:text-white transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </a>
                  ) : (
                    // Not set up yet: shown, but not a link
                    <span className="inline-flex items-center gap-2 text-muted/70">
                      <Icon className="w-4 h-4" />
                      {label}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-thin/50 flex flex-col md:flex-row items-center justify-between text-sm text-muted/60">
          <p className="text-center md:text-left">&copy; {new Date().getFullYear()} {site.company.legalName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
