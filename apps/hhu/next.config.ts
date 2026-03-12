import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: [
    "@meta-geniusz/ui",
    "@meta-geniusz/types",
    "@meta-geniusz/utils",
    "@meta-geniusz/config",
    "@meta-geniusz/auth",
    "@meta-geniusz/sdk",
  ],
  serverExternalPackages: ["@prisma/client", "sharp"],
};

export default nextConfig;
