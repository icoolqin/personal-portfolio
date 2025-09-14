import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 输出配置 - 静态导出
  output: 'export',
  trailingSlash: true,

  // 图片优化配置 - 静态导出需要禁用优化
  images: {
    unoptimized: true,
  },

  // 禁用一些可能导致问题的功能
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-slot'],
  },
};

export default nextConfig;

// 支持的语言列表
export const i18n = {
  defaultLocale: 'en',
  locales: ['zh', 'en'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
