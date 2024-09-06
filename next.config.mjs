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
  output: isProd ? undefined : "export",
  basePath: "",
  assetPrefix: "",
  distDir: "clients/share/build",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
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
