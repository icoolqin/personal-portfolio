This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 项目PRD

个人作品集网站 - 项目架构PRD
一、项目概述与目标
核心目标
构建一个高性能、SEO友好、易扩展的个人作品展示网站，集中展示各类APP作品，建立个人品牌，并通过数据分析优化推广效果。
技术选型理由

框架: Next.js 14 (App Router)

原因：原生支持SSG/ISR，SEO优化极佳，与Cloudflare Pages完美兼容


样式: Tailwind CSS + shadcn/ui

原因：快速开发、一致性设计、组件库成熟


数据管理: 本地JSON/MDX文件

原因：无需数据库，部署简单，内容版本控制方便


分析: Cloudflare Web Analytics + Google Analytics 4

原因：免费、隐私友好、数据详尽



二、项目架构设计
2.1 目录结构
personal-portfolio/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # 全局布局（导航、页脚、分析脚本）
│   ├── page.tsx                 # 首页
│   ├── apps/                    # APP展示模块
│   │   ├── page.tsx            # APP列表页
│   │   └── [slug]/             # 动态路由-APP详情
│   │       └── page.tsx
│   ├── blog/                    # 博客模块（预留）
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── about/                   # 关于页面
│   │   └── page.tsx
│   └── api/                     # API路由（如需要）
│       └── track/               # 自定义事件追踪
├── components/                   # 组件库
│   ├── ui/                     # 基础UI组件（shadcn）
│   ├── layout/                 # 布局组件
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Navigation.tsx
│   ├── app/                    # APP相关组件
│   │   ├── AppCard.tsx        # APP卡片
│   │   ├── AppGrid.tsx        # APP网格布局
│   │   └── AppDetail.tsx      # APP详情组件
│   ├── common/                 # 通用组件
│   │   ├── SEO.tsx            # SEO元数据
│   │   ├── Analytics.tsx      # 分析组件
│   │   └── SocialLinks.tsx    # 社交链接
│   └── mdx/                    # MDX相关组件
├── lib/                         # 工具函数
│   ├── utils.ts                # 通用工具
│   ├── analytics.ts            # 分析相关
│   └── metadata.ts             # 元数据生成
├── data/                        # 数据文件
│   ├── apps/                   # APP数据
│   │   ├── index.json         # APP列表索引
│   │   └── [app-name].mdx     # 各APP详情（MDX格式）
│   ├── profile.json            # 个人信息
│   └── social.json             # 社交账号
├── public/                      # 静态资源
│   ├── images/
│   │   ├── apps/              # APP截图/图标
│   │   └── profile/           # 个人照片等
│   └── icons/                  # 网站图标
├── styles/                      # 全局样式
│   └── globals.css
├── config/                      # 配置文件
│   ├── site.ts                 # 网站配置
│   └── seo.ts                  # SEO配置
└── types/                       # TypeScript类型定义
    └── index.ts
2.2 核心数据结构
typescript// types/index.ts
export interface App {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: 'wechat-miniapp' | 'chrome-extension' | 'windows-app' | 'web-app';
  icon: string;
  screenshots: string[];
  features: string[];
  downloadUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  releaseDate: string;
  version: string;
  tags: string[];
  featured: boolean;
  stats?: {
    users?: number;
    rating?: number;
    downloads?: number;
  };
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  email: string;
  location: string;
  skills: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  username: string;
}
三、关键功能实现策略
3.1 SEO优化策略

静态生成(SSG): 所有页面采用静态生成，确保爬虫可完整索引
元数据优化:

动态生成title、description、OG图片
结构化数据(JSON-LD)：Person、SoftwareApplication


Sitemap生成: 自动生成sitemap.xml
性能优化:

图片使用Next.js Image组件，自动优化
字体子集化，减少加载时间



3.2 流量统计方案
typescript// lib/analytics.ts
export const trackEvent = (eventName: string, parameters: Record<string, any>) => {
  // Cloudflare Web Analytics
  if (window.zaraz) {
    window.zaraz.track(eventName, parameters);
  }
  
  // Google Analytics 4
  if (window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// 使用UTM参数追踪来源
export const getTrafficSource = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get('utm_source'),     // 如: wechat-app-1
    medium: params.get('utm_medium'),     // 如: app-link
    campaign: params.get('utm_campaign'), // 如: cross-promotion
  };
};
3.3 路由设计
/                     # 首页 - APP概览 + 个人简介
/apps                 # 所有APP列表（分类筛选）
/apps/[slug]          # APP详情页
/about                # 详细个人介绍
/blog                 # 博客列表（预留）
/blog/[slug]          # 博客文章详情（预留）
四、部署配置
4.1 Cloudflare Pages配置
yaml# .cloudflare/config.yaml
build:
  command: npm run build
  output: out
  
environment_variables:
  - NODE_VERSION: 18
  
headers:
  /*:
    Cache-Control: public, max-age=3600
  /_next/static/*:
    Cache-Control: public, max-age=31536000, immutable
4.2 环境变量
env# .env.production
NEXT_PUBLIC_SITE_URL=https://yourdomain.pages.dev
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CF_BEACON_TOKEN=xxxxx
五、开发规范与最佳实践
5.1 代码规范

使用TypeScript严格模式
ESLint + Prettier自动格式化
组件采用函数式组件 + Hooks
文件命名：组件用PascalCase，其他用kebab-case

5.2 性能优化

路由预加载：使用next/link的prefetch
图片懒加载：Next.js Image自动处理
代码分割：动态导入大型组件
缓存策略：静态资源长期缓存

5.3 扩展性设计

内容管理: MDX格式便于富文本编辑
组件化: 高度复用的组件设计
数据驱动: 通过JSON配置新增APP/文章
模块化: 各功能模块独立，易于新增

六、项目初始化步骤
bash# 1. 创建项目
npx create-next-app@latest personal-portfolio --typescript --tailwind --app

# 2. 安装依赖
npm install @next/mdx @mdx-js/loader @mdx-js/react
npm install lucide-react clsx tailwind-merge
npm install @radix-ui/react-slot class-variance-authority

# 3. 配置shadcn/ui
npx shadcn-ui@latest init

# 4. 安装分析工具
npm install @cloudflare/web-analytics

# 5. 配置Next.js
# next.config.js - 添加MDX支持、图片域名等
七、后续开发指引
项目初始化完成后，具体内容添加位置：

添加新APP: 在 /data/apps/ 创建MDX文件，更新index.json
修改个人信息: 编辑 /data/profile.json
添加社交账号: 编辑 /data/social.json
写博客文章: 在 /data/blog/ 添加MDX文件
自定义组件: 在 /components/ 对应目录添加