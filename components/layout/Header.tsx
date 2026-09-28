"use client";

import * as React from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { ChevronRight, Mail, Menu, Phone, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "./Logo";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { about } from "../../data/about";
import { site } from "../../data/site";
import { getPhoneUrl } from "../../lib/whatsapp";
import { trackEvent } from "../../lib/analytics";
import { cn } from "../../lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [hiddenOnScroll, setHiddenOnScroll] = React.useState(false);
  const [atTop, setAtTop] = React.useState(true);
  const pathname = usePathname();
  // True only in the browser, so the portal never renders during SSR/hydration
  const isClient = React.useSyncExternalStore(() => () => {}, () => true, () => false);

  // On home page, we can link to hash directly. On other pages, we prepend '/'.
  const isHome = pathname === "/";
  const getHashLink = (hash: string) => (isHome ? hash : `/${hash}`);

  const navLinks = [
    { label: "Services", href: "/services" },
    { label: "Offers", href: "/offers" },
    { label: "How it works", href: getHashLink("#how-it-works") },
  ];

  if (about) {
    navLinks.push({ label: "About", href: getHashLink("#about") });
  }

  // Close mobile menu on route change
  React.useEffect(() => {
    // eslint-disable-next-line
    setMobileMenuOpen(false);
  }, [pathname]);

  // Smart header: hide while scrolling down, show again only when scrolling up (or near the top).
  // Only the mobile styles act on hiddenOnScroll (max-lg:), so desktop is unchanged.
  React.useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      setAtTop(y < 10);
      if (y < 80 || delta < -4) setHiddenOnScroll(false);
      else if (delta > 4) setHiddenOnScroll(true);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const isHidden = hiddenOnScroll && !mobileMenuOpen;

  // On the homepage the logo takes you back to the top of the page
  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isHome) return;
    e.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  };

  // Over the homepage hero the header is see-through until the page scrolls
  const isTransparent = isHome && atTop && !mobileMenuOpen;

  // Stop the page scrolling behind the open menu, and let Escape close it
  React.useEffect(() => {
    if (!mobileMenuOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileMenuOpen]);

  return (
    <>
    <header
      onFocusCapture={() => setHiddenOnScroll(false)}
      className={cn(
        "fixed top-0 inset-x-0 z-40 border-b transition-[transform,background-color,border-color] duration-300 ease-out motion-reduce:transition-none",
        isTransparent ? "bg-transparent border-transparent" : "bg-background/80 backdrop-blur-md border-border",
        isHidden && "max-lg:-translate-y-full"
      )}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 h-20 flex items-center justify-between">
        <Logo onClick={handleLogoClick} />

        <nav className="hidden lg:flex flex-1 items-center justify-center gap-6 xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="whitespace-nowrap text-sm font-medium uppercase tracking-wider text-muted hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        
        <div className="hidden lg:flex items-center">
          <WhatsAppButton label="Get a quote" className="uppercase tracking-wider font-bold" />
        </div>

        <button
          className="lg:hidden -mr-2 p-2.5 text-white hover:text-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={mobileMenuOpen}
        >
          <Menu className="w-7 h-7" />
        </button>
      </div>

      {/* Portalled to <body>: the header's backdrop-blur would otherwise trap this fixed overlay inside the header bar */}
      {isClient && createPortal(
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="lg:hidden fixed inset-0 z-50 bg-background flex flex-col"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
            >
              <div className="h-20 px-6 flex items-center justify-between border-b border-border flex-shrink-0">
                <Logo onClick={() => setMobileMenuOpen(false)} />
                <button
                  className="-mr-2 p-2.5 text-white hover:text-accent-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="w-7 h-7" />
                </button>
              </div>

              <nav className="flex-1 flex flex-col px-6 pt-4 pb-[max(env(safe-area-inset-bottom),1.5rem)] overflow-y-auto">
                <ul>
                  {navLinks.map((link) => (
                    <li key={link.label} className="border-b border-border">
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-between py-5 text-2xl font-heading font-bold uppercase tracking-wide text-white hover:text-accent-light transition-colors"
                      >
                        {link.label}
                        <ChevronRight className="w-6 h-6 text-accent-light" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-10 flex flex-col gap-3">
                  <WhatsAppButton label="Get a quote" className="w-full h-14 uppercase tracking-widest font-bold" />
                  <a
                    href={getPhoneUrl()}
                    onClick={() => trackEvent("phone_click")}
                    className="w-full h-14 inline-flex items-center justify-center gap-2 rounded-md border border-muted/40 text-white font-bold uppercase tracking-widest hover:border-white transition-colors"
                  >
                    <Phone className="w-5 h-5" aria-hidden="true" />
                    Call us
                  </a>
                  {site.social.email && (
                    <a
                      href={`mailto:${site.social.email}`}
                      className="mt-2 inline-flex items-center justify-center gap-2 text-muted hover:text-white transition-colors"
                    >
                      <Mail className="w-4 h-4" aria-hidden="true" />
                      {site.social.email}
                    </a>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </header>
    {/* The header is fixed, so reserve its height on every page except home, where the hero sits behind it */}
    {!isHome && <div className="h-20" aria-hidden="true" />}
    </>
  );
}
