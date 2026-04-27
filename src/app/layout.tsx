import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { getSiteSettings } from '@/lib/queries'

const inter = Inter({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700'],
})

const spaceGroteskDisplay = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['500', '700'],
})

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings()
  return {
    title: {
      default: s.seo_title,
      template: `%s | ${s.site_name}`,
    },
    description: s.seo_description,
    openGraph: {
      images: s.og_image_url ? [s.og_image_url] : [],
    },
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGroteskDisplay.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="h-full">{children}</body>
    </html>
  )
}
