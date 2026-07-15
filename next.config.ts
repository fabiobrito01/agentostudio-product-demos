import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.GITHUB_ACTIONS ? "/agentostudio-product-demos" : "",
  assetPrefix: process.env.GITHUB_ACTIONS ? "/agentostudio-product-demos/" : "",
  images: { unoptimized: true },
  trailingSlash: true,
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;
