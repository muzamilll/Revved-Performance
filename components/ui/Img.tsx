import * as React from "react";
import Image, { ImageProps as NextImageProps } from "next/image";
import { cn } from "../../lib/utils";

type BaseImgProps = Omit<NextImageProps, "alt">;

export type ImgProps = BaseImgProps & {
  decorative?: boolean;
  alt: string;
};

export const Img = React.forwardRef<HTMLImageElement, ImgProps>(
  ({ decorative, alt, className, ...props }, ref) => {
    const finalAlt = decorative ? "" : alt;
    return (
      <Image
        ref={ref}
        alt={finalAlt}
        className={cn("object-cover", className)}
        {...props}
      />
    );
  }
);
Img.displayName = "Img";

interface ImagePlaceholderProps extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: "16/9" | "4/3" | "1/1";
  label?: string;
}

export const ImagePlaceholder = React.forwardRef<HTMLDivElement, ImagePlaceholderProps>(
  ({ aspectRatio = "16/9", label = "Image Placeholder", className, ...props }, ref) => {
    const ratioClass = {
      "16/9": "aspect-video",
      "4/3": "aspect-[4/3]",
      "1/1": "aspect-square"
    }[aspectRatio];

    return (
      <div
        ref={ref}
        className={cn("bg-surface border-thin rounded-lg flex items-center justify-center text-muted font-medium text-sm", ratioClass, className)}
        {...props}
      >
        {label}
      </div>
    );
  }
);
ImagePlaceholder.displayName = "ImagePlaceholder";
