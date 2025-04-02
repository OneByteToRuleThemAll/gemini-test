import { Metadata } from 'next';
import Link from 'next/link';
import { getAllTags, getSortedPostsData } from '../../lib/posts';

export const metadata: Metadata = {
  title: 'Tags - My Next.js Blog',
  description: 'Browse all tags from blog posts',
};

export default async function TagsPage() {
  const tags = await getAllTags();
  const posts = await getSortedPostsData();
  
  // Count how many posts have each tag
  const tagCounts: { [key: string]: number } = {};
  tags.forEach(tag => {
    tagCounts[tag] = posts.filter(post => post.tags?.includes(tag)).length;
  });
  
  return (
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6">Tags</h1>
      
      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {tags.map(tag => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="bg-white px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow text-lg"
            >
              <span className="font-medium text-blue-600">#{tag}</span>
              <span className="ml-2 text-gray-500 text-sm">({tagCounts[tag]} post{tagCounts[tag] !== 1 ? 's' : ''})</span>
            </Link>
          ))}
        </div>
      ) : (
        <p>No tags found.</p>
      )}
    </div>
  );
}