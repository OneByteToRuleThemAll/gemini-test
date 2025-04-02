import Link from 'next/link';
import SearchBar from './SearchBar';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-800">
            My Blog
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600">
              About
            </Link>
            <Link href="/rss.xml" className="text-gray-600 hover:text-blue-600 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
              RSS
            </Link>
          </div>
        </div>
        <div className="mt-4">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}