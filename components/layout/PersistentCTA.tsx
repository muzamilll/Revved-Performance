"use client";

import * as React from "react";
import { MessageCircle } from "lucide-react";
import { buildWhatsAppUrl } from "../../lib/whatsapp";
import { trackEvent } from "../../lib/analytics";
export function PersistentCTA() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // eslint-disable-next-line
    setMounted(true);
  }, []);

  const handleClick = () => {
    trackEvent("whatsapp_click");
  };

  if (!mounted) return null;

  return (
    <>
      {/* Mobile Fixed Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface/90 backdrop-blur-md border-t border-thin px-4 py-3 pb-[max(env(safe-area-inset-bottom),0.75rem)] transition-transform duration-300 transform translate-y-0 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)]">
        <a
          href={buildWhatsAppUrl()}
          onClick={handleClick}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-full min-h-[44px] bg-accent text-white rounded-md font-medium text-lg gap-2 active:scale-[0.98] transition-transform"
        >
          <MessageCircle className="w-5 h-5" />
          Message Revved
        </a>
      </div>

      {/* Padding at the bottom of the body on mobile to prevent content being hidden */}
      <div className="md:hidden h-[80px] w-full" aria-hidden="true" />

      {/* Desktop Floating Button */}
      <div className="hidden md:block fixed bottom-8 right-8 z-40">
        <a
          href={buildWhatsAppUrl()}
          onClick={handleClick}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 bg-accent text-white rounded-full shadow-2xl hover:bg-brand-plum-light hover:scale-105 active:scale-95 transition-all glow-plum"
          aria-label="Message us on WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
        </a>
      </div>
    </>
  );
}
