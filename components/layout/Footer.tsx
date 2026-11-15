"use client";

import * as React from "react";
import Link from "next/link";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { site } from "../../data/site";
import { careCategories } from "../../data/care";
import { Wordmark } from "./Logo";
import { buildWhatsAppUrl, getPhoneUrl } from "../../lib/whatsapp";
import { trackEvent } from "../../lib/analytics";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />
    </svg>
  );
}

const linkClass = "inline-flex min-h-[44px] items-center text-[15px] text-ink hover:text-plum underline-offset-4 hover:underline";
const headingClass = "mb-1 text-[12px] font-bold uppercase tracking-[0.18em] text-plum";

const columns: { heading: string; links: { label: string; href: string }[] }[] = [
  {
    heading: "Car care",
    links: careCategories.map((c) => ({ label: c.name, href: `/${c.slug}` })),
  },
  {
    heading: "Performance",
    links: [
      { label: "All remaps", href: "/performance" },
      { label: "Stage 1 remap", href: "/performance#stage-1-remap" },
      { label: "Stage 2 remap", href: "/performance#stage-2-remap" },
      { label: "Gearbox remap", href: "/performance#dsg-gearbox-remap" },
      { label: "Software warranty terms", href: "/terms" },
    ],
  },
  {
    heading: "Revved",
    links: [
      { label: "Offers", href: "/offers" },
      { label: "Areas we cover", href: "/#areas" },
      { label: "Questions", href: "/#questions" },
    ],
  },
];

export function Footer() {
  const contacts = [
    { label: `Call ${site.phoneDisplay}`, href: getPhoneUrl(), icon: Phone, external: false, onClick: () => trackEvent("phone_click") },
    { label: "WhatsApp Revved", href: buildWhatsAppUrl(), icon: MessageCircle, external: true, onClick: () => trackEvent("whatsapp_click") },
    { label: `Email ${site.social.email}`, href: site.social.email ? `mailto:${site.social.email}` : "", icon: Mail, external: false },
    { label: "Revved on Instagram", href: site.social.instagram, icon: InstagramIcon, external: true },
    { label: "Revved on Facebook", href: site.social.facebook, icon: FacebookIcon, external: true },
  ].filter((c) => c.href);

  return (
    <footer className="mt-auto bg-cream text-ink">
      <div className="mx-auto w-full max-w-[1440px] px-6 md:px-8 lg:px-12 pt-12 lg:pt-16">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-10">
          <div className="col-span-2 lg:col-span-1">
            <Wordmark tone="cream" className="text-[26px]" />
            <p className="mt-4 max-w-[19rem] text-[15px] leading-relaxed text-ink-soft">
              Mobile car care and performance tuning across {site.serviceAreaSummary}. We come to you, {site.hoursDisplay}.
            </p>
            <a
              href={getPhoneUrl()}
              onClick={() => trackEvent("phone_click")}
              className="mt-3 inline-flex min-h-[44px] items-center text-[20px] font-semibold tracking-[-0.01em] hover:text-plum"
            >
              {site.phoneDisplay}
            </a>
            <ul className="mt-2 flex flex-wrap gap-2" aria-label="Ways to reach Revved">
              {contacts.map(({ label, href, icon: Icon, external, onClick }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={onClick}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    title={label}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line text-ink transition-colors hover:border-plum hover:bg-plum hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {columns.map((column, i) => (
            <nav key={column.heading} aria-label={column.heading} className={i === 2 ? "col-span-2 sm:col-span-1" : undefined}>
              <h2 className={headingClass}>{column.heading}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className={linkClass}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Registered company line (Companies Act trading disclosure) and legal links.
            The extra bottom padding below desktop width is the space the fixed Call / Get a quote bar sits in. */}
        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 pb-[calc(max(env(safe-area-inset-bottom),0.625rem)+5.5rem)] text-[13px] leading-relaxed text-ink-soft lg:flex-row lg:items-start lg:justify-between lg:gap-10 lg:pb-10">
          <p className="max-w-3xl">
            {site.company.legalName}. Company no. {site.company.number}. Registered in {site.company.registeredIn}.
            Registered office: {site.company.registeredOffice}.
          </p>
          <ul className="flex shrink-0 gap-5">
            {[
              { label: "Terms", href: "/terms" },
              { label: "Privacy", href: "/privacy" },
              { label: "Cookies", href: "/cookies" },
            ].map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-flex min-h-[44px] items-center text-ink underline-offset-4 hover:text-plum hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
