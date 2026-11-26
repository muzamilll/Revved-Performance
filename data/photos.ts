// Real photography from Unsplash (free licence: unsplash.com/license), served straight from
// Unsplash's image CDN at the size each screen needs (components/ui/Photo.tsx), compressed once.
// Chosen 27 Nov: UK-relevant cars, hands only or no people, nothing staged.
// Each photo is the home tile and the header of its category page.
// Performance keeps its own header until Rayyan's photo of the Alientech tool on a car arrives.

export type Photo = {
  id?: string;       // Unsplash image id (images.unsplash.com/<id>)
  src?: string;      // or a local file in /public
  ratio: number;     // width / height of the original
  alt: string;
  focus?: string;    // object-position when cropped, e.g. "60% 50%"
  page: string;      // the photo's Unsplash page (credit, and for swapping later)
};

export const photos = {
  batteries: {
    id: "photo-1597766321604-9de3ff9e93e2",
    ratio: 3 / 2,
    alt: "Hands holding jump-lead clamps over an open engine bay",
    focus: "60% 50%",
    page: "https://unsplash.com/photos/Pnhzg9cKsS4",
  },
  servicing: {
    id: "photo-1795575634279-76c17817e96d",
    ratio: 3 / 2,
    alt: "A gloved hand checking the oil dipstick in an engine bay",
    focus: "62% 50%",
    page: "https://unsplash.com/photos/xqDaPKynMJs",
  },
  brakes: {
    id: "photo-1760317890322-364a810cd4da",
    ratio: 3 / 2,
    alt: "A drilled brake disc and caliper on a car's front hub",
    focus: "24% 50%",
    page: "https://unsplash.com/photos/EpT-ZetoKm8",
  },
  diagnostics: {
    id: "photo-1606166245039-ffeba59d83a4",
    ratio: 1600 / 1172,
    alt: "An engine warning light glowing on a car's dashboard",
    focus: "28% 50%",
    page: "https://unsplash.com/photos/TnEe6BdBC2M",
  },
  // Until Rayyan's photo of the Alientech tool on a car: the R8 from the original site
  performance: {
    src: "/images/hero-r8.webp",
    ratio: 2500 / 1669,
    alt: "A grey Audi R8 with a Revved number plate on a road at sunset",
    focus: "42% 60%",
    page: "",
  },
} satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
export type CarePhotoKey = Exclude<PhotoKey, "performance">;

export function getPhoto(name: string): Photo | undefined {
  return (photos as Record<string, Photo>)[name];
}

export function unsplashUrl(id: string, width: number, quality = 80) {
  return `https://images.unsplash.com/${id}?auto=format&fit=max&w=${width}&q=${quality}`;
}
