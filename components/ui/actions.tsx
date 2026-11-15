"use client";

import * as React from "react";
import { MessageCircle, Phone } from "lucide-react";
import { buildWhatsAppUrl, getPhoneUrl } from "../../lib/whatsapp";
import { trackEvent } from "../../lib/analytics";
import { buttonStyles } from "./Button";
import { cn } from "../../lib/utils";
import { site } from "../../data/site";

// The three ways in, each with one job:
//   Request a booking  -> EnquiryButton (the short form, service preselected)
//   Ask on WhatsApp    -> WhatsAppLink (a direct conversation, for questions)
//   Call               -> CallLink (urgent help)

export const WHATSAPP_QUESTION = "Hi Revved, I have a question about my car.";

type Variant = "primary" | "secondary" | "ghost";

interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  variant?: Variant;
  plain?: boolean;      // no button styling
  icon?: boolean;
}

export function WhatsAppLink({ message = WHATSAPP_QUESTION, variant = "secondary", plain, icon = true, className, children, onClick, ...props }: LinkProps & { message?: string }) {
  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        trackEvent("whatsapp_click");
        onClick?.(e);
      }}
      className={plain ? className : buttonStyles(variant, className)}
      {...props}
    >
      {icon && <MessageCircle className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />}
      {children ?? "Ask on WhatsApp"}
    </a>
  );
}

export function CallLink({ variant = "secondary", plain, icon = true, className, children, onClick, ...props }: LinkProps) {
  return (
    <a
      href={getPhoneUrl()}
      onClick={(e) => {
        trackEvent("phone_click");
        onClick?.(e);
      }}
      className={plain ? className : buttonStyles(variant, className)}
      {...props}
    >
      {icon && <Phone className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />}
      {children ?? `Call ${site.phoneDisplay}`}
    </a>
  );
}

// Text-sized row of the two conversation options, used under main buttons
export function TalkLinks({ className, tone = "light" }: { className?: string; tone?: "light" | "dark" }) {
  const link = cn(
    "inline-flex min-h-[44px] items-center gap-2 font-semibold underline-offset-4 hover:underline",
    tone === "light" ? "text-white" : "text-ink"
  );
  return (
    <p className={cn("flex flex-wrap items-center gap-x-5 text-[15px]", className)}>
      <WhatsAppLink plain className={link} />
      <CallLink plain className={link} />
    </p>
  );
}
