"use client";

import * as React from "react";
import { Phone } from "lucide-react";
import { EnquiryButton } from "../enquiry/EnquiryButton";
import { getPhoneUrl } from "../../lib/whatsapp";
import { trackEvent } from "../../lib/analytics";

// Phones and tablets: a persistent bar with the two actions, Call and Get a quote.
// The footer reserves the same height at the end of the page, so the bar never covers content.
export function BottomBar() {
  return (
    <div
      role="region"
      aria-label="Contact Revved"
      className="lg:hidden fixed inset-x-0 bottom-0 z-30 border-t border-white/15 bg-plum text-white shadow-[0_-8px_24px_rgba(11,6,9,0.3)]"
    >
      <div className="mx-auto grid max-w-xl grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-3 px-4 pt-2.5 pb-[max(env(safe-area-inset-bottom),0.625rem)]">
        <a
          href={getPhoneUrl()}
          onClick={() => trackEvent("phone_click")}
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-md border-[1.5px] border-white text-[15px] font-bold active:scale-[0.98] motion-reduce:active:scale-100"
        >
          <Phone className="h-[18px] w-[18px]" aria-hidden="true" />
          Call
        </a>
        <EnquiryButton className="min-h-[48px] px-3">Get a quote</EnquiryButton>
      </div>
    </div>
  );
}
