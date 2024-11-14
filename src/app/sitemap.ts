import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://davidanyatonwu.com';

  // Add your static pages
  const staticPages = [
    '',
    '/about',
    '/projects',
    '/contact',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Add your blog posts
  // You'll need to implement this based on your blog post structure
  const blogPosts = [
    // Example:
    // '/blog/getting-started-with-blockchain',
    // '/blog/example-blog-post',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPosts];
}
