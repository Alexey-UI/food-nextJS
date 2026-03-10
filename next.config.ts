import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(process.cwd(), "src/styles")],

    additionalData: `
      @use "abstracts" as *;
    `,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "front-school.minio.ktsdev.ru",
      },
    ],
  },
};

export default nextConfig;