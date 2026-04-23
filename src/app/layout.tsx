import type { Metadata } from "next"
import { Inter, Playfair_Display, Space_Grotesk } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
})

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "700"],
})

export const metadata: Metadata = {
  title: "Matt Banton",
  description: "Photographer & Videographer",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="h-full">{children}</body>
    </html>
  )
}
