import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Download } from "lucide-react";
import type { App } from "@/types";

interface AppCardProps {
  app: App;
}

export function AppCard({ app }: AppCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={app.banner || app.icon}
          alt={app.name}
          fill
          className="object-cover"
        />
        {app.featured && (
          <Badge className="absolute top-2 right-2" variant="secondary">
            精选
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
            <Link href={`/apps/${app.slug}`}>
              查看详情
            </Link>
          </Button>
          
          {app.links.download && (
            <Button asChild variant="outline" size="sm">
              <a href={app.links.download} target="_blank" rel="noopener noreferrer">
                <Download className="w-4 h-4" />
              </a>
            </Button>
          )}
          
          {app.links.demo && (
            <Button asChild variant="outline" size="sm">
              <a href={app.links.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}