import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import '@fontsource/fira-code'
import { stylesheets } from '@/lib/mdx-config'
import Navigation from '@/components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'David Anyatonwu - Software Engineer',
  description: 'Personal website of David Anyatonwu - Blockchain Developer and Software Engineer',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {stylesheets.map((href) => (
          <link key={href} rel="stylesheet" href={href} />
        ))}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
          {children}
        </main>
      </body>
    </html>
  )
}
