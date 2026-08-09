import type { NextConfig } from "next";

// GitHub Pages is static hosting: no server runtime, no image optimizer.
// `NEXT_PUBLIC_BASE_PATH` lets the same build target either a user site
// (Dhruv-Limbachiya.github.io -> "") or a project repo (-> "/repo-name").
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  productionBrowserSourceMaps: false,
};

export default nextConfig;
