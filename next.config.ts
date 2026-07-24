import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

// Pin the workspace root so Turbopack ignores stray lockfiles higher up the tree.
const root = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Static export for the GitHub Pages deployment workflow (output dir: out/).
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "ghchart.rshah.org" },
      { protocol: "https", hostname: "leetcard.jacoblin.cool" },
    ],
  },
  trailingSlash: true,
  turbopack: { root },
};

export default nextConfig;
