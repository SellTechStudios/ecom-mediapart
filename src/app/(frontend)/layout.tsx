import type { Metadata } from 'next'
import { Jost } from 'next/font/google'

import { cn } from '@/utilities/cn'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '../components/AdminBar'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { LivePreviewListener } from '../components/LivePreviewListener'
import { Providers } from '../providers'
import { InitTheme } from '../providers/Theme/InitTheme'
import { mergeOpenGraph } from '../utilities/mergeOpenGraph'
import './globals.css'

const jost = Jost({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-jost',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
      </head>
      <body className={cn(jost.variable, 'light:bg-zinc-100 dark:bg-zinc-700')}>
        <Providers>
          <AdminBar />
          <LivePreviewListener />
          <Header />
          <main className="main py-12">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://payloadcms.com'),
  openGraph: mergeOpenGraph(),
}
