/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        /* https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg */
        hostname: "letsenhance.io",
        port: '',
        pathname: "/posts/**"
      }
    ]
  }
};

export default nextConfig;
