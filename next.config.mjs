/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // https://emojiisland.com/cdn/shop/products/Waving_Hand_Sign_Emoji_Icon_ios10_grande.png
        hostname: "emojiisland.com",
        port: '',
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;
