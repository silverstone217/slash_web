import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  env: {
    // GOOGLE API AUTH KEYS
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    // next-auth and db api keys
    SECRET_KEY: process.env.SECRET_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },

      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "3eqaz12yan4rgf7v.public.blob.vercel-storage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
