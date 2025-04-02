'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    
    if (trimmedQuery) {
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md mx-auto relative group">
      <input
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-accent-400 dark:focus:ring-accent-600 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-gray-200 dark:border-gray-600 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-300 shadow-sm transition-all duration-300 group-hover:shadow-md"
      />
      <button
        type="submit"
        className="absolute right-1 top-1 bottom-1 px-5 font-semibold rounded-full transition-all duration-200 flex items-center text-accent-dark dark:text-accent-light"
      >
        <span className="hidden md:block">Search</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  );
}