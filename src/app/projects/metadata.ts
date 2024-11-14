import { createMetadata } from '@/lib/metadata';

export const metadata = createMetadata({
  title: 'Projects by David Anyatonwu - Full Stack & Blockchain Development',
  description: 'Explore my portfolio of blockchain and full-stack development projects, including smart contracts, DApps, Web3 applications, and modern web solutions.',
  openGraph: {
    title: 'Projects by David Anyatonwu - Full Stack & Blockchain Development',
    description: 'Explore my portfolio of blockchain and full-stack development projects, including smart contracts, DApps, Web3 applications, and modern web solutions.',
    type: 'website',
    images: [
      {
        url: '/og/projects.png',
        width: 1200,
        height: 630,
        alt: 'Projects by David Anyatonwu - Full Stack & Blockchain Development Portfolio',
      },
    ],
  },
  keywords: [
    'blockchain projects',
    'smart contracts',
    'DApps',
    'Web3',
    'full stack development',
    'React applications',
    'Node.js',
    'TypeScript projects',
    'David Anyatonwu portfolio',
  ],
});
