import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
      },
      {
        protocol: "https",
        hostname: "www.istockphoto.com",
      },
      {
        protocol: "https",
        hostname: "gettyimages.pt",
      },
      {
        protocol: "https",
        hostname: "dsah.sa",
      },
      {
        protocol: "https",
        hostname: "kfsarc.com",
      },
      {
        protocol: "https",
        hostname: "ngha.med.sa",
      },
    ],
  },
};

export default nextConfig;
