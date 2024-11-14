import { generateMetadata } from '@/lib/metadata';

export const metadata = generateMetadata({
  title: 'Projects',
  description: 'Explore my portfolio of software engineering projects, including web applications, blockchain solutions, and open-source contributions.',
  image: '/projects-og.png',
  openGraph: {
    type: 'website',
    keywords: [
      'blockchain projects',
      'smart contracts',
      'DApps',
      'Web3',
      'full stack development',
      'React applications',
      'Node.js',
      'TypeScript projects',
    ],
  },
});
