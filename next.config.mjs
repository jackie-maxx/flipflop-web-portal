import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.resolve(process.cwd(), process.env.ENV_FILE || ".env.development"),
});

const isProd = process.env.NEXT_PUBLIC_ENVIRONMENT === "development";

console.log("FILE_NAME:", process.env.NEXT_PUBLIC_FILE_NAME);
console.log("MAIN_URL:", process.env.NEXT_PUBLIC_MAIN_URL);
console.log("ENVIRONMENT:", process.env.NEXT_PUBLIC_ENVIRONMENT);

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: isProd ? null : "export",
  basePath: isProd ? "/flipflop-web-portal" : "",
  assetPrefix: isProd ? "/flipflop-web-portal/" : "",
  distDir: "clients/share/build",
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "192.168.100.105",
      },
    ],

    domains: [
      "192.168.100.105",
      "media.istockphoto.com",
      "flipflop-api.maxx4business.com",
    ],
  },

  env: {
    FILE_NAME: process.env.NEXT_PUBLIC_FILE_NAME,
    MAIN_URL: process.env.NEXT_PUBLIC_MAIN_URL,
    ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
  },

  reactStrictMode: true,
};

export default nextConfig;
