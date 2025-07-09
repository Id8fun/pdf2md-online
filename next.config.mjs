/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // 优化开发环境
  webpack: (config, { dev }) => {
    if (dev) {
      // 减少热重载的频率
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      }
    }
    return config
  },
  // 禁用一些不必要的功能
  poweredByHeader: false,
  reactStrictMode: true,
}

export default nextConfig
