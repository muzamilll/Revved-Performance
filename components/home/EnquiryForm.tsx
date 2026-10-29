"use client";

import * as React from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { submitFormLead } from "../../lib/leads/client";
import { Button } from "../ui/Button";

type Option = { slug: string; name: string };

const input =
  "w-full h-12 px-4 bg-surface text-white rounded-md border border-border focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 placeholder:text-muted/70";

// Reply time promised on screen after an enquiry. Keep it honest.
const REPLY_PROMISE = "We'll reply within a few hours during working hours.";

export function EnquiryForm({ services }: { services: Option[] }) {
  const [state, setState] = React.useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = React.useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const get = (key: string) => String(form.get(key) ?? "").trim() || undefined;
    setState("sending");
    setError(null);
    const result = await submitFormLead({
      contactMethod: "form",
      name: get("name"),
      phone: get("phone"),
      email: get("email"),
      reg: get("reg"),
      service: get("service"),
      message: get("message"),
      company: get("company"),
    });
    if (result.ok) {
      setState("sent");
    } else {
      setState("idle");
      setError(result.error ?? "Something went wrong.");
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-md border border-accent/50 bg-accent/10 p-5" role="status">
        <p className="flex items-center gap-2 font-bold text-white">
          <CheckCircle2 className="w-5 h-5 text-accent-light" /> Got it, thanks.
        </p>
        <p className="mt-1 text-muted">{REPLY_PROMISE}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <div className="grid sm:grid-cols-2 gap-3">
        <input name="name" required autoComplete="name" placeholder="Your name" className={input} aria-label="Your name" />
        <input name="phone" required type="tel" autoComplete="tel" placeholder="Phone number" className={input} aria-label="Phone number" />
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <input name="reg" placeholder="Registration (optional)" className={`${input} uppercase`} aria-label="Vehicle registration" />
        <select name="service" defaultValue="" className={input} aria-label="Service">
          <option value="">What do you need?</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>{s.name}</option>
          ))}
          <option value="not-sure">Not sure yet</option>
        </select>
      </div>
      <input name="email" type="email" autoComplete="email" placeholder="Email (optional)" className={input} aria-label="Email" />
      <textarea name="message" rows={3} placeholder="Anything else we should know?" className={`${input} h-auto py-3`} aria-label="Message" />
      {/* Honeypot: hidden from people, filled in by bots */}
      <input name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {error && <p className="text-sm text-red-300" role="alert">{error}</p>}
      <Button type="submit" variant="secondary" disabled={state === "sending"} className="w-full sm:w-auto uppercase tracking-wider font-bold text-xs">
        {state === "sending" ? "Sending…" : "Send enquiry"}
      </Button>
      <p className="text-xs text-muted">
        We&apos;ll only use your details to reply to this enquiry. See our{" "}
        <Link href="/privacy" className="text-accent-light underline underline-offset-4 hover:text-white">privacy policy</Link>.
      </p>
    </form>
  );
}
