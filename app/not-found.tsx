'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [lang, setLang] = useState<'zh' | 'en'>('en');

  useEffect(() => {
    // 检测浏览器语言
    const browserLang = navigator.language.toLowerCase();
    setLang(browserLang.startsWith('zh') ? 'zh' : 'en');
  }, []);

  const content = {
    zh: {
      title: '页面未找到',
      description: '抱歉，您访问的页面不存在。',
      backHome: '返回首页',
      backApps: '查看应用'
    },
    en: {
      title: 'Page Not Found',
      description: 'Sorry, the page you are looking for does not exist.',
      backHome: 'Back to Home',
      backApps: 'View Apps'
    }
  };

  const t = content[lang];

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">{t.title}</h2>
          <p className="text-gray-600 mb-8">{t.description}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href={`/${lang}`}>
              {t.backHome}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href={`/${lang}/apps`}>
              {t.backApps}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
