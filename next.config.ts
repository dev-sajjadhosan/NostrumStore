import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fullkit.moxcreative.com",
      },
    ],
  },
};

export default nextConfig;
