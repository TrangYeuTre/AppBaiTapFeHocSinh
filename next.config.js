/** @type {import('next').NextConfig} */
const FB_API_KEY = "AIzaSyB98l0paywTCBKfAWxkJFnLpVpUG_e13D4";
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
