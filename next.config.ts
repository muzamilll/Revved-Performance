import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Offers now live on one page; old single-offer links land on it.
      // Temporary (307) while the redesign is under review, so it can still be changed.
      { source: "/offers/:slug", destination: "/offers", permanent: false },
    ];
  },
};

export default nextConfig;
