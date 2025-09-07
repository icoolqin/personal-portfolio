import { redirect } from 'next/navigation';
import { i18n } from '@/next.config';

export default function RootPage() {
  // 重定向到默认语言页面
  redirect(`/${i18n.defaultLocale}`);
}