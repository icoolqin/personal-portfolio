"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Star,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play
} from "lucide-react";
import type { App } from "@/types";
import { usePathname } from 'next/navigation';

type Locale = 'zh' | 'en';

const translations = {
  zh: {
    learnMore: '了解更多',
    getApp: '立即获取',
    getPlugin: '获取插件',
    users: '用户',
    rating: '评分',
    featured: '精选应用',
    free: '完全免费'
  },
  en: {
    learnMore: 'Learn More',
    getApp: 'Get App',
    getPlugin: 'Get Plugin',
    users: 'users',
    rating: 'rating',
    featured: 'Featured App',
    free: 'Completely Free'
  }
};

interface FeaturedCarouselProps {
  apps: App[];
  autoPlayInterval?: number; // 自动播放间隔（毫秒）
}

export function FeaturedCarousel({ 
  apps, 
  autoPlayInterval = 5000 
}: FeaturedCarouselProps) {
  const pathname = usePathname();
  const lang = (pathname.split('/')[1] as Locale) || 'zh';
  const t = translations[lang] || translations.zh;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // 切换到下一个应用
  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % apps.length);
  }, [apps.length]);

  // 切换到上一个应用
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? apps.length - 1 : prevIndex - 1
    );
  }, [apps.length]);

  // 直接跳转到指定索引
  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // 自动播放逻辑
  useEffect(() => {
    if (!isAutoPlaying || isPaused || apps.length <= 1) return;

    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isPaused, goToNext, autoPlayInterval, apps.length]);

  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious]);

  if (apps.length === 0) return null;

  const currentApp = apps[currentIndex];

  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-blue-950 dark:to-indigo-900"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-6 py-12 lg:py-16">
        {/* 轮播指示器和控制按钮 */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          {/* 自动播放控制 */}
          {apps.length > 1 && (
            <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
            >
              {isAutoPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
          )}
          
          {/* 应用指示器 */}
          <div className="flex gap-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-3 py-2">
            {apps.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? "bg-blue-600 dark:bg-blue-400 w-6" 
                    : "bg-gray-400 dark:bg-gray-600 hover:bg-gray-500"
                }`}
                aria-label={`切换到第 ${index + 1} 个应用`}
              />
            ))}
          </div>
        </div>

        {/* 主要内容区域 */}
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* 左侧内容 */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src={currentApp.icon}
                  alt={`${currentApp.name} icon`}
                  width={60}
                  height={60}
                  className="shadow-lg rounded-lg"
                />
                {/* 应用编号标签 */}
                <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {currentIndex + 1}
                </div>
              </div>
              <div>
                <Badge className="mb-2 animate-pulse">{t.featured}</Badge>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                  {currentApp.name}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {currentApp.shortDescription}
                </p>
              </div>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed line-clamp-3">
              {currentApp.fullDescription}
            </p>
            
            {/* 平台和类别标签 */}
            <div className="flex flex-wrap gap-2">
            <Badge 
                variant="outline" 
                className="bg-white/70 dark:bg-gray-800/70 border-white/50 dark:border-gray-600 text-gray-800 dark:text-gray-200"
            >
                {currentApp.category}
            </Badge>
            {currentApp.platform.map((platform) => (
                <Badge 
                key={platform} 
                variant="secondary"
                className="bg-blue-100/80 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200"
                >
                {platform}
                </Badge>
            ))}
            </div>
            
            {/* 特性标签 */}
            <div className="flex flex-wrap gap-2">
            {currentApp.features.slice(0, 3).map((feature) => (
                <Badge 
                key={feature} 
                variant="outline"
                className="bg-white/80 dark:bg-gray-800/80 border-white/50 dark:border-gray-600 text-gray-800 dark:text-gray-200"
                >
                ✨ {feature}
                </Badge>
            ))}
            </div>
            
            {/* 统计信息 */}
            {currentApp.stats && (
              <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
                {currentApp.stats.users && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span>{currentApp.stats.users.toLocaleString()} {t.users}</span>
                  </div>
                )}
                {currentApp.stats.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{currentApp.stats.rating}/5 {t.rating}</span>
                  </div>
                )}
              </div>
            )}
            
            {/* 操作按钮 */}
            <div className="flex gap-3">
            <Button asChild size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
                <Link href={`/${lang}/apps/${currentApp.slug}`}>
                {t.learnMore}
                </Link>
            </Button>
            
            {/* 根据不同应用显示不同的下载按钮 */}
            {currentApp.slug === 'desktop-switcher' && currentApp.links.download && (
                <Button asChild variant="outline" size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                <a 
                    href={currentApp.links.download} 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    <Download className="w-4 h-4 mr-2" />
                    {t.getApp}
                </a>
                </Button>
            )}
            
            {(currentApp.slug === 'onesearch' || currentApp.slug === 'omniword') && (
                <Button asChild variant="outline" size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                <Link href={`/${lang}/apps/${currentApp.slug}`}>
                    <Download className="w-4 h-4 mr-2" />
                    {t.getPlugin}
                </Link>
                </Button>
            )}
            </div>
            
            {/* 价格显示 */}
            {currentApp.price && (
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {currentApp.price}
                </span>
                {currentApp.price === "免费" && (
                  <Badge variant="outline" className="bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                    {t.free}
                  </Badge>
                )}
              </div>
            )}
          </div>
          
          {/* 右侧图片 */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] overflow-hidden shadow-2xl rounded-lg">
              <Image
                src={currentApp.banner || currentApp.screenshots[0] || currentApp.icon}
                alt={currentApp.name}
                fill
                className="object-cover"
                priority
              />
              
              {/* 图片上的渐变遮罩 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
            
            {/* 装饰性元素 */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 dark:bg-blue-800 rounded-full opacity-50 blur-xl animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-50 blur-xl animate-pulse delay-1000"></div>
          </div>
        </div>

        {/* 左右切换按钮（仅在有多个应用时显示） */}
        {apps.length > 1 && (
          <>
            <button
                onClick={goToPrevious}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full p-3 sm:p-2 shadow-xl hover:shadow-2xl transition-all hover:scale-110 text-gray-800 dark:text-gray-100 hover:bg-white dark:hover:bg-gray-700 border border-gray-200/50 dark:border-gray-600/50"
                aria-label="上一个应用"
                >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
                onClick={goToNext}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full p-3 sm:p-2 shadow-xl hover:shadow-2xl transition-all hover:scale-110 text-gray-800 dark:text-gray-100 hover:bg-white dark:hover:bg-gray-700 border border-gray-200/50 dark:border-gray-600/50"
                aria-label="下一个应用"
                >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </>
        )}
      </div>

      {/* 进度条 */}
      {apps.length > 1 && isAutoPlaying && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700">
          <div 
            className="h-full bg-blue-600 dark:bg-blue-400 transition-all duration-300"
            style={{
              width: `${((currentIndex + 1) / apps.length) * 100}%`,
              animation: isPaused ? 'none' : `progress ${autoPlayInterval}ms linear`
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes progress {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </section>
  );
}
