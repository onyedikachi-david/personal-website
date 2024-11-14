import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@fontsource/fira-code'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://anyatonwu.dev'

export const metadata: Metadata = {
  title: 'David Anyatonwu - Software Engineer',
  description: 'Blockchain Developer and Software Engineer passionate about building innovative solutions with cutting-edge technology',
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: baseUrl,
  },
  authors: [{ name: 'David Anyatonwu' }],
  generator: 'Next.js',
  applicationName: 'David Anyatonwu Portfolio',
  keywords: ['Blockchain Developer', 'Software Engineer', 'Web3', 'Full Stack Developer', 'TypeScript', 'React', 'Next.js'],
  creator: 'David Anyatonwu',
  publisher: 'David Anyatonwu',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'David Anyatonwu',
    title: 'David Anyatonwu - Blockchain Developer & Software Engineer',
    description: 'Blockchain Developer and Software Engineer passionate about building innovative solutions with cutting-edge technology',
    emails: ['david@anyatonwu.dev'],
    images: [
      {
        url: `${baseUrl}/opengraph-image.png`,
        width: 1200,
        height: 630,
        alt: 'David Anyatonwu - Software Engineer',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'David Anyatonwu - Blockchain Developer',
    description: 'Blockchain Developer and Software Engineer passionate about building innovative solutions',
    creator: '@anyatonwu',
    site: '@anyatonwu',
    images: [`${baseUrl}/twitter-image.png`],
  },
  other: {
    // Discord specific
    'discord:title': 'David Anyatonwu - Blockchain Developer & Software Engineer',
    'discord:description': 'Blockchain Developer and Software Engineer passionate about building innovative solutions',
    'discord:image': `${baseUrl}/opengraph-image.png`,
    // WhatsApp specific
    'og:whatsapp:title': 'David Anyatonwu - Developer Portfolio',
    'og:whatsapp:description': 'Check out my portfolio showcasing blockchain and software engineering projects',
    // LinkedIn specific
    'og:linkedin:title': 'David Anyatonwu - Blockchain Developer & Software Engineer',
    'og:linkedin:description': 'Experienced Blockchain Developer and Software Engineer with expertise in Web3, DeFi, and Full Stack Development',
    'og:linkedin:image': `${baseUrl}/opengraph-image.png`,
    'og:linkedin:author': 'David Anyatonwu',
    // Additional SEO
    'theme-color': '#9333EA',
    'msapplication-TileColor': '#9333EA',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
          {children}
        </main>
      </body>
    </html>
  )
}
