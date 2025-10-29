import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import StoreProvider from "@/lib/store/StoreProvider"
import { Toaster } from "sonner"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
})

export const metadata: Metadata = {
  title: "LUXE - Premium E-Commerce",
  description: "Curated collection of premium products",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} font-sans antialiased`}>
        <StoreProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Analytics />
          <Toaster position="bottom-right" richColors />
        </StoreProvider>
      </body>
    </html>
  )
}
