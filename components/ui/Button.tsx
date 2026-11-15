import * as React from "react";
import Link from "next/link";
import { cn } from "../../lib/utils";

type Variant = "primary" | "secondary" | "ghost";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  href?: string;
  external?: boolean;
}

// primary: plate yellow, the main action. secondary: outline in the surrounding text colour,
// so it works on plum, cream and dark. ghost: text only.
export const buttonStyles = (variant: Variant = "primary", className?: string) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 min-h-[48px] px-6 py-2 rounded-md text-[15px] font-bold tracking-[0.01em] transition-[background-color,border-color,color,transform,box-shadow] duration-150 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 disabled:opacity-50 disabled:pointer-events-none";

  const variants: Record<Variant, string> = {
    primary: "bg-plate text-ink hover:bg-[#FFE04D] shadow-[0_1px_0_rgba(26,20,24,0.25)]",
    secondary: "bg-transparent border-[1.5px] border-current hover:bg-current/10",
    ghost: "bg-transparent hover:bg-current/10",
  };

  return cn(baseStyles, variants[variant], className);
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", href, external, ...props }, ref) => {
    const classes = buttonStyles(variant, className);

    if (href) {
      // Links still run the caller's onClick (e.g. analytics on WhatsApp buttons)
      const onClick = props.onClick as React.MouseEventHandler<HTMLAnchorElement> | undefined;
      if (external || href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
        return (
          <a href={href} className={classes} onClick={onClick} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined}>
            {props.children}
          </a>
        );
      }
      return (
        <Link href={href} className={classes} onClick={onClick}>
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
