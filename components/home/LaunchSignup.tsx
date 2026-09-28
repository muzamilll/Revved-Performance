"use client";

import * as React from "react";
import Link from "next/link";
import { services } from "../../data/services";
import { launchOffer } from "../../data/launch-offer";
import { Card } from "../ui/ui-primitives";
import { Button } from "../ui/Button";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { LaunchSlots, getLaunchPrice } from "../ui/ServicePrice";

const inputClasses =
  "w-full h-12 px-4 rounded-md bg-background border border-thin text-white placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent";

export function LaunchSignup() {
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success">("idle");
  const [error, setError] = React.useState<string | null>(null);

  const launchServices = services.filter(s => s.status === "active" && getLaunchPrice(s) !== null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setError(null);
    setStatus("submitting");

    try {
      const res = await fetch("/api/launch-signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          phone: form.get("phone"),
          consent: form.get("consent") === "on",
          company: form.get("company"),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again or message us on WhatsApp.");
        setStatus("idle");
        return;
      }
      setStatus("success");
    } catch {
      setError("Something went wrong. Please try again or message us on WhatsApp.");
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <Card className="bg-surface border-accent/40 glow-plum max-w-xl">
        <p className="text-xs font-bold uppercase tracking-widest text-accent-light mb-2">{launchOffer.label}</p>
        <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-white uppercase tracking-tight mb-4">
          You&apos;re in. Here&apos;s your launch offer.
        </h3>
        {launchServices.length > 0 && (
          <ul className="space-y-2 mb-4">
            {launchServices.map(s => (
              <li key={s.slug} className="flex justify-between gap-4 text-sm text-muted border-b border-thin/50 pb-2">
                <span>{s.name}</span>
                <span className="whitespace-nowrap">
                  {s.price?.from && <span className="text-muted text-xs uppercase mr-2">From</span>}
                  <s className="text-muted mr-2">£{s.price?.amount}</s>
                  <strong className="text-white">£{getLaunchPrice(s)}</strong>
                </span>
              </li>
            ))}
          </ul>
        )}
        <LaunchSlots className="mb-6" />
        <WhatsAppButton
          message="Hi Revved, I signed up for the launch offer."
          className="w-full sm:w-auto uppercase tracking-widest font-bold"
          label="Claim on WhatsApp"
        />
      </Card>
    );
  }

  return (
    <Card className="bg-surface border-thin max-w-xl">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate={false}>
        <div>
          <label htmlFor="launch-email" className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Email</label>
          <input id="launch-email" name="email" type="email" required autoComplete="email" className={inputClasses} placeholder="you@example.com" />
        </div>
        <div>
          <label htmlFor="launch-phone" className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">
            Phone <span className="text-muted normal-case tracking-normal font-medium">(optional)</span>
          </label>
          <input id="launch-phone" name="phone" type="tel" autoComplete="tel" className={inputClasses} placeholder="07..." />
        </div>
        {/* Honeypot: hidden from people, filled in by bots */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <label className="flex items-start gap-3 text-sm text-muted cursor-pointer">
          <input name="consent" type="checkbox" required className="mt-1 h-4 w-4 accent-accent flex-shrink-0" />
          <span>I&apos;d like to hear about offers and updates from Revved Performance</span>
        </label>
        <p className="text-xs text-muted">
          Unsubscribe any time. See our <Link href="/privacy" className="underline underline-offset-2 hover:text-white">privacy policy</Link>.
        </p>
        {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
        <Button type="submit" disabled={status === "submitting"} className="h-12 uppercase tracking-widest font-bold">
          {status === "submitting" ? "Signing up..." : "Get the launch offer"}
        </Button>
      </form>
    </Card>
  );
}
