import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["http://10.255.103.16:3000"],

    images: {
    unoptimized: true,
  },
};

export default nextConfig;
