import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  agentRules: false,
  async redirects() {
    return [{ source: "/songs", destination: "/allsongs", permanent: false }];
  },
};

export default nextConfig;
