'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from 'next/navigation';
import { Globe } from 'lucide-react';

type Locale = 'zh' | 'en';

interface HeaderProps {
  lang: Locale;
}

const dictionaries = {
  zh: {
    header: { title: "大吉的个人作品集" },
    navigation: { home: "首页", apps: "应用", about: "关于" }
  },
  en: {
    header: { title: "Daji's Personal Portfolio" },
    navigation: { home: "Home", apps: "Apps", about: "About" }
  }
};

function LanguageSwitcher({ currentLang }: { currentLang: Locale }) {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (newLang: Locale) => {
    const pathWithoutLang = pathname.replace(`/${currentLang}`, '') || '/';
    const newPath = `/${newLang}${pathWithoutLang === '/' ? '' : pathWithoutLang}`;
    router.push(newPath);
  };

  const getLanguageLabel = (lang: Locale) => {
    return lang === 'zh' ? '中文' : 'English';
  };

  const otherLang = currentLang === 'zh' ? 'en' : 'zh';

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => switchLanguage(otherLang)}
      className="flex items-center gap-2"
    >
      <Globe className="w-4 h-4" />
      {getLanguageLabel(otherLang)}
    </Button>
  );
}

export function Header({ lang }: HeaderProps) {
  const dict = dictionaries[lang] || dictionaries.en;
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        <div className="mr-4 flex">
          <Link href={`/${lang}`} className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl">{dict.header.title}</span>
          </Link>
        </div>
        
        <nav className="flex items-center space-x-6 text-sm font-medium flex-1">
          <Link
            href={`/${lang}`}
            className="transition-colors hover:text-foreground/80 text-foreground"
          >
            {dict.navigation.home}
          </Link>
          <Link
            href={`/${lang}/apps`}
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            {dict.navigation.apps}
          </Link>
          <Link
            href={`/${lang}/about`}
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            {dict.navigation.about}
          </Link>
        </nav>
        
        <LanguageSwitcher currentLang={lang} />
      </div>
    </header>
  );
}