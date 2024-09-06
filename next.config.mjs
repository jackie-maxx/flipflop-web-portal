
/** @type {import('next').NextConfig} */
const nextConfig = {
  output:  "export",
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
      "portal.maxx4business.com",
      "jackie-maxx.github.io"
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
