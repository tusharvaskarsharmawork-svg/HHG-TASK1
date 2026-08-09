import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // @ts-ignore - Temporary property to allow network access
  allowedDevOrigins: ['192.168.0.106'],
};

export default nextConfig;
