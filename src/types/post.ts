export interface Post {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  content: string;
  tags?: string[];
  coverImage?: string;
}

// Using the same interface as ExternalBlogPost for consistency
export interface ExternalPost {
  title: string;
  date: string;
  platform: 'Medium' | 'Dev.to' | 'Hashnode' | 'Other';
  url: string;
  excerpt: string;
  tags: string[];
  canonicalUrl?: string;
}
