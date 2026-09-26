import * as React from "react";
import Link from "next/link";
import { cn } from "../../lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  href?: string;
  external?: boolean;
}

export const buttonStyles = (variant: "primary" | "secondary" | "ghost" = "primary", className?: string) => {
  const baseStyles =
    "inline-flex items-center justify-center min-h-[44px] px-6 py-2 rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-accent text-white hover:bg-brand-plum-light glow-plum-hover",
    secondary: "bg-transparent border border-muted text-text hover:bg-surface hover:text-white",
    ghost: "bg-transparent text-text hover:bg-surface/50",
  };

  return cn(baseStyles, variants[variant], className);
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", href, external, ...props }, ref) => {
    const classes = buttonStyles(variant, className);

    if (href) {
      if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
        return (
          <a href={href} className={classes} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
            {props.children}
          </a>
        );
      }
      return (
        <Link href={href} className={classes}>
          {props.children}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} {...props} />
    );
  }
);

Button.displayName = "Button";
