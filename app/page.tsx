import Image from "next/image";
import { FeaturedApp } from "@/components/app/featured-app";
import { AppCard } from "@/components/app/app-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import appsData from "@/data/apps/index.json";
import type { App } from "@/types";

export default function Home() {
  const apps = appsData.apps as App[];
  const featuredApp = apps.find(app => app.featured);
  const otherApps = apps.filter(app => !app.featured).slice(0, 3);

  return (
    <div className="space-y-16">
      {/* 英雄区域 - 精选应用 */}
      {featuredApp && (
        <FeaturedApp app={featuredApp} />
      )}
      
      {/* 其他应用展示 */}
      {otherApps.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">更多应用</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              探索我开发的其他应用，每一个都致力于提升你的数字体验。
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {otherApps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
          
          <div className="text-center">
            <Button asChild size="lg">
              <Link href="/apps">查看所有应用</Link>
            </Button>
          </div>
        </section>
      )}
      
      {/* 关于我的简介 */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">关于我</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            我是一名独立开发者，专注于创建实用、美观的应用程序。
            我相信技术应该让生活更简单、更高效。每一个应用都是我对完美用户体验的追求。
          </p>
          <Button asChild variant="outline" size="lg">
            <Link href="/about">了解更多</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}