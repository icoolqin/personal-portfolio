import { AppCard } from "@/components/app/app-card";
import { getDictionary } from "@/lib/dictionaries";
import { getAppsData } from "@/lib/apps";
import { i18n, type Locale } from "@/next.config";

interface AppsPageProps {
  params: Promise<{ lang: Locale }>;
}

const DEFAULT_APPS_TITLE = "My Apps";
const DEFAULT_APPS_DESCRIPTION = "Here are all the applications I've developed.";

export default async function AppsPage({ params }: AppsPageProps) {
  const { lang } = await params;
  const requestedLocale = lang;
  const locale = i18n.locales.includes(requestedLocale)
    ? requestedLocale
    : i18n.defaultLocale;

  const [dictionary, apps] = await Promise.all([
    getDictionary(locale),
    getAppsData(locale),
  ]);

  const appsDict = dictionary.apps ?? {};

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          {appsDict.title ?? DEFAULT_APPS_TITLE}
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          {appsDict.description ?? DEFAULT_APPS_DESCRIPTION}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} locale={locale} />
        ))}
      </div>
    </div>
  );
}
