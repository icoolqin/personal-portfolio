import type { Locale } from '@/next.config';
import type { App } from '@/types';

const appsData = {
  zh: () => import('@/data/apps/index-zh.json').then((module) => module.default),
  en: () => import('@/data/apps/index-en.json').then((module) => module.default),
};

export const getAppsData = async (locale: Locale) => {
  const data = await (appsData[locale]?.() ?? appsData.zh());
  return data.apps as App[];
};

export const getAppBySlug = async (locale: Locale, slug: string) => {
  const apps = await getAppsData(locale);
  return apps.find(app => app.slug === slug);
};