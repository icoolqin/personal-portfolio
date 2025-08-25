import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, ExternalLink, Star } from "lucide-react";
import type { App } from "@/types";

interface FeaturedAppProps {
  app: App;
}

export function FeaturedApp({ app }: FeaturedAppProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-900">
      <div className="container mx-auto px-6 py-12 lg:py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* 左侧内容 */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Image
                src={app.icon}
                alt={`${app.name} icon`}
                width={60}
                height={60}
                className="shadow-lg"
              />
              <div>
                <Badge className="mb-2">精选应用</Badge>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white">
                  {app.name}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  {app.shortDescription}
                </p>
              </div>
            </div>
            
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              {app.fullDescription.split('\n')[0]}
            </p>
            
            {/* 特性标签 */}
            <div className="flex flex-wrap gap-2">
              {app.features.slice(0, 4).map((feature) => (
                <Badge key={feature} variant="secondary">
                  {feature}
                </Badge>
              ))}
            </div>
            
            {/* 统计信息 */}
            {app.stats && (
              <div className="flex gap-6 text-sm text-gray-600 dark:text-gray-400">
                {app.stats.users && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    <span>{app.stats.users.toLocaleString()} 用户</span>
                  </div>
                )}
                {app.stats.rating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{app.stats.rating}/5</span>
                  </div>
                )}
              </div>
            )}
            
            {/* 操作按钮 */}
            <div className="flex gap-3">
              <Button asChild size="lg">
                <Link href={`/apps/${app.slug}`}>
                  了解更多
                </Link>
              </Button>
              
              {app.links.download && (
                <Button asChild variant="outline" size="lg">
                  <a href={app.links.download} target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4 mr-2" />
                    下载应用
                  </a>
                </Button>
              )}
              

            </div>
            
            {app.price && (
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {app.price}
              </p>
            )}
          </div>
          
          {/* 右侧图片 */}
          <div className="relative">
            <div className="relative h-96 lg:h-[500px] overflow-hidden shadow-2xl">
              <Image
                src={app.banner || app.screenshots[0] || app.icon}
                alt={app.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* 装饰性元素 */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 dark:bg-blue-800 rounded-full opacity-50 blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-200 dark:bg-indigo-800 rounded-full opacity-50 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}