import { Metadata } from 'next';
import { BlogPost } from '../types/blog';

const defaultTitle = 'David Anyatonwu';
const defaultDescription =
  'Software Engineer and Technical Writer. Building scalable web applications and sharing knowledge through technical content.';

interface MetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
  openGraph?: {
    title?: string;
    description?: string;
    images?: {
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }[];
    [key: string]: any;
  };
  twitter?: {
    card?: 'summary' | 'summary_large_image' | 'app' | 'player';
    title?: string;
    description?: string;
    images?: string[];
    [key: string]: any;
  };
}

export function generateMetadata({
  title = defaultTitle,
  description = defaultDescription,
  image = '/og-image.png',
  icons = '/favicon.ico',
  noIndex = false,
  openGraph,
  twitter,
}: MetadataOptions = {}): Metadata {
  const metadata: Metadata = {
    title: {
      default: title,
      template: `%s | ${defaultTitle}`,
    },
    description,
    openGraph: {
      title: {
        default: title,
        template: `%s | ${defaultTitle}`,
      },
      description,
      url: process.env.NEXT_PUBLIC_SITE_URL,
      siteName: defaultTitle,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      ...twitter,
    },
    icons,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };

  return metadata;
}

export function generateBlogMetadata(post: BlogPost): Metadata {
  const { title, excerpt, date, tags = [], author } = post;
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`;
  const ogImage = `${process.env.NEXT_PUBLIC_SITE_URL}/api/og?slug=${post.slug}`;

  return generateMetadata({
    title,
    description: excerpt,
    openGraph: {
      type: 'article',
      url,
      publishedTime: date,
      authors: [author],
      tags,
    },
    image: ogImage,
  });
}
