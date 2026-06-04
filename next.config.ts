import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.chime.me" },
      { protocol: "https", hostname: "img.chime.me" },
      { protocol: "https", hostname: "static.chimeroi.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
