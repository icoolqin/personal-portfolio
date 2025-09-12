'use client';

import Link from "next/link";

type Locale = 'zh' | 'en';

interface FooterProps {
  lang: Locale;
}

const dictionaries = {
  zh: {
    footer: {
      title: "大吉的个人作品集",
      description: "展示我的应用作品，分享技术心得。",
      quickLinks: "快速链接",
      contact: "联系方式",
      email: "邮箱"
    },
    navigation: { home: "首页", apps: "应用", about: "关于" },
    common: { allRightsReserved: "版权所有" }
  },
  en: {
    footer: {
      title: "Daji's Personal Portfolio",
      description: "Showcasing my app works and sharing technical insights.",
      quickLinks: "Quick Links",
      contact: "Contact",
      email: "Email"
    },
    navigation: { home: "Home", apps: "Apps", about: "About" },
    common: { allRightsReserved: "All rights reserved" }
  }
};

export function Footer({ lang }: FooterProps) {
  const dict = dictionaries[lang] || dictionaries.en;
  
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">{dict.footer.title}</h3>
            <p className="text-muted-foreground">
              {dict.footer.description}
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">{dict.footer.quickLinks}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href={`/${lang}`} className="hover:text-foreground">{dict.navigation.home}</Link></li>
              <li><Link href={`/${lang}/apps`} className="hover:text-foreground">{dict.navigation.apps}</Link></li>
              <li><Link href={`/${lang}/about`} className="hover:text-foreground">{dict.navigation.about}</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">{dict.footer.contact}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{dict.footer.email}: icoolqin@gmail.com</li>
              <li>GitHub: <a href="https://github.com/icoolqin" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">@icoolqin</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2025 {dict.footer.title}. {dict.common.allRightsReserved}.</p>
        </div>
      </div>
    </footer>
  );
}