import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  env: {
    PROJECT_SERVER_TYPE: "https://",
    PROJECT_SERVER_IDENTITY:"identity.irangamecenter.com",
    PORT: '',

  }
};

export default nextConfig;
