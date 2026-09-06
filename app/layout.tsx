import React from "react"
import type { Metadata } from 'next'
import { Instrument_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import SchemaOrg from '@/components/schemaOrg'
import './globals.css'

const instrumentSans = Instrument_Sans({ 
  subsets: ["latin"],
  variable: '--font-instrument'
});

const instrumentSerif = Instrument_Serif({ 
  subsets: ["latin"],
  weight: "400",
  variable: '--font-instrument-serif'
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains'
});

export const metadata: Metadata = {
  metadataBase: new URL('https://neuralscript.tech/'),
  title: {
    template: '%s | Neural Script',
    default: 'Neural Script | AI, ML & Software Engineering',
  },
  description: 'Neural Script delivers AI, machine learning, agentic AI, software, web and mobile solutions that help businesses design, build, deploy and evolve.',
  generators: ['Next.js', 'v0.app'],
  manifest: '/site.webmanifest',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'apple-touch-icon',
      url: '/apple-touch-icon.png'
    },
    '/android-chrome-192x192.png': {
      purpose: 'any maskable',
      sizes: '192x192'
    },
    '/android-chrome-512x512.png': {
      purpose: 'any maskable',
      sizes: '512x512'
    },
    '/safari-pinned-tab.svg': {
      rel: 'mask-icon',
      color: '#000000'
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://neuralscript.tech/',
    title: 'Neural Script | AI, ML & Software Engineering',
    description: 'Neural Script delivers AI, machine learning, agentic AI, software, web and mobile solutions that help businesses design, build, deploy and evolve.',
    siteName: 'Neural Script',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Neural Script AI and machine learning engineering',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neural Script | AI, ML & Software Engineering',
    description: 'Neural Script delivers AI, machine learning, agentic AI, software, web and mobile solutions that help businesses design, build, deploy and evolve.',
    images: ['/og-image.jpg'],
    creator: '@neuralscript',
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
  verification: {
    google: ['g40iyksM5bipFcaBv7pbl5L5FZBN-IH1C3wqyrkMMWU'],
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${instrumentSans.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
        <SchemaOrg />
      </body>
    </html>
  )
}