import { AppCard } from "@/components/app/app-card";
import appsData from "@/data/apps/index.json";
import type { App } from "@/types";

export default function AppsPage() {
  const apps = appsData.apps as App[];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">我的应用</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          这里展示了我开发的所有应用，每一个都经过精心设计和开发。
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}