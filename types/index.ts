export interface App {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: 'wechat-miniapp' | 'chrome-extension' | 'windows-app' | 'web-app';
  icon: string;
  screenshots: string[];
  features: string[];
  downloadUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  releaseDate: string;
  version: string;
  tags: string[];
  featured: boolean;
  stats?: {
    users?: number;
    rating?: number;
    downloads?: number;
  };
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  avatar: string;
  email: string;
  location: string;
  skills: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  username: string;
}