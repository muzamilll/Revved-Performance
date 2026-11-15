import * as React from "react";
import Link from "next/link";
import { Container } from "../layout/layout-primitives";
import { PromiseRow } from "./shared";
import { cn } from "../../lib/utils";

// The hero for every inner page: breadcrumb, chip, heading, intro, and a price box on the right.
// Plum for car care and offers; dark for Performance. Same structure either way.
export function PageHero({
  tone = "plum",
  crumb,
  chip,
  title,
  intro,
  aside,
  promises,
}: {
  tone?: "plum" | "dark";
  crumb: string;
  chip?: string;
  title: React.ReactNode;
  intro: React.ReactNode;
  aside?: React.ReactNode;
  promises?: string[];
}) {
  return (
    <section
      className={cn("relative isolate overflow-hidden text-white", tone === "plum" ? "bg-plum" : "bg-dark")}
      style={
        tone === "dark"
          ? { backgroundImage: "radial-gradient(ellipse 900px 520px at 70% 0%, rgba(105,60,86,0.85), rgba(105,60,86,0) 70%)" }
          : undefined
      }
    >
      <Container className="pt-5 pb-8 lg:pt-10 lg:pb-12">
        <nav aria-label="Breadcrumb" className="hero-rise text-[13px] text-white/70" style={{ "--i": 0 } as React.CSSProperties}>
          <ol className="flex items-center gap-2">
            <li><Link href="/" className="inline-flex min-h-[44px] items-center underline-offset-4 hover:text-white hover:underline">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-white">{crumb}</li>
          </ol>
        </nav>

        <div className={cn("mt-2 grid gap-8 lg:mt-6 lg:items-end lg:gap-16", aside && "lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)]")}>
          <div>
            {chip && (
              <p className="hero-rise" style={{ "--i": 1 } as React.CSSProperties}>
                <span className="inline-block rounded-sm bg-plate px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-ink">{chip}</span>
              </p>
            )}
            <h1 className="hero-rise mt-4 max-w-[17ch] text-[clamp(2.25rem,9.4vw,4.25rem)] font-semibold leading-[1.02] tracking-[-0.025em] text-balance" style={{ "--i": 2 } as React.CSSProperties}>
              {title}
            </h1>
            <div className="hero-rise mt-4 max-w-[34rem] text-[17px] leading-relaxed text-white/80 lg:text-[18px]" style={{ "--i": 3 } as React.CSSProperties}>
              {intro}
            </div>
          </div>
          {aside && <div className="hero-rise" style={{ "--i": 4 } as React.CSSProperties}>{aside}</div>}
        </div>

        {promises && <PromiseRow items={promises} />}
      </Container>
    </section>
  );
}

// The price box in a page hero
export function HeroPriceBox({ label, price, note, children }: { label: string; price: string; note?: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/20 bg-white/[0.08] p-5 lg:p-6">
      <p className="text-[12px] font-bold uppercase tracking-[0.18em] text-white/70">{label}</p>
      <p className="mt-1.5 text-[32px] font-bold leading-tight tracking-[-0.02em] text-plate lg:text-[36px]">{price}</p>
      {note && <p className="mt-2 text-[14px] leading-relaxed text-white/75">{note}</p>}
      <div className="mt-5 flex flex-col gap-2.5">{children}</div>
    </div>
  );
}
