import * as React from "react";
import Link from "next/link";
import { cn } from "../../lib/utils";

type LogoProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export function Logo({ className, ...props }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "font-heading font-bold text-2xl tracking-widest text-white uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm inline-block",
        className
      )}
      {...props}
    >
      REVVED
    </Link>
  );
}
