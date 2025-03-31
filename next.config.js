/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  experimental: {
    // 添加实验性功能配置
  },
  // 添加服务器配置，指定使用IPv4
  webpack: (config, { isServer }) => {
    return config;
  },
};

module.exports = nextConfig; 