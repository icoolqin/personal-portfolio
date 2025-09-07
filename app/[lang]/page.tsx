'use client';

import Image from "next/image";
import { FeaturedCarousel } from "@/components/app/featured-carousel";
import { AppCard } from "@/components/app/app-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from 'react';

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
    home: {
      moreApps: "更多应用",
      moreAppsDescription: "探索我开发的其他应用，每一个都致力于提升你的数字体验。",
      aboutMe: "关于我",
      aboutMeDescription: "我是一名独立开发者，专注于创建实用、美观的应用程序。我相信技术应该让生活更简单、更高效。每一个应用都是我对完美用户体验的追求。"
    },
    common: {
      viewAll: "查看所有应用",
      learnMore: "了解更多"
    }
  },
  en: {
    home: {
      moreApps: "More Apps",
      moreAppsDescription: "Explore other applications I've developed, each dedicated to enhancing your digital experience.",
      aboutMe: "About Me",
      aboutMeDescription: "I am an independent developer focused on creating practical and beautiful applications. I believe technology should make life simpler and more efficient. Every application is my pursuit of perfect user experience."
    },
    common: {
      viewAll: "View All Apps",
      learnMore: "Learn More"
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
        featured: true,
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
        featured: true,
        price: "Free"
      }
    ]
  }
};

export default function Home({ params }: { params: { lang: Locale } }) {
  const dict = dictionaries[params.lang] || dictionaries.zh;
  const apps = appsData[params.lang]?.apps || appsData.zh.apps;
  const featuredApps = apps.filter(app => app.featured);
  const otherApps = apps.filter(app => !app.featured).slice(0, 3);

  return (
    <div className="space-y-16">
      {/* 英雄区域 - 精选应用轮播 */}
      {featuredApps.length > 0 && (
        <FeaturedCarousel apps={featuredApps} autoPlayInterval={8000} />
      )}
      
      {/* 其他应用展示 */}
      {otherApps.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{dict.home.moreApps}</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {dict.home.moreAppsDescription}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {otherApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild size="lg">
              <Link href={`/${params.lang}/apps`}>{dict.common.viewAll}</Link>
            </Button>
          </div>
        </section>
      )}
      
      {/* 关于我的简介 */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{dict.home.aboutMe}</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            {dict.home.aboutMeDescription}
          </p>
          <Button asChild variant="outline" size="lg">
            <Link href={`/${params.lang}/about`}>{dict.common.learnMore}</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}