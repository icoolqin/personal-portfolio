'use client';

import { AppCard } from "@/components/app/app-card";
import { use } from 'react';

type Locale = 'zh' | 'en';

const dictionaries = {
  zh: {
    apps: {
      title: "我的应用",
      description: "这里展示了我开发的所有应用，每一个都经过精心设计和开发。"
    }
  },
  en: {
    apps: {
      title: "My Apps",
      description: "Here are all the applications I've developed, each carefully designed and built."
    }
  }
};

const appsData = {
  zh: {
    apps: [
      {
        id: "desktop-switcher",
        slug: "desktop-switcher",
        name: "DesktopSwitcher",
        shortDescription: "虚拟桌面，一键切换",
        fullDescription: "DesktopSwitcher是一个强大的虚拟桌面管理工具",
        category: "桌面工具",
        platform: ["Windows 10", "Windows 11"],
        tags: ["虚拟桌面", "生产力"],
        icon: "/images/desktop_switcher.png",
        banner: "/images/DesktopSwitcher.png",
        screenshots: ["/images/DesktopSwitcher.png"],
        links: { download: "#" },
        version: "1.0.0",
        releaseDate: "2024-01-01",
        lastUpdateDate: "2024-01-01",
        stats: { users: 1000, rating: 4.8 },
        features: ["快速切换桌面"],
        techStack: ["C++"],
        featured: true,
        price: "$2.99"
      },
      {
        id: "onesearch",
        slug: "onesearch",
        name: "OneSearch",
        shortDescription: "书签管理从未如此轻松",
        fullDescription: "OneSearch 是一款强大的浏览器插件",
        category: "浏览器插件",
        platform: ["Chrome"],
        tags: ["书签管理"],
        icon: "/images/oneSearch.webp",
        banner: "/images/oneSearch.png",
        screenshots: ["/images/oneSearch.png"],
        links: { download: "#" },
        version: "2.0.0",
        releaseDate: "2024-03-01",
        lastUpdateDate: "2024-12-01",
        stats: { users: 5000, rating: 4.9 },
        features: ["快速搜索"],
        techStack: ["JavaScript"],
        featured: false,
        price: "免费"
      },
      {
        id: "omniword",
        slug: "omniword",
        name: "OmniWord",
        shortDescription: "划词翻译与 AI 说文解字",
        fullDescription: "网页划词与弹窗查词，AI 词源/词缀/语境讲解，理解更深入。",
        category: "浏览器插件",
        platform: ["Chrome", "Microsoft Edge"],
        tags: ["划词翻译", "AI 翻译"],
        icon: "/images/OmniWord.png",
        banner: "/images/OmniWordPoster.png",
        screenshots: ["/images/OmniWordPoster.png"],
        links: { 
          chrome: "https://chromewebstore.google.com/detail/iljgnmpnjfimmjfielhfecogghncdgjb?utm_source=item-share-cb",
          edge: "https://microsoftedge.microsoft.com/addons/detail/omniword-%E5%88%92%E8%AF%8D%E7%BF%BB%E8%AF%91/lpfaifjlmdbknabibdbglanhfdjnljgo"
        },
        version: "1.0.0",
        releaseDate: "2024-01-01",
        lastUpdateDate: "2024-01-01",
        stats: { users: 2000, rating: 4.8 },
        features: ["划词即译", "AI 深度讲解"],
        techStack: ["TypeScript"],
        featured: false,
        price: "免费"
      },
      {
        id: "ai-garden-party",
        slug: "ai-garden-party",
        name: "AI园游会 - AI作主持人的猜图游戏",
        shortDescription: "AI作主持人的微信猜图小游戏",
        fullDescription: "AI 主持互动，题库丰富，支持好友排行榜，完全免费。",
        category: "微信小程序",
        platform: ["微信小程序"],
        tags: ["AI", "猜图", "互动", "小游戏"],
        icon: "/images/GGame.png",
        banner: "/images/GGamePoster.png",
        screenshots: ["/images/GGamePoster.png"],
        links: {},
        version: "1.0.0",
        releaseDate: "2024-09-01",
        lastUpdateDate: "2024-09-01",
        stats: { users: 0, rating: 0 },
        features: ["AI 主持关卡", "好友排行榜"],
        techStack: ["微信小程序"],
        featured: false,
        price: "免费"
      }
    ]
  },
  en: {
    apps: [
      {
        id: "desktop-switcher",
        slug: "desktop-switcher",
        name: "DesktopSwitcher",
        shortDescription: "Your Virtual Desktops, Just a Click Away",
        fullDescription: "DesktopSwitcher is a powerful virtual desktop management tool",
        category: "Desktop Tools",
        platform: ["Windows 10", "Windows 11"],
        tags: ["Virtual Desktop", "Productivity"],
        icon: "/images/desktop_switcher.png",
        banner: "/images/DesktopSwitcher.png",
        screenshots: ["/images/DesktopSwitcher.png"],
        links: { download: "#" },
        version: "1.0.0",
        releaseDate: "2024-01-01",
        lastUpdateDate: "2024-01-01",
        stats: { users: 1000, rating: 4.8 },
        features: ["Quick desktop switching"],
        techStack: ["C++"],
        featured: true,
        price: "$2.99"
      },
      {
        id: "onesearch",
        slug: "onesearch",
        name: "OneSearch",
        shortDescription: "Bookmark management has never been easier",
        fullDescription: "OneSearch is a powerful browser extension",
        category: "Browser Extension",
        platform: ["Chrome"],
        tags: ["Bookmark Management"],
        icon: "/images/oneSearch.webp",
        banner: "/images/oneSearch.png",
        screenshots: ["/images/oneSearch.png"],
        links: { download: "#" },
        version: "2.0.0",
        releaseDate: "2024-03-01",
        lastUpdateDate: "2024-12-01",
        stats: { users: 5000, rating: 4.9 },
        features: ["Lightning-fast search"],
        techStack: ["JavaScript"],
        featured: false,
        price: "Free"
      },
      {
        id: "omniword",
        slug: "omniword",
        name: "OmniWord",
        shortDescription: "Selection translation with AI word storytelling",
        fullDescription: "Selection translation + popup dictionary with AI etymology/affix/context insights for deeper understanding.",
        category: "Browser Extension",
        platform: ["Chrome", "Microsoft Edge"],
        tags: ["Selection Translation", "AI Translation"],
        icon: "/images/OmniWord.png",
        banner: "/images/OmniWordPoster.png",
        screenshots: ["/images/OmniWordPoster.png"],
        links: { 
          chrome: "https://chromewebstore.google.com/detail/iljgnmpnjfimmjfielhfecogghncdgjb?utm_source=item-share-cb",
          edge: "https://microsoftedge.microsoft.com/addons/detail/omniword-%E5%88%92%E8%AF%8D%E7%BF%BB%E8%AF%91/lpfaifjlmdbknabibdbglanhfdjnljgo"
        },
        version: "1.0.0",
        releaseDate: "2024-01-01",
        lastUpdateDate: "2024-01-01",
        stats: { users: 2000, rating: 4.8 },
        features: ["Instant selection translation", "AI deep dives"],
        techStack: ["TypeScript"],
        featured: false,
        price: "Free"
      },
      {
        id: "ai-garden-party",
        slug: "ai-garden-party",
        name: "AI Garden Party - AI-hosted Guessing Game",
        shortDescription: "A WeChat mini-game where AI hosts the guessing",
        fullDescription: "AI hosts interactive levels with rich topics. Play with friends and leaderboards. Free to play.",
        category: "WeChat Mini Program",
        platform: ["WeChat Mini Program"],
        tags: ["AI", "Guessing", "Interactive", "Mini Game"],
        icon: "/images/GGame.png",
        banner: "/images/GGamePoster.png",
        screenshots: ["/images/GGamePoster.png"],
        links: {},
        version: "1.0.0",
        releaseDate: "2024-09-01",
        lastUpdateDate: "2024-09-01",
        stats: { users: 0, rating: 0 },
        features: ["AI-hosted levels", "Leaderboards"],
        techStack: ["WeChat Mini Program"],
        featured: false,
        price: "Free"
      }
    ]
  }
};

export default function AppsPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const resolvedParams = use(params);
  const dict = dictionaries[resolvedParams.lang] || dictionaries.en;
  const apps = appsData[resolvedParams.lang]?.apps || appsData.en.apps;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{dict.apps.title}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {dict.apps.description}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}
