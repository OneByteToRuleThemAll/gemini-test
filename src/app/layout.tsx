import './globals.css'
import type { Metadata } from 'next'
import Navigation from '../components/Navigation'

export const metadata: Metadata = {
  title: 'My Next.js Blog',
  description: 'A blog built with Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Navigation />
        <div className="container mx-auto py-8">
          {children}
        </div>
        <footer className="bg-white border-t mt-12 py-6">
          <div className="container mx-auto text-center text-gray-500">
            © {new Date().getFullYear()} My Next.js Blog. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  )
}
