import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// 支持的语言列表
export const i18n = {
  defaultLocale: 'zh',
  locales: ['zh', 'en'],
} as const;

export type Locale = (typeof i18n)['locales'][number];
