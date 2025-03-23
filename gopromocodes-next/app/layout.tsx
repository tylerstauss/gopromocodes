import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import './custom-styles.css'
import { Providers } from './providers'
import HeaderWrapper from '../components/HeaderWrapper'
import Footer from '../components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GoPromoCodes - Promo Codes & Coupons',
  description: 'Find the latest promo codes, coupons, and deals from your favorite stores.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen">
            <HeaderWrapper />
            <main className="flex-grow bg-gray-50 pt-4">
              <div className="container mx-auto px-4">
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
} 