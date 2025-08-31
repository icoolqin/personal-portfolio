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
import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";

interface AppPageProps {
  params: {
    slug: string;
  };
}

// 自定义 MDX 组件样式
const mdxComponents = {
  h1: (props: any) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />,
  p: (props: any) => <p className="mb-4 leading-relaxed" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
  li: (props: any) => <li className="ml-4" {...props} />,
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic" {...props} />
  ),
  code: (props: any) => (
    <code className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4" {...props} />
  ),
  hr: () => <hr className="my-8 border-gray-300 dark:border-gray-700" />,
};

// 预处理 MDX 内容，修复常见问题
function preprocessMDX(content: string): string {
  // 移除 frontmatter
  if (content.startsWith('---')) {
    const endOfFrontmatter = content.indexOf('---', 3);
    if (endOfFrontmatter !== -1) {
      content = content.slice(endOfFrontmatter + 3).trim();
    }
  }
  
  // 修复可能的问题：将 "桌面1" 这样的文本改为 "桌面 1"
  content = content.replace(/桌面(\d)/g, '桌面 $1');
  
  // 确保列表项前有空行
  content = content.replace(/([^\n])\n(-|\*|\d+\.)/g, '$1\n\n$2');
  
  return content;
}

export default async function AppPage({ params }: AppPageProps) {
  const apps = appsData.apps as App[];
  const app = apps.find(a => a.slug === params.slug);

  if (!app) {
    notFound();
  }

  // 读取 MDX 内容
  let mdxContent = null;
  let hasMdxContent = false;
  
  try {
    const mdxPath = path.join(process.cwd(), 'data', 'apps', `${params.slug}.mdx`);
    if (fs.existsSync(mdxPath)) {
      const rawContent = fs.readFileSync(mdxPath, 'utf-8');
      const processedContent = preprocessMDX(rawContent);
      
      // 尝试渲染 MDX
      try {
        mdxContent = (
          <MDXRemote 
            source={processedContent} 
            components={mdxComponents}
          />
        );
        hasMdxContent = true;
      } catch (mdxError) {
        console.error(`Error parsing MDX for ${params.slug}:`, mdxError);
        // 如果 MDX 解析失败，回退到纯文本显示
        hasMdxContent = false;
      }
    }
  } catch (error) {
    console.log(`MDX file not found for ${params.slug}`);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 应用头部信息 - 保持不变 */}
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
                      Chrome 网上应用店
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
                      Microsoft Edge 加载项
                    </a>
                  </Button>
                )}
              </>
            )}
            
            {/* 通用下载按钮 */}
            {app.slug !== 'desktop-switcher' && app.slug !== 'onesearch' && app.links.download && (
              <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow">
                <a href={app.links.download} target="_blank" rel="noopener noreferrer">
                  <Download className="w-5 h-5 mr-2" />
                  下载应用
                </a>
              </Button>
            )}
            
            {/* 其他按钮 */}
            {app.links.demo && (
              <Button asChild variant="outline" size="lg">
                <a href={app.links.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  在线演示
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
        
        {/* 侧边栏信息 - 保持不变 */}
        <div className="space-y-6">
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
      
      {/* 详细介绍 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">详细介绍</h2>
        <div className="prose prose-lg max-w-none dark:prose-invert
                        prose-headings:font-bold 
                        prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl
                        prose-p:text-gray-700 dark:prose-p:text-gray-300
                        prose-strong:text-gray-900 dark:prose-strong:text-gray-100
                        prose-ul:list-disc prose-ol:list-decimal
                        prose-li:ml-4
                        prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-4
                        prose-code:bg-gray-100 dark:prose-code:bg-gray-800
                        prose-code:px-1 prose-code:py-0.5 prose-code:rounded
                        prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800
                        prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline">
          {hasMdxContent ? (
            mdxContent
          ) : (
            app.fullDescription.split('\n').filter(p => p.trim()).map((paragraph, index) => (
              <p key={index} className="mb-4">
                {paragraph}
              </p>
            ))
          )}
        </div>
      </section>
      
      {/* 返回按钮 */}
      <div className="flex justify-center gap-4 pt-8 border-t">
        <Button asChild variant="outline" size="lg">
          <Link href="/apps">
            ← 返回应用列表
          </Link>
        </Button>
        <Button asChild variant="ghost" size="lg">
          <Link href="/">
            返回首页
          </Link>
        </Button>
      </div>
    </div>
  );
}