import { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://davidanyatonwu.com';

interface MetadataOptions extends Partial<Metadata> {
  ogType?: 'website' | 'article' | 'profile';
}

const defaultMetadata = {
  title: 'David Anyatonwu - Full Stack Developer & Blockchain Engineer',
  description: 'Full Stack Developer and Blockchain Engineer specializing in Web3, React, Node.js, and modern web technologies.',
  authors: [{ name: 'David Anyatonwu' }],
  creator: 'David Anyatonwu',
  publisher: 'David Anyatonwu',
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
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'David Anyatonwu',
    images: [{
      url: `${siteUrl}/api/og`,
      width: 1200,
      height: 630,
      alt: 'David Anyatonwu - Full Stack Developer & Blockchain Engineer',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@David_Anyatonwu',
    creator: '@David_Anyatonwu',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black',
    'apple-mobile-web-app-title': 'David Anyatonwu',
  },
};

export function createMetadata(options: MetadataOptions = {}): Metadata {
  const { title, description, ogType = 'website', ...rest } = options;
  
  // Generate OG image URL with title and description
  const ogImageUrl = new URL('/api/og', siteUrl);
  if (title) ogImageUrl.searchParams.set('title', title);
  if (description) ogImageUrl.searchParams.set('description', description);
  if (ogType) ogImageUrl.searchParams.set('type', ogType);

  return {
    ...defaultMetadata,
    ...rest,
    title: title || defaultMetadata.title,
    description: description || defaultMetadata.description,
    openGraph: {
      ...defaultMetadata.openGraph,
      ...(rest.openGraph || {}),
      title: title || defaultMetadata.title,
      description: description || defaultMetadata.description,
      type: ogType,
      images: [{
        url: ogImageUrl.toString(),
        width: 1200,
        height: 630,
        alt: title || defaultMetadata.title,
      }],
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...(rest.twitter || {}),
      title: title || defaultMetadata.title,
      description: description || defaultMetadata.description,
    },
  };
}
