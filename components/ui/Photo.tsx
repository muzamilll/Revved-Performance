import * as React from "react";
import { Photo as PhotoData, unsplashUrl } from "../../data/photos";
import { cn } from "../../lib/utils";

// A real photo from data/photos.ts, filling its box. Unsplash resizes it to each screen's
// width (one compression, sharp on retina phones). Use inside a positioned box with a set size.
// "sizes" must describe the width the photo is DRAWN at, not the box: a landscape photo in a
// portrait box is cropped, so it's drawn about twice the box's width.
const WIDTHS = [640, 960, 1280, 1600, 2000, 2600, 3200];

export function Photo({
  photo,
  sizes,
  priority = false,
  className,
}: {
  photo: PhotoData;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={unsplashUrl(photo.id, 1280)}
      srcSet={WIDTHS.map((w) => `${unsplashUrl(photo.id, w)} ${w}w`).join(", ")}
      sizes={sizes}
      alt={photo.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      style={{ objectPosition: photo.focus }}
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
    />
  );
}
