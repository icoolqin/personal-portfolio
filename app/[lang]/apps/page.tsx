'use client';

import { AppCard } from "@/components/app/app-card";

type Locale = 'zh' | 'en';

interface App {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  platform: string[];
  tags: string[];
  icon: string;
  banner: string;
  screenshots: string[];
  links: {
    download?: string;
    demo?: string;
    chrome?: string;
    edge?: string;
  };
  version: string;
  releaseDate: string;
  lastUpdateDate: string;
  stats: {
    users: number;
    rating: number;
  };
  features: string[];
  techStack: string[];
  featured: boolean;
  price: string;
}

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
      }
    ]
  }
};

export default function AppsPage({ params }: { params: { lang: Locale } }) {
  const dict = dictionaries[params.lang] || dictionaries.zh;
  const apps = appsData[params.lang]?.apps || appsData.zh.apps;

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