import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dog.ceo",
        port: "",
        pathname: "/api/breeds/**/images/randoms",
      },
    ],
  },
};

export default nextConfig;