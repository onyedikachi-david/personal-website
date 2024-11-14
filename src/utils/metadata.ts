import { Metadata } from 'next';

export function generateBlogMetadata(
  title: string,
  description: string,
  tags: string[],
  author: string,
  publishedTime: string,
  tldr?: string
): Metadata {
  const ogDescription = tldr ? `TL;DR: ${tldr}` : description;
  
  return {
    title,
    description: ogDescription,
    authors: [{ name: author }],
    openGraph: {
      title,
      description: ogDescription,
      type: 'article',
      publishedTime,
      authors: [author],
      tags,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: ogDescription,
      creator: '@davidanyatonwu',
    },
    keywords: tags.join(', '),
  };
}

export function generateSiteMetadata(
  title: string,
  description: string
): Metadata {
  return {
    metadataBase: new URL('https://davidanyatonwu.com'),
    title: {
      default: title,
      template: `%s | ${title}`,
    },
    description,
    openGraph: {
      title,
      description,
      siteName: title,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@davidanyatonwu',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
