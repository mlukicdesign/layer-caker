import type { NextConfig } from "next";
import { fetchRedirects } from "@/sanity/lib/fetchRedirects";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    const redirects = await fetchRedirects();
    return redirects.filter(
      (redirect) =>
        redirect.source !== null &&
        redirect.destination !== null &&
        redirect.permanent !== null
    ) as Array<{
      source: string;
      destination: string;
      permanent: boolean;
    }>;
  },
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

export default nextConfig;
