import './globals.css'
import type { Metadata } from 'next'
import Navigation from '../components/Navigation'
import Script from 'next/script'
import { Inter, Montserrat, Playfair_Display } from 'next/font/google'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap', 
  variable: '--font-montserrat'
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair'
})

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
    <html lang="en" className={`${inter.variable} ${montserrat.variable} ${playfair.variable}`}>
      <body className="bg-gradient-to-br from-primary-50 to-white dark:from-gray-950 dark:to-gray-900 dark:text-white transition-colors duration-300 min-h-screen">
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function() {
              // Check if theme preference exists in localStorage
              const theme = localStorage.getItem('theme') || 'light';
              const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              
              // Apply the theme class to the document
              if (theme === 'dark' || (!theme && prefersDark)) {
                document.documentElement.classList.add('dark');
              }
            })()
          `}
        </Script>
        <div className="relative">
          <div className="absolute inset-0 bg-glamour-gradient opacity-10 dark:opacity-5 -z-10"></div>
          <Navigation />
          <div className="container mx-auto py-12 px-4">
            {children}
          </div>
          <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t dark:border-gray-700 mt-12 py-6">
            <div className="container mx-auto text-center text-gray-500 dark:text-gray-400">
              © {new Date().getFullYear()} My Next.js Blog. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
