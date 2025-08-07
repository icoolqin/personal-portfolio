export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">个人作品集</h3>
            <p className="text-muted-foreground">
              展示我的应用作品，分享技术心得。
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">快速链接</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/" className="hover:text-foreground">首页</a></li>
              <li><a href="/apps" className="hover:text-foreground">应用</a></li>
              <li><a href="/about" className="hover:text-foreground">关于</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">联系方式</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>邮箱: your.email@example.com</li>
              <li>GitHub: @yourusername</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2024 个人作品集. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}