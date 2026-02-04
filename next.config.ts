import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "medeasy.health",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.example.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "example.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/auth/:path*",
  //       destination: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/:path*`,
  //     },
  //   ];
  // },
};

export default nextConfig;
