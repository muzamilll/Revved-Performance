"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

interface RevealPhotoSectionProps extends React.HTMLAttributes<HTMLElement> {
  image: string;
  /** background-position classes, so the subject can be framed per breakpoint */
  imagePosition?: string;
}

// Section with a dark photo backdrop. Hovering (mouse) or pressing and holding (touch/pen)
// fades the overlay back so the photo shows through, then it returns on release.
export function RevealPhotoSection({ image, imagePosition = "bg-center", className, children, ...props }: RevealPhotoSectionProps) {
  const [pressed, setPressed] = React.useState(false);

  // Pointer events rather than :hover, which touchscreens only fake on tap. Mouse keeps the CSS hover.
  const press = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") setPressed(true);
  };
  const release = () => setPressed(false);

  return (
    <section
      className={cn("group py-16 md:py-24 relative overflow-hidden isolate [-webkit-touch-callout:none]", className)}
      onPointerDown={press}
      onPointerUp={release}
      onPointerCancel={release} // fires when the browser takes the touch over for scrolling
      onPointerLeave={release}
      {...props}
    >
      <div className={cn("absolute inset-0 -z-10 bg-cover", imagePosition)} style={{ backgroundImage: `url(${image})` }} aria-hidden="true" />
      <div
        className={cn(
          "absolute inset-0 -z-10 bg-gradient-cinematic transition-opacity duration-500 ease-out group-hover:opacity-40",
          pressed && "opacity-40"
        )}
        aria-hidden="true"
      />
      {children}
    </section>
  );
}
