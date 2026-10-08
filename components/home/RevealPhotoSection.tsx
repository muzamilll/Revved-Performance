"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

interface RevealPhotoSectionProps extends React.HTMLAttributes<HTMLElement> {
  image: string;
  /** width / height of the photo. On phones it's shown whole at the top rather than cropped to fill the section. */
  imageRatio: number;
  /** background-position classes for the cropped desktop view */
  imagePosition?: string;
}

// Section with a dark photo backdrop. Hovering (mouse) or tapping (touch/pen) fades the
// overlay back so the photo shows through. A second tap, or scrolling away, brings it back.
export function RevealPhotoSection({ image, imageRatio, imagePosition = "bg-center", className, children, ...props }: RevealPhotoSectionProps) {
  const [revealed, setRevealed] = React.useState(false);
  const sectionRef = React.useRef<HTMLElement>(null);
  const pointerType = React.useRef("mouse");

  // Reset once the section is scrolled out of view, so it's dark again on the way back
  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setRevealed(false);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Tap rather than press-and-hold: holding on a phone opens the copy/select menu.
  // Mouse keeps the CSS hover, which Tailwind only applies on devices that can hover.
  const toggle = (e: React.MouseEvent) => {
    if (pointerType.current === "mouse") return;
    if ((e.target as HTMLElement).closest("a, button")) return;
    setRevealed(r => !r);
  };

  return (
    <section
      ref={sectionRef}
      className={cn("group py-16 md:py-24 relative overflow-hidden isolate", className)}
      onPointerDown={e => (pointerType.current = e.pointerType)}
      onClick={toggle}
      {...props}
    >
      {/* Phones: the section is far taller than the photo, so filling it would crop most of the picture.
          Show it full-width at its own ratio instead, fading into the background below. */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 -z-10 aspect-(--ratio) bg-cover bg-center mask-b-from-60%",
          "md:bottom-0 md:aspect-auto md:mask-none",
          imagePosition
        )}
        style={{ backgroundImage: `url(${image})`, "--ratio": imageRatio } as React.CSSProperties}
        aria-hidden="true"
      />
      <div
        className={cn(
          "absolute inset-0 -z-10 transition-opacity duration-500 ease-out group-hover:opacity-40",
          revealed && "opacity-40"
        )}
        aria-hidden="true"
      >
        {/* On phones the section is tall and narrow, so the photo's brightest part lands behind the text.
            An extra flat scrim keeps it as dark as the desktop version. */}
        <div className="absolute inset-0 bg-background/70 md:hidden" />
        <div className="absolute inset-0 bg-gradient-cinematic" />
      </div>
      {children}
    </section>
  );
}
