import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ExternalLink, Github, Star, Users, Calendar, Tag } from "lucide-react";
import { FaChrome, FaEdge } from "react-icons/fa6";
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
          <div className="flex flex-wrap gap-3 mb-8">
            {/* DesktopSwitcher 的下载按钮 */}
            {app.slug === 'desktop-switcher' && app.links.download && (
              <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                <a href={app.links.download} target="_blank" rel="noopener noreferrer">
                  <Download className="w-5 h-5 mr-2" />
                  立即购买
                </a>
              </Button>
            )}
            
            {/* OneSearch 的两个商店按钮 */}
            {app.slug === 'onesearch' && (
              <>
                {(app.links as any).chrome && (
                  <Button 
                    asChild 
                    size="lg" 
                    className="bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all"
                  >
                    <a href={(app.links as any).chrome} target="_blank" rel="noopener noreferrer">
                      <FaChrome className="w-5 h-5 mr-2" />
                      Chrome插件市场
                    </a>
                  </Button>
                )}
                
                {(app.links as any).edge && (
                  <Button 
                    asChild 
                    size="lg" 
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all"
                  >
                    <a href={(app.links as any).edge} target="_blank" rel="noopener noreferrer">
                      <FaEdge className="w-5 h-5 mr-2" />
                      Microsoft Edge插件市场
                    </a>
                  </Button>
                )}
              </>
            )}
            
            {/* 通用下载按钮（用于其他应用） */}
            {app.slug !== 'desktop-switcher' && app.slug !== 'onesearch' && app.links.download && (
              <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                <a href={app.links.download} target="_blank" rel="noopener noreferrer">
                  <Download className="w-5 h-5 mr-2" />
                  下载应用
                </a>
              </Button>
            )}
            
            {/* 外部链接按钮 */}
            {app.links.demo && (
              <Button asChild variant="outline" size="lg">
                <a href={app.links.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  在线演示
                </a>
              </Button>
            )}
            
            {/* GitHub 按钮 */}
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
                {app.lastUpdateDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">更新于 {app.lastUpdateDate}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          
          {/* 技术栈 */}
          {app.techStack && app.techStack.length > 0 && (
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
          )}
          
          {/* 标签 */}
          {app.tags && app.tags.length > 0 && (
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
          )}
        </div>
      </div>
      
      {/* 应用截图 */}
      {app.screenshots && app.screenshots.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">应用截图</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {app.screenshots.map((screenshot, index) => (
              <div key={index} className="relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <Image
                  src={screenshot}
                  alt={`${app.name} screenshot ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* 功能特性 */}
      {app.features && app.features.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">主要功能</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {app.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                <span className="text-sm md:text-base">{feature}</span>
              </div>
            ))}
          </div>
        </section>
      )}
      
      {/* 详细描述 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">详细介绍</h2>
        <div className="prose prose-lg max-w-none dark:prose-invert">
          {app.fullDescription.split('\n').filter(p => p.trim()).map((paragraph, index) => (
            <p key={index} className="mb-4 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </section>
    </div>
  );
}