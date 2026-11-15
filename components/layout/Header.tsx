"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { EnquiryButton } from "../enquiry/EnquiryButton";
import { careCategories } from "../../data/care";
import { site } from "../../data/site";
import { getPhoneUrl } from "../../lib/whatsapp";
import { trackEvent } from "../../lib/analytics";
import { lockScroll } from "../../lib/scroll-lock";
import { cn } from "../../lib/utils";

const careLinks = careCategories.map((c) => ({ label: c.name, href: `/${c.slug}` }));
const otherLinks = [
  { label: "Performance", href: "/#performance" },
  { label: "Offers", href: "/offers" },
];

const MENU_MS = 220;

export function Header() {
  const pathname = usePathname();
  const [menuMounted, setMenuMounted] = React.useState(false);
  const [menuVisible, setMenuVisible] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);
  const closeButtonRef = React.useRef<HTMLButtonElement>(null);
  const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = () => {
    if (timer.current) clearTimeout(timer.current);
    setMenuMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setMenuVisible(true)));
  };

  const closeMenu = React.useCallback((restoreFocus = true) => {
    setMenuVisible(false);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer.current = setTimeout(() => {
      setMenuMounted(false);
      if (restoreFocus) menuButtonRef.current?.focus({ preventScroll: true });
    }, reduceMotion ? 0 : MENU_MS);
  }, []);

  React.useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  // A hairline under the header once the page has scrolled, so it reads as a separate layer
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the menu is open: lock the page, focus the Close button, let Escape close it
  React.useEffect(() => {
    if (!menuMounted) return;
    const unlock = lockScroll();
    closeButtonRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      unlock();
      window.removeEventListener("keydown", onKey);
    };
  }, [menuMounted, closeMenu]);

  const isCurrent = (href: string) => !href.includes("#") && pathname === href;

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-plum-hero text-white transition-shadow duration-200 motion-reduce:transition-none",
        scrolled && "shadow-[0_1px_0_rgba(255,255,255,0.1),0_8px_24px_rgba(11,6,9,0.25)]"
      )}
    >
      <div className="mx-auto flex h-14 w-full max-w-[1440px] items-center justify-between gap-4 px-6 md:px-8 lg:h-[72px] lg:px-12">
        <Logo tone="plum" />

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden lg:flex items-center gap-1">
          {[...careLinks, ...otherLinks].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isCurrent(link.href) ? "page" : undefined}
              className={cn(
                "inline-flex min-h-[44px] items-center rounded-md px-2 text-[12px] font-semibold uppercase tracking-[0.1em] whitespace-nowrap transition-colors xl:px-3 xl:tracking-[0.14em] hover:text-plate aria-[current=page]:text-plate",
                link.label === "Performance" ? "text-plum-tint" : "text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <a
            href={getPhoneUrl()}
            onClick={() => trackEvent("phone_click")}
            className="hidden xl:inline-flex min-h-[44px] items-center gap-2 rounded-md px-3 text-[15px] font-semibold whitespace-nowrap hover:text-plate"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {site.phoneDisplay}
          </a>
          <EnquiryButton className="min-h-[44px] px-4 text-[14px] whitespace-nowrap xl:px-5">Get a quote</EnquiryButton>
        </div>

        {/* Mobile: one compact menu button. Call and Get a quote live in the bottom bar. */}
        <button
          ref={menuButtonRef}
          type="button"
          onClick={openMenu}
          aria-expanded={menuMounted}
          aria-controls="site-menu"
          className="lg:hidden -mr-2 inline-flex h-11 cursor-pointer items-center gap-2 rounded-md px-2.5 text-[13px] font-semibold uppercase tracking-[0.12em]"
        >
          Menu
          <Menu className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {menuMounted && (
        <div
          id="site-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={cn(
            "lg:hidden fixed inset-0 z-50 flex flex-col bg-plum-hero text-white transition-[opacity,transform] duration-[220ms] ease-out motion-reduce:transition-none",
            menuVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          )}
        >
          <div className="flex h-14 shrink-0 items-center justify-between px-6 md:px-8">
            <Logo tone="plum" onClick={() => closeMenu(false)} />
            <button
              ref={closeButtonRef}
              type="button"
              onClick={() => closeMenu()}
              className="-mr-2 inline-flex h-11 cursor-pointer items-center gap-2 rounded-md px-2.5 text-[13px] font-semibold uppercase tracking-[0.12em]"
            >
              Close
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Main" className="flex-1 overflow-y-auto overscroll-contain px-6 pb-6 md:px-8">
            <p className="pt-5 pb-1 text-[12px] font-bold uppercase tracking-[0.18em] text-plum-tint">Services</p>
            <ul>
              {careLinks.map((link) => (
                <li key={link.href} className="border-b border-white/15">
                  <Link
                    href={link.href}
                    onClick={() => closeMenu(false)}
                    aria-current={isCurrent(link.href) ? "page" : undefined}
                    className="flex min-h-[56px] items-center justify-between text-[22px] font-semibold tracking-[-0.01em] aria-[current=page]:text-plate"
                  >
                    {link.label}
                    <ChevronRight className="h-5 w-5 text-plum-tint" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>

            <p className="pt-7 pb-1 text-[12px] font-bold uppercase tracking-[0.18em] text-plum-tint">Tuning and offers</p>
            <ul>
              {otherLinks.map((link) => (
                <li key={link.href} className="border-b border-white/15">
                  <Link
                    href={link.href}
                    onClick={() => closeMenu(false)}
                    aria-current={isCurrent(link.href) ? "page" : undefined}
                    className="flex min-h-[56px] items-center justify-between text-[22px] font-semibold tracking-[-0.01em] aria-[current=page]:text-plate"
                  >
                    {link.label}
                    <ChevronRight className="h-5 w-5 text-plum-tint" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>

            <p className="pt-7 text-[15px] leading-relaxed text-mist">
              {site.serviceAreaSummary}, {site.hoursDisplay}. Battery call-outs run day and night.
            </p>
          </nav>

          <div className="grid shrink-0 grid-cols-2 gap-3 border-t border-white/15 px-6 pt-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] md:px-8">
            <a
              href={getPhoneUrl()}
              onClick={() => trackEvent("phone_click")}
              className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border-[1.5px] border-white text-[15px] font-bold"
            >
              <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
              Call
            </a>
            <EnquiryButton className="min-h-[48px] px-3" onClickCapture={() => closeMenu(false)}>Get a quote</EnquiryButton>
          </div>
        </div>
      )}
    </header>
  );
}
