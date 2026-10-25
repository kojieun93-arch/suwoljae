import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the Next.js badge away from bottom dialogue/buttons during mobile testing
  devIndicators: {
    position: "top-left",
  },
};

export default nextConfig;
