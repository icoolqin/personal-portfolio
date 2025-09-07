import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { headers } from 'next/headers';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Personal Portfolio",
  description: "A personal portfolio website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get('x-pathname') || '';
  
  // 从路径中提取语言，默认为中文
  const lang = pathname.startsWith('/en') ? 'en' : 'zh';
  
  return (
    <html lang={lang}>
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
