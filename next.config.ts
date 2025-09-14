import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 优化构建输出，避免生成过大的文件
  experimental: {
    // 禁用一些可能导致大文件的功能
    optimizePackageImports: ['lucide-react', '@radix-ui/react-slot'],
  },

  // 配置 webpack 以优化构建
  webpack: (config, { isServer }) => {
    // 优化服务端构建，减少文件大小
    if (isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks?.cacheGroups,
            default: {
              minChunks: 1,
              priority: -20,
              reuseExistingChunk: true,
              maxSize: 20 * 1024 * 1024, // 限制为 20MB
            },
          },
        },
      };
    }

    return config;
  },

  // 输出配置 - 静态导出以避免大文件
  output: 'export',
  trailingSlash: true,

  // 图片优化配置 - 静态导出需要禁用优化
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

// 支持的语言列表
export const i18n = {
  defaultLocale: 'en',
  locales: ['zh', 'en'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
