import type { NextConfig } from "next";

// Fully static export: no functions, no ISR, no middleware, no image optimisation.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
