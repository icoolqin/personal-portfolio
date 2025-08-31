import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ExternalLink, Github, Star, Users, Calendar, Tag } from "lucide-react";
import appsData from "@/data/apps/index.json";
import type { App } from "@/types";

interface AppPageProps {
  params: {
    slug: string;
  };
}

export default function AppPage({ params }: AppPageProps) {
  const apps = appsData.apps as App[];
  const app = apps.find(a => a.slug === params.slug);

  if (!app) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 应用头部信息 */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2">
          <div className="flex items-start gap-6 mb-6">
            <Image
              src={app.icon}
              alt={`${app.name} icon`}
              width={100}
              height={100}
              className="rounded-2xl shadow-lg"
            />
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{app.name}</h1>
              <p className="text-xl text-muted-foreground mb-4">
                {app.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{app.category}</Badge>
                {app.platform.map((platform) => (
                  <Badge key={platform} variant="outline">
                    {platform}
                  </Badge>
                ))}
              </div>
              {app.price && (
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                  {app.price}
                </p>
              )}
            </div>
          </div>
          
          {/* 操作按钮 */}
          <div className="flex gap-3 mb-8">
            {app.links.download && (
              <Button asChild size="lg">
                <a href="https://coolqin.gumroad.com/l/desktopswitcher?_gl=1*1wsrn7r*_ga*MzA5MzkzNTI1LjE3MzI1NDkxNzE.*_ga_6LJN6D94N6*czE3NTY2NTA1NTgkbzkkZzEkdDE3NTY2NTA1NjckajUxJGwwJGgw" target="_blank" rel="noopener noreferrer">
                  <Download className="w-5 h-5 mr-2" />
                  下载应用
                </a>
              </Button>
            )}
            
            {app.links.github && (
              <Button asChild variant="outline" size="lg">
                <a href={app.links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5 mr-2" />
                  源代码
                </a>
              </Button>
            )}
          </div>
        </div>
        
        {/* 侧边栏信息 */}
        <div className="space-y-6">
          {/* 统计信息 */}
          {app.stats && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">统计信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {app.stats.users && (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{app.stats.users.toLocaleString()} 用户</span>
                  </div>
                )}
                {app.stats.rating && (
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm">{app.stats.rating}/5 评分</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">发布于 {app.releaseDate}</span>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* 技术栈 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">技术栈</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {app.techStack.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* 标签 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">标签</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {app.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    <Tag className="w-3 h-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      {/* 应用截图 */}
      {app.screenshots.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">应用截图</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {app.screenshots.map((screenshot, index) => (
              <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                <Image
                  src={screenshot}
                  alt={`${app.name} screenshot ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* 功能特性 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">主要功能</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {app.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-muted/50">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </section>
      
      {/* 详细描述 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">详细介绍</h2>
        <div className="prose prose-lg max-w-none dark:prose-invert">
          {app.fullDescription.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </section>
      
      {/* 返回按钮 */}
      <div className="text-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/apps">← 返回应用列表</Link>
        </Button>
      </div>
    </div>
  );
}