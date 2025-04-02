import { Metadata } from 'next';
import Link from 'next/link';
import { searchPosts } from '../../lib/posts';
import SearchBar from '../../components/SearchBar';

export const metadata: Metadata = {
  title: 'Search - My Next.js Blog',
  description: 'Search for blog posts',
};

export default async function SearchPage({ 
  searchParams 
}: { 
  searchParams: { q?: string } 
}) {
  const query = searchParams.q || '';
  const searchResults = await searchPosts(query);
  
  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>
      
      <div className="mb-8">
        <SearchBar />
      </div>
      
      {query ? (
        <>
          <p className="mb-4 text-gray-600">
            {searchResults.length === 0 
              ? 'No posts found.' 
              : `Found ${searchResults.length} post${searchResults.length === 1 ? '' : 's'} matching "${query}"`}
          </p>
          
          <div className="space-y-6">
            {searchResults.map((post) => (
              <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
                <Link href={`/posts/${post.id}`} className="text-xl font-medium text-blue-600 hover:underline">
                  <h2>{post.title}</h2>
                </Link>
                <p className="text-gray-500 mt-2">{post.date}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>Enter a search term above to find posts.</p>
      )}
    </div>
  );
}