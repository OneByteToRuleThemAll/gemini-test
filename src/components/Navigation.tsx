import Link from 'next/link';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  return (
    <nav className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg dark:shadow-glamour-dark border-b border-glamour-silver/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif font-bold relative group">
            <span className="bg-glamour-gradient bg-clip-text text-transparent">My Glam Blog</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-glamour-gradient transition-all duration-300 group-hover:w-full"></span>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex space-x-6">
              <Link href="/" className="font-medium text-gray-700 hover:text-glamour-rose dark:text-gray-300 dark:hover:text-glamour-lavender transition-colors">
                Home
              </Link>
              <Link href="/tags" className="font-medium text-gray-700 hover:text-glamour-rose dark:text-gray-300 dark:hover:text-glamour-lavender transition-colors">
                Tags
              </Link>
              <Link href="/about" className="font-medium text-gray-700 hover:text-glamour-rose dark:text-gray-300 dark:hover:text-glamour-lavender transition-colors">
                About
              </Link>
              <Link href="/admin" className="font-medium text-gray-700 hover:text-glamour-rose dark:text-gray-300 dark:hover:text-glamour-lavender transition-colors">
                Admin
              </Link>
              <Link href="/rss.xml" className="font-medium text-gray-700 hover:text-glamour-rose dark:text-gray-300 dark:hover:text-glamour-lavender transition-colors flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
                RSS
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
        <div className="mt-4">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}