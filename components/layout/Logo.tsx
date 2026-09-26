import * as React from "react";
import Link from "next/link";
import { cn } from "../../lib/utils";

type LogoProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

// Brand pink from the logo artwork (distinct from the site's plum accent).
const LOGO_PINK = "#EF0C7F";

export function Logo({ className, ...props }: LogoProps) {
  const id = React.useId();
  const fadeLeft = `${id}-fade-l`;
  const fadeRight = `${id}-fade-r`;
  const glow = `${id}-glow`;

  return (
    <Link
      href="/"
      aria-label="Revved Performance home"
      className={cn(
        "inline-block text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm",
        className
      )}
      {...props}
    >
      <svg
        viewBox="0 0 1380 160"
        className="h-6 min-[360px]:h-7 sm:h-8 lg:h-9 xl:h-10 w-auto overflow-visible"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id={fadeLeft} x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor={LOGO_PINK} stopOpacity="0" />
            <stop offset="1" stopColor={LOGO_PINK} />
          </linearGradient>
          <linearGradient id={fadeRight} x1="1" x2="0" y1="0" y2="0">
            <stop offset="0" stopColor={LOGO_PINK} stopOpacity="0" />
            <stop offset="1" stopColor={LOGO_PINK} />
          </linearGradient>
          <filter id={glow} x="-20%" y="-400%" width="140%" height="900%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* REVVED — stroked centrelines (24 units thick, 96 tall) */}
        <g fill="none" stroke="currentColor" strokeWidth="24" strokeLinejoin="round">
          {/* R */}
          <path d="M12 96V12H208V48H12" />
          {/* E */}
          <path d="M426 12H248V84H426M248 48H416" />
          {/* E */}
          <path d="M1144 12H966V84H1144M966 48H1134" />
          {/* D */}
          <path d="M1172 12H1332A36 36 0 0 1 1368 48A36 36 0 0 1 1332 84H1172Z" />
        </g>
        <g fill="currentColor" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
          {/* R leg */}
          <path d="M146 60H182L220 96H184Z" />
          {/* V */}
          <path d="M442 0H480L562 65.6L644 0H682L562 96Z" />
          {/* V */}
          <path d="M696 0H734L816 65.6L898 0H936L816 96Z" />
        </g>

        {/* Pink bars with glow */}
        <g>
          <rect x="4" y="131" width="266" height="12" fill={`url(#${fadeLeft})`} filter={`url(#${glow})`} />
          <rect x="1110" y="131" width="266" height="12" fill={`url(#${fadeRight})`} filter={`url(#${glow})`} />
          <rect x="24" y="134" width="246" height="6" fill={`url(#${fadeLeft})`} />
          <rect x="1110" y="134" width="246" height="6" fill={`url(#${fadeRight})`} />
        </g>

        {/* PERFORMANCE */}
        <text
          x="690"
          y="151"
          textAnchor="middle"
          textLength="800"
          lengthAdjust="spacing"
          fill="currentColor"
          fontSize="36"
          fontWeight="300"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
        >
          PERFORMANCE
        </text>
      </svg>
    </Link>
  );
}
