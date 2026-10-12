"use client";

import * as React from "react";
import Link from "next/link";
import { setConsent, useConsent } from "../../lib/consent";
import { buttonStyles } from "../ui/Button";
import { cn } from "../../lib/utils";

const CATEGORIES = [
  {
    key: "analytics" as const,
    title: "Analytics",
    description: "Helps us understand how the site is used so we can improve it.",
  },
  {
    key: "marketing" as const,
    title: "Marketing",
    description: "Helps us measure how well our ads work.",
  },
];

// Accept and Reject share one style so neither is pushed over the other
const choiceButton = buttonStyles("secondary", "flex-1 min-w-0 px-4");

export function ConsentBanner() {
  const consent = useConsent();
  const [managing, setManaging] = React.useState(false);
  const [draft, setDraft] = React.useState({ analytics: false, marketing: false });

  // Shown once, until the visitor makes a choice
  if (consent.status !== "undecided") return null;

  const choose = (choice: { analytics: boolean; marketing: boolean }) => {
    setConsent(choice);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="consent-title"
      className={cn(
        "fixed z-50 left-4 right-4 md:right-auto md:left-8 md:bottom-8 md:w-[26rem]",
        // On phones, sit above the fixed WhatsApp bar rather than over it
        "bottom-[calc(max(env(safe-area-inset-bottom),0.75rem)+4.5rem)]",
        "max-h-[calc(100dvh-10rem)] md:max-h-[calc(100dvh-4rem)] overflow-y-auto",
        "bg-surface/95 backdrop-blur-md border border-white/10 rounded-lg p-5 md:p-6",
        "shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)]"
      )}
    >
      <h2 id="consent-title" className="text-lg font-heading font-bold uppercase tracking-wide text-white mb-2">
        Cookies
      </h2>
      <p className="text-sm text-muted mb-4">
        We use optional cookies for analytics and marketing, only if you allow them. Our{" "}
        <Link href="/cookies" className="text-accent-light underline underline-offset-2 hover:text-white">
          Cookie Policy
        </Link>{" "}
        explains what we use and how we track.
      </p>

      {managing && (
        <fieldset className="mb-4 space-y-3">
          <legend className="sr-only">Cookie categories</legend>
          {CATEGORIES.map(({ key, title, description }) => (
            <label
              key={key}
              className="flex items-start gap-3 rounded-md border border-white/10 p-3 cursor-pointer hover:bg-white/[0.03]"
            >
              <input
                type="checkbox"
                checked={draft[key]}
                onChange={(e) => setDraft((d) => ({ ...d, [key]: e.target.checked }))}
                className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-brand-plum-light)]"
              />
              <span>
                <span className="block text-sm font-medium text-white">{title}</span>
                <span className="block text-xs text-muted mt-0.5">{description}</span>
              </span>
            </label>
          ))}
        </fieldset>
      )}

      <div className="flex gap-3">
        <button type="button" className={choiceButton} onClick={() => choose({ analytics: false, marketing: false })}>
          Reject
        </button>
        <button type="button" className={choiceButton} onClick={() => choose({ analytics: true, marketing: true })}>
          Accept
        </button>
      </div>

      <div className="mt-3 flex justify-center">
        {managing ? (
          <button
            type="button"
            className="text-sm text-accent-light underline underline-offset-2 hover:text-white min-h-[44px] px-2"
            onClick={() => choose(draft)}
          >
            Save my choices
          </button>
        ) : (
          <button
            type="button"
            className="text-sm text-muted underline underline-offset-2 hover:text-white min-h-[44px] px-2"
            onClick={() => {
              setDraft({ analytics: consent.analytics, marketing: consent.marketing });
              setManaging(true);
            }}
          >
            Manage
          </button>
        )}
      </div>
    </div>
  );
}
