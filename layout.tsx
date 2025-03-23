import type { Metadata } from "next"
import { generateMetadata } from "./metadata"
import type React from "react" // Import React

export const metadata: Metadata = generateMetadata()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ai%20cards%20v2-FdEc74m6qbAhjbk4Jjkze5d9eVIpW2.png"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}

