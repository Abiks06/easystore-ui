import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://cdn.dummyjson.com/product-images/**")],
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [{ source: "/login", destination: "/account", permanent: false }];
  },
};

export default nextConfig;
