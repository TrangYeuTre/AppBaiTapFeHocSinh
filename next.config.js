/** @type {import('next').NextConfig} */
const FB_API_KEY = "AIzaSyB98l0paywTCBKfAWxkJFnLpVpUG_e13D4";
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    // API_HOCSINH: "http://localhost:8080/api/v1",
    // https://ec2-54-251-92-120.ap-southeast-1.compute.amazonaws.com/nghia-test
    API_HOCSINH:
      "https://ec2-54-251-92-120.ap-southeast-1.compute.amazonaws.com/api/v1",
  },
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
