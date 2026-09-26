import * as React from "react";
import { cn } from "../../lib/utils";
import { Price } from "../../types";

export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("bg-surface border-thin rounded-xl p-6 md:p-8 flex flex-col", className)}
      {...props}
    />
  )
);
Card.displayName = "Card";

export const Badge = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-accent/20 text-brand-plum-light border border-accent/30", className)}
      {...props}
    />
  )
);
Badge.displayName = "Badge";

interface PriceTagProps extends React.HTMLAttributes<HTMLDivElement> {
  price: Price;
}

export const PriceTag = React.forwardRef<HTMLDivElement, PriceTagProps>(
  ({ price, className, ...props }, ref) => {
    let displayPrice = "Price on request";
    if (price) {
      displayPrice = price.from ? `From £${price.amount}` : `£${price.amount}`;
    }

    return (
      <div
        ref={ref}
        className={cn("text-xl md:text-2xl font-heading font-bold text-white", className)}
        {...props}
      >
        {displayPrice}
      </div>
    );
  }
);
PriceTag.displayName = "PriceTag";
