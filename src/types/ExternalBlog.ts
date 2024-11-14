export interface ExternalBlogPost {
  title: string;
  date: string;
  platform: 'Medium' | 'Dev.to' | 'Hashnode' | 'Other';
  url: string;
  excerpt: string;
  tags: string[];
  canonicalUrl?: string;
}
