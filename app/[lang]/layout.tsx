import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { notFound } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

type Locale = 'zh' | 'en';
const locales: Locale[] = ['zh', 'en'];

const metadataDict = {
  zh: {
    title: "个人作品集 - 展示我的应用作品",
    description: "一个展示我的APP作品的网站，包括桌面应用、Web应用等。"
  },
  en: {
    title: "Personal Portfolio - Showcase My App Works",
    description: "A website showcasing my app works, including desktop applications, web applications, and more."
  }
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dict = metadataDict[params.lang] || metadataDict.zh;
  
  return {
    title: dict.title,
    description: dict.description,
  };
}

export default function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  // 验证语言参数
  if (!locales.includes(params.lang)) {
    notFound();
  }

  return (
    <html lang={params.lang}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <div className="min-h-screen flex flex-col">
          <Header lang={params.lang} />
          <main className="flex-1">
            {children}
          </main>
          <Footer lang={params.lang} />
        </div>
      </body>
    </html>
  );
}