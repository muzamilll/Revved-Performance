"use client";

import * as React from "react";
import { EnquiryButton } from "../enquiry/EnquiryButton";
import { CallLink, WhatsAppLink } from "../ui/actions";

// Phones and tablets: the three ways in, always in reach.
// Call (urgent), WhatsApp (questions), Book (request a booking, the main action).
// The footer reserves the same height at the end of the page, so the bar never covers content.
export function BottomBar() {
  return (
    <div
      role="region"
      aria-label="Contact Revved"
      className="lg:hidden fixed inset-x-0 bottom-0 z-30 border-t border-white/15 bg-plum text-white shadow-[0_-8px_24px_rgba(21,11,18,0.3)]"
    >
      <div className="mx-auto grid max-w-xl grid-cols-[1fr_1.15fr_1.5fr] gap-2 px-3 pt-2.5 pb-[max(env(safe-area-inset-bottom),0.625rem)] min-[380px]:px-4">
        <CallLink className="min-h-[48px] gap-1.5 px-2 text-[15px] text-white">Call</CallLink>
        <WhatsAppLink className="min-h-[48px] gap-1.5 px-2 text-[15px] text-white">WhatsApp</WhatsAppLink>
        <EnquiryButton className="min-h-[48px] px-2 text-[15px]">Get a quote</EnquiryButton>
      </div>
    </div>
  );
}
