import * as React from "react";
import { cn } from "../../lib/utils";

export const Container = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("w-full max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12", className)}
      {...props}
    />
  )
);
Container.displayName = "Container";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  backgroundImage?: string;
  overlay?: boolean;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, backgroundImage, overlay, children, style, ...props }, ref) => (
    <section
      ref={ref}
      className={cn("py-16 md:py-24 relative overflow-hidden", className)}
      style={{
        ...(backgroundImage ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}),
        ...style
      }}
      {...props}
    >
      {backgroundImage && overlay && (
        <div className="absolute inset-0 bg-gradient-cinematic z-0" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  )
);
Section.displayName = "Section";

interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  intro?: string;
}

export const SectionHeading = React.forwardRef<HTMLDivElement, SectionHeadingProps>(
  ({ eyebrow, title, intro, className, ...props }, ref) => (
    <div ref={ref} className={cn("max-w-2xl mb-12", className)} {...props}>
      {eyebrow && (
        <p className="text-accent text-sm font-bold uppercase tracking-wider mb-2">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
        {title}
      </h2>
      {intro && <p className="text-muted text-lg">{intro}</p>}
    </div>
  )
);
SectionHeading.displayName = "SectionHeading";
