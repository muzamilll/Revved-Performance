// Real photography from Unsplash (free licence: unsplash.com/license), served from Unsplash's
// image CDN. Chosen 27 Nov: UK-relevant cars, hands only or no people, nothing staged.
// Performance keeps its own artwork until Rayyan's photo of the Alientech tool on a car arrives.

export type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  page: string; // the photo's Unsplash page (for credit and swapping)
};

const u = (id: string, params = "") => `https://images.unsplash.com/${id}?auto=format&q=75${params}`;

export const photos = {
  // VW Passat on a UK terraced street at dusk. Cropped from the top so the number plate
  // (a real registration) is cut off; the bottom edge fades into the page.
  street: {
    src: u("photo-1604775567353-be0ff5c0fedc", "&fit=crop&crop=top&w=1600&h=1896"),
    width: 1600,
    height: 1896,
    alt: "A dark estate car on a British street of terraced houses at dusk",
    page: "https://unsplash.com/photos/jgBCqs3hF3w",
  },
  batteries: {
    src: u("photo-1597766321604-9de3ff9e93e2", "&w=1600"),
    width: 1600,
    height: 1067,
    alt: "Hands holding jump-lead clamps over an open engine bay",
    page: "https://unsplash.com/photos/Pnhzg9cKsS4",
  },
  servicing: {
    src: u("photo-1795575634279-76c17817e96d", "&w=1600"),
    width: 1600,
    height: 1067,
    alt: "A gloved hand checking the oil dipstick in an engine bay",
    page: "https://unsplash.com/photos/xqDaPKynMJs",
  },
  brakes: {
    src: u("photo-1760317890322-364a810cd4da", "&w=1600"),
    width: 1600,
    height: 1067,
    alt: "A drilled brake disc and caliper on a car's front hub",
    page: "https://unsplash.com/photos/EpT-ZetoKm8",
  },
  diagnostics: {
    src: u("photo-1606166245039-ffeba59d83a4", "&w=1600"),
    width: 1600,
    height: 1172,
    alt: "An engine warning light glowing on a car's dashboard",
    page: "https://unsplash.com/photos/TnEe6BdBC2M",
  },
} satisfies Record<string, Photo>;

export type CarePhotoKey = "batteries" | "servicing" | "brakes" | "diagnostics";
