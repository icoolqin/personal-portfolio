export interface App {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  platform: string[];
  tags: string[];
  icon: string;
  banner?: string;
  screenshots: string[];
  video?: string;
  links: {
    download?: string;
    demo?: string;
    github?: string;
    documentation?: string;
  };
  version: string;
  releaseDate: string;
  lastUpdateDate: string;
  stats?: {
    users?: number;
    downloads?: number;
    rating?: number;
    reviews?: number;
  };
  features: string[];
  techStack: string[];
  featured: boolean;
  price?: string;
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