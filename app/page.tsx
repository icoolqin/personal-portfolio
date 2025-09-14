'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // 客户端语言检测和重定向
    const detectLanguage = () => {
      // 检查浏览器语言偏好
      const browserLang = navigator.language.toLowerCase();
      const defaultLang = browserLang.startsWith('zh') ? 'zh' : 'en';

      // 重定向到检测到的语言页面
      router.replace(`/${defaultLang}`);
    };

    detectLanguage();
  }, [router]);

  // 显示加载状态
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
}