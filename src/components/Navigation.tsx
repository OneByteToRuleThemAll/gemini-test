import Link from 'next/link';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  return (
    <nav className="site-navigation">
      <div className="container">
        <div className="navigation-top">
          <Link href="/" className="site-logo">
            <span className="text-gradient">My Glam Blog</span>
            <span className="logo-underline"></span>
          </Link>
          <div className="navigation-right">
            <div className="nav-links">
              <Link href="/" className="font-medium">
                Home
              </Link>
              <Link href="/tags" className="font-medium">
                Tags
              </Link>
              <Link href="/about" className="font-medium">
                About
              </Link>
              <Link href="/admin" className="font-medium">
                Admin
              </Link>
              <Link href="/rss.xml" className="font-medium rss-link">
                <svg xmlns="http://www.w3.org/2000/svg" className="rss-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
                RSS
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
        <div className="navigation-bottom">
          <SearchBar />
        </div>
      </div>
    </nav>
  );
}