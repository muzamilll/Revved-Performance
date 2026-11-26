import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Real photography served from Unsplash's CDN (data/photos.ts)
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/**" }],
  },
  async redirects() {
    return [
      // Offers live on one page and remaps on /performance; old links land on the right page.
      // Temporary (307) while the redesign is under review. AT LAUNCH: set every permanent: true (308).
      { source: "/offers/:slug", destination: "/offers", permanent: false },
      { source: "/for-garages", destination: "/business", permanent: false },
      // The old services pages: each service now has one home
      { source: "/services", destination: "/performance", permanent: false },
      { source: "/services/pre-purchase-inspection", destination: "/diagnostics/pre-purchase-inspection", permanent: false },
      { source: "/services/pre-mot-check", destination: "/diagnostics/pre-mot-check", permanent: false },
      { source: "/services/vehicle-diagnostics", destination: "/diagnostics/vehicle-diagnostics", permanent: false },
      { source: "/services/:slug", destination: "/performance/:slug", permanent: false },
    ];
  },
};

export default nextConfig;
