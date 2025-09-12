'use client';

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Github, ExternalLink } from "lucide-react";
import { use } from 'react';

type Locale = 'zh' | 'en';

const dictionaries = {
  zh: {
    about: {
      title: "关于我",
      description: "了解更多关于我的背景、技能和开发理念",
      aboutMeTitle: "关于我",
      aboutMeContent1: "我是一名热爱技术的独立开发者，专注于创建实用、美观的应用程序。我相信技术应该让生活更简单、更高效，每一个应用都是我对完美用户体验的追求。",
      aboutMeContent2: "作为产品经理，我深入理解用户需求，善于将复杂的问题转化为简洁的解决方案。同时，我也积极拥抱AI时代，熟练运用各种AI工具来提升开发效率和产品质量。",
      philosophy: "开发理念",
      philosophyItems: [
        "用户体验至上，每个细节都要精雕细琢",
        "简洁而强大，避免不必要的复杂性",
        "持续学习，拥抱新技术和新工具",
        "开源精神，分享知识和经验"
      ],
      techStackTitle: "技术栈与工具",
      frontend: "前端开发",
      desktop: "桌面开发",
      aiTools: "AI工具",
      contactMe: "联系我",
      contactDescription: "如果你对我的作品感兴趣，或者有任何合作想法，欢迎随时联系我！"
    },
    profile: {
      name: "大吉",
      title: "独立开发者 / 产品经理",
      location: "上海",
      skills: ["产品经理", "各种AI工具使用"]
    },
    common: {
      sendEmail: "发送邮件"
    }
  },
  en: {
    about: {
      title: "About Me",
      description: "Learn more about my background, skills, and development philosophy",
      aboutMeTitle: "About Me",
      aboutMeContent1: "I am a technology-loving independent developer focused on creating practical and beautiful applications. I believe technology should make life simpler and more efficient, and every application is my pursuit of perfect user experience.",
      aboutMeContent2: "As a product manager, I deeply understand user needs and am good at transforming complex problems into simple solutions. At the same time, I actively embrace the AI era and skillfully use various AI tools to improve development efficiency and product quality.",
      philosophy: "Development Philosophy",
      philosophyItems: [
        "User experience first, every detail must be carefully crafted",
        "Simple yet powerful, avoiding unnecessary complexity",
        "Continuous learning, embracing new technologies and tools",
        "Open source spirit, sharing knowledge and experience"
      ],
      techStackTitle: "Tech Stack & Tools",
      frontend: "Frontend Development",
      desktop: "Desktop Development",
      aiTools: "AI Tools",
      contactMe: "Contact Me",
      contactDescription: "If you're interested in my work or have any collaboration ideas, feel free to contact me anytime!"
    },
    profile: {
      name: "Daji",
      title: "Independent Developer / Product Manager",
      location: "Shanghai",
      skills: ["Product Manager", "Various AI Tools"]
    },
    common: {
      sendEmail: "Send Email"
    }
  }
};

const profileData = {
  email: "icoolqin@gmail.com"
};

export default function AboutPage({ params }: { params: Promise<{ lang: Locale }> }) {
  const resolvedParams = use(params);
  const dict = dictionaries[resolvedParams.lang] || dictionaries.en;
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">{dict.about.title}</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {dict.about.description}
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
                  alt={dict.profile.name}
                  fill
                  className="rounded-full object-cover shadow-lg"
                />
              </div>
              
              {/* 基本信息 */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-3xl font-bold mb-2">{dict.profile.name}</h2>
                <p className="text-xl text-muted-foreground mb-4">{dict.profile.title}</p>
                
                {/* 联系信息 */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center md:justify-start">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{dict.profile.location}</span>
                  </div>
                </div>
                
                {/* 技能标签 */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {dict.profile.skills.map((skill, index) => (
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
              <CardTitle>{dict.about.aboutMeTitle}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {dict.about.aboutMeContent1}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {dict.about.aboutMeContent2}
              </p>
            </CardContent>
          </Card>

          {/* 开发理念 */}
          <Card>
            <CardHeader>
              <CardTitle>{dict.about.philosophy}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 text-muted-foreground">
                {dict.about.philosophyItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* 技术栈 */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>{dict.about.techStackTitle}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold mb-3">{dict.about.frontend}</h4>
                <div className="flex flex-wrap gap-2">
                  {["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS"].map((tech) => (
                    <Badge key={tech} variant="outline">{tech}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">{dict.about.desktop}</h4>
                <div className="flex flex-wrap gap-2">
                  {["C++", "Windows API", "Electron", "Qt"].map((tech) => (
                    <Badge key={tech} variant="outline">{tech}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-3">{dict.about.aiTools}</h4>
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
            <CardTitle>{dict.about.contactMe}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              {dict.about.contactDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <a href={`mailto:${profileData.email}`}>
                  <Mail className="w-4 h-4 mr-2" />
                  {dict.common.sendEmail}
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