import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {protocol: 'http', hostname: 'cdn2.safaraneh.com', pathname: '**'},
      {protocol: 'https', hostname: 'server.belink.ir', pathname: '**'},
    ],
    formats: ['image/avif', 'image/webp'],
  },
  reactStrictMode: true,
  env: {
    PROJECT_SERVER_TYPE: "https://",
    PROJECT_SERVER_IDENTITY:"identity.irangamecenter.com",
    PROJECT_SERVER_PAYMENT: "payline.irangamecenter.com",
    PORT: '',

  }
};

export default nextConfig;