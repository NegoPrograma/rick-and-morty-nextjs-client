import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https", 
        hostname: "rickandmortyapi.com",
        pathname: "/**", 
      },
    ],
  },
};

export default nextConfig;
