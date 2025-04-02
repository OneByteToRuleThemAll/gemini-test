import './globals.css'
import type { Metadata } from 'next'
import Navigation from '../components/Navigation'
import { QueryProvider } from '@/components/QueryProvider'
import ErrorLogger from '@/components/ErrorLogger'
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
    <html lang="en" className={`${inter.variable} ${montserrat.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        {/* This script ensures theme is applied immediately before React hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  if (theme === 'dark' || (!theme && prefersDark)) {
                    document.documentElement.classList.add('dark');
                    document.body.classList.add('dark-mode');
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.body.classList.remove('dark-mode');
                  }
                } catch (e) {
                  console.log('Unable to check theme preference');
                }
              })();
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ErrorLogger>
          <QueryProvider>
            <div className="relative min-h-screen transition-all duration-300">
              {/* Background elements */}
              <div className="fixed inset-0 bg-gradient-to-br from-primary-50 to-white dark:from-gray-950 dark:to-gray-900 transition-colors duration-300 -z-20"></div>
              <div className="fixed inset-0 bg-glamour-gradient opacity-10 dark:opacity-5 -z-10 transition-opacity duration-300"></div>
              
              <Navigation />
              <main className="container mx-auto py-12 px-4">
                {children}
              </main>
              <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t dark:border-gray-700 mt-12 py-6 transition-colors duration-300">
                <div className="container mx-auto text-center text-gray-500 dark:text-gray-400">
                  © {new Date().getFullYear()} My Next.js Blog. All rights reserved.
                </div>
              </footer>
            </div>
          </QueryProvider>
        </ErrorLogger>
      </body>
    </html>
  )
}
