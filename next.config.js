/** @type {import('next').NextConfig} */
const FB_API_KEY = "AIzaSyB98l0paywTCBKfAWxkJFnLpVpUG_e13D4";
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    FIREBASE_AUTH:
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=" +
      FB_API_KEY,
    API_HOCSINH: "http://localhost:8080/api/v1",
  },
  images: {
    domains: [
      "photos.google.com",
      "lh3.googleusercontent.com",
      "images.unsplash.com",
      "res.cloudinary.com",
      "images.pexel.com",
      "images.dmca.com",
      "trannghia91.quickconnect.to",
      "cdn.vectorstock.com",
    ],
  },
};

module.exports = nextConfig;
