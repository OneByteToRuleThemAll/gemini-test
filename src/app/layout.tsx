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
                  } else {
                    document.documentElement.classList.remove('dark');
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
            <div className="layout-wrapper">
              {/* Background elements */}
              <div className="background-gradient"></div>
              <div className="background-pattern"></div>
              
              {/* Navigation */}
              <Navigation />
              
              {/* Main content */}
              <main className="main-content">
                {children}
              </main>
              
              {/* Footer */}
              <footer className="footer">
                <div className="footer-content">
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
