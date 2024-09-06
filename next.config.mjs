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
  // distDir: "clients/share/build",
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
  crossOrigin: "anonymous",
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },

  env: {
    FILE_NAME: process.env.NEXT_PUBLIC_FILE_NAME,
    MAIN_URL: process.env.NEXT_PUBLIC_MAIN_URL,
    ENVIRONMENT: process.env.NEXT_PUBLIC_ENVIRONMENT,
  },

  reactStrictMode: true,
};

export default nextConfig;
