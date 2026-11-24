import * as React from "react";
import { Container } from "../layout/layout-primitives";
import { Reveal } from "../ui/Reveal";
import { cn } from "../../lib/utils";

// One section wrapper for the whole site, so every section shares the same spacing:
// 64px top and bottom on phones, 96px on desktop; 40px / 48px under the heading.
export type Tone = "cream" | "plum" | "dark";

const toneClass: Record<Tone, string> = {
  cream: "bg-cream text-ink",
  plum: "bg-plum text-white",
  dark: "bg-dark text-cream",
};

export function Band({
  tone = "cream",
  id,
  label,
  className,
  containerClassName,
  children,
  style,
}: {
  tone?: Tone;
  id?: string;
  label?: string;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <section id={id} aria-label={label} className={cn("relative py-16 lg:py-24", toneClass[tone], className)} style={style}>
      <Container className={containerClassName}>
        <Reveal>{children}</Reveal>
      </Container>
    </section>
  );
}

export function Eyebrow({ children, tone = "cream", className }: { children: React.ReactNode; tone?: Tone; className?: string }) {
  return (
    <p className={cn("text-[12px] font-bold uppercase tracking-[0.18em]", tone === "cream" ? "text-plum" : "text-white/70", className)}>
      {children}
    </p>
  );
}

// Section heading: Inter. Anton is kept for the hero and the final call.
export function Heading({ children, className, as: Tag = "h2" }: { children: React.ReactNode; className?: string; as?: "h1" | "h2" | "h3" }) {
  return (
    <Tag className={cn("text-[clamp(1.9rem,6.4vw,2.875rem)] font-medium leading-[1.08] tracking-[-0.02em] text-balance", className)}>
      {children}
    </Tag>
  );
}

// Heading block at the top of a section, with an optional line of text beside it
export function BandHeader({
  eyebrow,
  title,
  aside,
  tone = "cream",
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 flex flex-col gap-4 lg:mb-12 lg:flex-row lg:items-end lg:justify-between lg:gap-10", className)}>
      <div>
        <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        <Heading className="mt-3">{title}</Heading>
      </div>
      {aside && <div className={cn("max-w-[22rem] text-[15px] leading-relaxed", tone === "cream" ? "text-ink-soft" : "text-white/75")}>{aside}</div>}
    </div>
  );
}

// The card used everywhere: white on cream, translucent on plum and dark
export const cardClass: Record<Tone, string> = {
  cream: "rounded-xl border border-line bg-white",
  plum: "rounded-xl border border-white/15 bg-white/[0.07]",
  dark: "rounded-xl border border-white/10 bg-white/[0.05]",
};

// Press and hover feedback for cards that are links or buttons
export const cardInteractive =
  "transition-[transform,box-shadow,border-color] duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100";
