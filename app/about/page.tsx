import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Github, ExternalLink } from "lucide-react";
import profileData from "@/data/profile.json";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">关于我</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            了解更多关于我的背景、技能和开发理念
          </p>
        </div>

        {/* 个人信息卡片 */}
        <Card className="mb-12">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* 头像 */}
              <div className="w-32 h-32 relative flex-shrink-0">
                <Image
                  src="/images/avatar_me.png"
                  alt={profileData.name}
                  fill
                  className="rounded-full object-cover shadow-lg"
                />
              </div>
              
              {/* 基本信息 */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-2">{profileData.name}</h2>
                <p className="text-xl text-muted-foreground mb-4">{profileData.title}</p>
                
                {/* 联系信息 */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center md:justify-start">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{profileData.location}</span>
                  </div>
                </div>
                
                {/* 技能标签 */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {profileData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 详细介绍 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* 关于我 */}
          <Card>
            <CardHeader>
              <CardTitle>关于我</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                我是一名热爱技术的独立开发者，专注于创建实用、美观的应用程序。
                我相信技术应该让生活更简单、更高效，每一个应用都是我对完美用户体验的追求。
              </p>
              <p className="text-muted-foreground leading-relaxed">
                作为产品经理，我深入理解用户需求，善于将复杂的问题转化为简洁的解决方案。
                同时，我也积极拥抱AI时代，熟练运用各种AI工具来提升开发效率和产品质量。
              </p>
            </CardContent>
          </Card>

          {/* 开发理念 */}
          <Card>
            <CardHeader>
              <CardTitle>开发理念</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>用户体验至上，每个细节都要精雕细琢</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>简洁而强大，避免不必要的复杂性</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>持续学习，拥抱新技术和新工具</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                  <span>开源精神，分享知识和经验</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* 技术栈 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>技术栈与工具</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-3">前端开发</h4>
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"].map((tech) => (
                    <Badge key={tech} variant="outline">{tech}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">桌面开发</h4>
                <div className="flex flex-wrap gap-2">
                  {["C++", "Windows API", "Electron", "Qt"].map((tech) => (
                    <Badge key={tech} variant="outline">{tech}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">AI工具</h4>
                <div className="flex flex-wrap gap-2">
                  {["ChatGPT", "Claude", "GitHub Copilot", "Cursor", "Trae"].map((tech) => (
                    <Badge key={tech} variant="outline">{tech}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 联系方式 */}
        <Card>
          <CardHeader>
            <CardTitle>联系我</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              如果你对我的作品感兴趣，或者有任何合作想法，欢迎随时联系我！
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <a href={`mailto:${profileData.email}`}>
                  <Mail className="w-4 h-4 mr-2" />
                  发送邮件
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="https://github.com/icoolqin" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}