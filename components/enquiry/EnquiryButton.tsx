"use client";

import * as React from "react";
import { useEnquiry } from "./EnquiryProvider";
import { buttonStyles } from "../ui/Button";
import { EnquiryTiming } from "../../lib/enquiry";
import { cn } from "../../lib/utils";

interface EnquiryButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  // The service or offer to preselect (an enquiry choice id). Omit for a general "Get a quote".
  choice?: string;
  timing?: EnquiryTiming;
  variant?: "primary" | "secondary" | "ghost";
  // "plain" drops the button styling, for text links and whole-row buttons
  plain?: boolean;
}

// Any service or offer button on the site is one of these: it opens the enquiry
// with that choice already selected.
export function EnquiryButton({ choice, timing, variant = "primary", plain, className, children, ...props }: EnquiryButtonProps) {
  const { openEnquiry } = useEnquiry();
  return (
    <button
      type="button"
      onClick={() => openEnquiry(choice, timing ? { timing } : undefined)}
      className={plain ? cn("cursor-pointer", className) : buttonStyles(variant, cn("cursor-pointer", className))}
      {...props}
    >
      {children ?? "Get a quote"}
    </button>
  );
}
