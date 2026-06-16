import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

// Pin the workspace root so Turbopack ignores stray lockfiles higher up the tree.
const root = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Static export so it deploys cleanly to Cloudflare Pages (output dir: out/)
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  turbopack: { root },
};

export default nextConfig;
