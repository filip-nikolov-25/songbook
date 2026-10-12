import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  async redirects() {
    return [{ source: "/songs", destination: "/allsongs", permanent: false }];
  },
};

export default nextConfig;
