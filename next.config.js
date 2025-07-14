/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  // 静态导出配置
  output: 'export',
  trailingSlash: true,
  
  // GitHub Pages 配置
  basePath: process.env.NODE_ENV === 'production' ? '/hello_solana' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/hello_solana/' : '',
  
  // 图片优化需要关闭（静态导出不支持）
  images: {
    unoptimized: true,
  },
  
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
};

module.exports = nextConfig; 