import type { Metadata } from "next";
import "../globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { notFound } from "next/navigation";
import { i18n, type Locale } from "@/next.config";

const metadataDict: Record<Locale, { title: string; description: string }> = {
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
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = i18n.locales.includes(lang) ? lang : i18n.defaultLocale;
  const dict = metadataDict[locale];

  return {
    title: dict.title,
    description: dict.description,
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const locale = i18n.locales.includes(lang) ? lang : i18n.defaultLocale;
  // 验证语言参数
  if (!i18n.locales.includes(lang)) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header lang={locale} />
      <main className="flex-1">
        {children}
      </main>
      <Footer lang={locale} />
    </div>
  );
}
