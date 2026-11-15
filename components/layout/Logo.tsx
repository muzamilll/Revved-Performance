import * as React from "react";
import Link from "next/link";
import { cn } from "../../lib/utils";

type Tone = "plum" | "cream" | "dark";

// PERFORMANCE is always plum: true plum on cream, lighter plum on dark, plum tint on plum.
const performanceColour: Record<Tone, string> = {
  plum: "text-plum-tint",
  cream: "text-plum",
  dark: "text-plum-light",
};

export function Wordmark({ tone = "plum", className }: { tone?: Tone; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline gap-[0.3em] font-display uppercase leading-none tracking-[0.04em] whitespace-nowrap",
        tone === "cream" ? "text-ink" : "text-white",
        className
      )}
    >
      <span>Revved</span>
      <span className={performanceColour[tone]}>Performance</span>
    </span>
  );
}

type LogoProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & { tone?: Tone };

export function Logo({ className, tone = "plum", ...props }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Revved Performance home"
      className={cn("inline-flex min-h-[44px] items-center rounded-sm", className)}
      {...props}
    >
      <Wordmark tone={tone} className="text-[18px] min-[360px]:text-[21px] min-[400px]:text-[23px] lg:text-[22px] xl:text-[26px]" />
    </Link>
  );
}
