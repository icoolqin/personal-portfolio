import Link from "next/link";
import { FeaturedCarousel } from "@/components/app/featured-carousel";
import { AppCard } from "@/components/app/app-card";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/dictionaries";
import { getAppsData } from "@/lib/apps";
import { i18n, type Locale } from "@/next.config";

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

const DEFAULT_MORE_APPS = "More Apps";
const DEFAULT_MORE_APPS_DESCRIPTION = "Explore other applications I've developed, each dedicated to enhancing your digital experience.";
const DEFAULT_LEARN_MORE = "Learn More";
const DEFAULT_VIEW_ALL = "View All Apps";
const DEFAULT_ABOUT_ME = "About Me";
const DEFAULT_ABOUT_ME_DESCRIPTION = "I am an independent developer focused on creating practical and beautiful applications.";

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  const requestedLocale = lang;
  const locale = i18n.locales.includes(requestedLocale)
    ? requestedLocale
    : i18n.defaultLocale;

  const [dictionary, apps] = await Promise.all([
    getDictionary(locale),
    getAppsData(locale),
  ]);

  const homeDict = dictionary.home ?? {};
  const commonDict = dictionary.common ?? {};

  const featuredApps = apps.filter((app) => app.featured);
  const otherApps = apps.filter((app) => !app.featured).slice(0, 3);

  return (
    <div className="space-y-16">
      {featuredApps.length > 0 && (
        <FeaturedCarousel
          apps={featuredApps}
          locale={locale}
          autoPlayInterval={8000}
        />
      )}

      {otherApps.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              {homeDict.moreApps ?? DEFAULT_MORE_APPS}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {homeDict.moreAppsDescription ?? DEFAULT_MORE_APPS_DESCRIPTION}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {otherApps.map((app) => (
              <AppCard key={app.id} app={app} locale={locale} />
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg">
              <Link href={`/${locale}/apps`}>
                {commonDict.viewAll ?? DEFAULT_VIEW_ALL}
              </Link>
            </Button>
          </div>
        </section>
      )}

      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            {homeDict.aboutMe ?? DEFAULT_ABOUT_ME}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            {homeDict.aboutMeDescription ?? DEFAULT_ABOUT_ME_DESCRIPTION}
          </p>
          <Button asChild variant="outline" size="lg">
            <Link href={`/${locale}/about`}>
              {commonDict.learnMore ?? DEFAULT_LEARN_MORE}
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
