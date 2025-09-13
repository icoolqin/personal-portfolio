"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Download } from "lucide-react";
import type { App } from "@/types";
import { usePathname } from 'next/navigation';

type Locale = 'zh' | 'en';

const translations = {
  zh: {
    featured: '精选',
    viewDetails: '查看详情'
  },
  en: {
    featured: 'Featured',
    viewDetails: 'View Details'
  }
};

interface AppCardProps {
  app: App;
}

export function AppCard({ app }: AppCardProps) {
  const pathname = usePathname();
  const lang = (pathname.split('/')[1] as Locale) || 'zh';
  const t = translations[lang] || translations.zh;
  
  return (
    <Link href={`/${lang}/apps/${app.slug}`} className="block">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
        <div className="relative h-48 w-full">
          <Image
            src={app.banner || app.icon}
            alt={app.name}
            fill
            className="object-cover"
          />
          {app.featured && (
            <Badge className="absolute top-2 right-2" variant="secondary">
              {t.featured}
            </Badge>
          )}
        </div>
        
        <CardHeader>
          <div className="flex items-center gap-3">
            <Image
              src={app.icon}
              alt={`${app.name} icon`}
              width={40}
              height={40}
              className="rounded-lg"
            />
            <div>
              <CardTitle className="text-lg">{app.name}</CardTitle>
              <CardDescription className="text-sm">
                {app.category} • {app.platform.join(", ")}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {app.shortDescription}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            {app.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Button asChild size="sm" className="flex-1">
              <span className="pointer-events-none">
                {t.viewDetails}
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
