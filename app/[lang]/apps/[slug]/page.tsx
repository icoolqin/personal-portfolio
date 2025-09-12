import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, ExternalLink, Github, Star, Users, Calendar, Tag } from "lucide-react";
import { FaChrome, FaEdge } from "react-icons/fa6";
import type { App } from "@/types";
import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";

type Locale = 'zh' | 'en';

interface AppPageProps {
  params: Promise<{
    slug: string;
    lang: Locale;
  }>;
}

// 多语言翻译对象
const translations = {
  zh: {
    buyNow: '立即购买',
    chromeStore: 'Chrome 网上应用店',
    edgeStore: 'Microsoft Edge 加载项',
    downloadApp: '下载应用',
    onlineDemo: '在线演示',
    sourceCode: '源代码',
    screenshots: '应用截图',
    backToApps: '← 返回应用列表',
    backToHome: '返回首页',
    statistics: '统计信息',
    techStack: '技术栈',
    tags: '标签',
    users: '用户',
    rating: '评分',
    releasedOn: '发布于',
    updatedOn: '更新于'
  },
  en: {
    buyNow: 'Buy Now',
    chromeStore: 'Chrome Web Store',
    edgeStore: 'Microsoft Edge Add-ons',
    downloadApp: 'Download App',
    onlineDemo: 'Online Demo',
    sourceCode: 'Source Code',
    screenshots: 'Screenshots',
    backToApps: '← Back to Apps',
    backToHome: 'Back to Home',
    statistics: 'Statistics',
    techStack: 'Tech Stack',
    tags: 'Tags',
    users: 'users',
    rating: 'rating',
    releasedOn: 'Released on',
    updatedOn: 'Updated on'
  }
};

// 自定义 MDX 组件样式
const mdxComponents = {
  h1: (props: any) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-bold mt-6 mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />,
  p: (props: any) => <p className="mb-4 leading-relaxed" {...props} />,
  ul: (props: any) => <ul className="list-disc list-outside mb-4 space-y-2 ml-6" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-outside mb-4 space-y-2 ml-6" {...props} />,
  li: (props: any) => <li className="leading-relaxed" {...props} />,
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
  
  // 确保列表项前有空行
  content = content.replace(/([^\n])\n(-|\*|\d+\.)/g, '$1\n\n$2');
  
  // 修复可能的JSX标签问题
  content = content.replace(/<(\d+)/g, '<span>$1');
  content = content.replace(/(\d+)>/g, '$1</span>');
  
  return content;
}

export default async function AppPage({ params }: AppPageProps) {
  const { slug, lang } = await params;
  const t = translations[lang];
  
  // 根据语言加载对应的数据文件
  let appsData;
  try {
    const dataPath = path.join(process.cwd(), 'data', 'apps', `index-${lang}.json`);
    const dataContent = fs.readFileSync(dataPath, 'utf-8');
    appsData = JSON.parse(dataContent);
  } catch (error) {
    // 如果找不到对应语言的文件，回退到英文
    const fallbackPath = path.join(process.cwd(), 'data', 'apps', 'index-en.json');
    const fallbackContent = fs.readFileSync(fallbackPath, 'utf-8');
    appsData = JSON.parse(fallbackContent);
  }
  
  const apps = appsData.apps as App[];
  const app = apps.find(a => a.slug === slug);

  if (!app) {
    notFound();
  }

  // 读取 MDX 内容 - 优先读取对应语言的文件
  let mdxContent = null;
  let hasMdxContent = false;
  
  try {
    // 首先尝试读取对应语言的 MDX 文件
    let mdxPath = path.join(process.cwd(), 'data', 'apps', `${slug}-${lang}.mdx`);
    
    // 如果对应语言的文件不存在，回退到通用文件
    if (!fs.existsSync(mdxPath)) {
      mdxPath = path.join(process.cwd(), 'data', 'apps', `${slug}.mdx`);
    }
    
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
        console.error(`Error parsing MDX for ${slug}:`, mdxError);
        // 如果 MDX 解析失败，回退到纯文本显示
        hasMdxContent = false;
      }
    }
  } catch (error) {
    console.log(`MDX file not found for ${slug}`);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 应用头部信息 - 独立布局，不在 grid 中 */}
      <div className="mb-12">
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          <div className="w-[100px] h-[100px] relative flex-shrink-0">
            <Image
              src={app.icon}
              alt={`${app.name} icon`}
              fill
              className="rounded-2xl shadow-lg object-contain"
            />
          </div>
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
        <div className="flex flex-wrap gap-3">
          {/* DesktopSwitcher 的下载按钮 */}
          {app.slug === 'desktop-switcher' && app.links.download && (
            <Button asChild size="lg" className="shadow-md hover:shadow-lg transition-shadow">
              <a href={app.links.download} target="_blank" rel="noopener noreferrer">
                <Download className="w-5 h-5 mr-2" />
                {t.buyNow}
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
                    {t.chromeStore}
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
                    {t.edgeStore}
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
                {t.downloadApp}
              </a>
            </Button>
          )}
          
          {/* 其他按钮 */}
          {app.links.demo && (
            <Button asChild variant="outline" size="lg">
              <a href={app.links.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-5 h-5 mr-2" />
                {t.onlineDemo}
              </a>
            </Button>
          )}
          
          {app.links.github && (
            <Button asChild variant="outline" size="lg">
              <a href={app.links.github} target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                {t.sourceCode}
              </a>
            </Button>
          )}
        </div>
      </div>
      
      {/* 主要内容区域 - 使用 flex 布局 */}
      <div className="flex flex-col lg:flex-row gap-8 mb-12">
        {/* 左侧内容区 */}
        <div className="flex-1 lg:max-w-4xl">
          {/* 应用截图 */}
          {app.screenshots && app.screenshots.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{t.screenshots}</h2>
              <div className="grid grid-cols-1 gap-6">
                {app.screenshots.map((screenshot, index) => (
                  <div key={index} className="relative w-full rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-gray-50 dark:bg-gray-900">
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 宽高比 */ }}>
                      <Image
                        src={screenshot}
                        alt={`${app.name} screenshot ${index + 1}`}
                        fill
                        className="object-contain hover:scale-105 transition-transform duration-300"
                      />
                    </div>
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
        </div>
        
        {/* 右侧侧边栏 - 固定宽度，顶部对齐 */}
        <aside className="lg:w-80 flex-shrink-0">
          <div className="lg:sticky lg:top-20 space-y-6">
            {app.stats && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t.statistics}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {app.stats.users && (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{app.stats.users.toLocaleString()} {t.users}</span>
                    </div>
                  )}
                  {app.stats.rating && (
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm">{app.stats.rating}/5 {t.rating}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{t.releasedOn} {app.releaseDate}</span>
                  </div>
                  {app.lastUpdateDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{t.updatedOn} {app.lastUpdateDate}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            {app.techStack && app.techStack.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t.techStack}</CardTitle>
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
                  <CardTitle className="text-lg">{t.tags}</CardTitle>
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
        </aside>
      </div>
      
      {/* 返回按钮 */}
      <div className="flex justify-center gap-4 pt-8 border-t">
        <Button asChild variant="outline" size="lg">
          <Link href={`/${lang}/apps`}>
            {t.backToApps}
          </Link>
        </Button>
        <Button asChild variant="ghost" size="lg">
          <Link href={`/${lang}`}>
            {t.backToHome}
          </Link>
        </Button>
      </div>
    </div>
  );
}