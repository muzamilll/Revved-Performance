import fs from "node:fs";
import path from "node:path";
import { Img } from "../ui/Img";
import { isPreviewBuild } from "../../lib/env";

// Page header image (1600 x 2000 WebP, 4:5). Drop the file into public/images/headers/<name>.webp
// and it appears; until then previews show a marked slot and the live site shows nothing.
export function headerImageExists(name: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", "images", "headers", `${name}.webp`));
}

export function HeaderImage({ name, alt }: { name: string; alt: string }) {
  if (headerImageExists(name)) {
    return (
      <div className="hero-art relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-white/5">
        <Img
          src={`/images/headers/${name}.webp`}
          alt={alt}
          fill
          preload
          sizes="(min-width: 1024px) 30rem, 100vw"
          className="object-cover"
        />
      </div>
    );
  }
  if (!isPreviewBuild()) return null;
  return (
    <div className="flex aspect-[4/5] w-full items-center justify-center rounded-xl border-[1.5px] border-dashed border-white/35 p-6 text-center text-[14px] leading-relaxed text-white/75">
      Header image slot: public/images/headers/{name}.webp (1600 × 2000 WebP). Shown on previews only.
    </div>
  );
}

export function hasHeaderSlot(name: string): boolean {
  return headerImageExists(name) || isPreviewBuild();
}
