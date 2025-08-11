import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center px-4">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl">大吉的个人作品集</span>
          </Link>
        </div>
        
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link
            href="/"
            className="transition-colors hover:text-foreground/80 text-foreground"
          >
            首页
          </Link>
          <Link
            href="/apps"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            应用
          </Link>
          <Link
            href="/about"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            关于
          </Link>
        </nav>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/contact">联系我</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}