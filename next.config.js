/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    // API_HOCSINH:
    //   "https://ec2-54-255-215-14.ap-southeast-1.compute.amazonaws.com/api/v1",
    // API_HOCSINH: "http://localhost:8080/api/v1",
    API_HOCSINH: "https://appbaitapbehocsinh.azurewebsites.net/api/v1",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;
