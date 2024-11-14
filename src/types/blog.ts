export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  tags: string[];
  tldr?: string;
  readingTime?: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
}

export interface BlogMetadata {
  title: string;
  date: string;
  author: string;
  excerpt: string;
  tags: string[];
  tldr?: string;
}
