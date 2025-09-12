import type { Locale } from '@/next.config';

const dictionaries = {
  zh: () => import('@/dictionaries/zh.json').then((module) => module.default),
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]?.() ?? dictionaries.en();
};

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>;