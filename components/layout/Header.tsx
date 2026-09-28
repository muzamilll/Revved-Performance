"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "./Logo";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { about } from "../../data/about";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

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

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 h-20 flex items-center justify-between">
        <Logo />

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
          className="lg:hidden p-2 text-muted hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-background flex flex-col"
          >
            <div className="h-20 px-6 flex items-center justify-between border-b border-border">
              <Logo onClick={() => setMobileMenuOpen(false)} />
              <button
                className="p-2 text-muted hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex-1 flex flex-col p-6 gap-6 overflow-y-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-heading font-bold text-white hover:text-accent-light transition-colors block"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-8">
                <WhatsAppButton label="Get a quote" className="w-full" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
