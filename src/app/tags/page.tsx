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
    <div className="container">
      <h1 className="text-2xl font-bold mb-4">Tags</h1>
      
      {tags.length > 0 ? (
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
          {tags.map(tag => (
            <Link
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              className="card"
              style={{ padding: '1rem', textDecoration: 'none' }}
            >
              <span style={{ fontWeight: 500, color: 'var(--color-primary)' }}>#{tag}</span>
              <span style={{ marginLeft: '0.5rem', color: 'var(--muted)' }}>
                ({tagCounts[tag]} post{tagCounts[tag] !== 1 ? 's' : ''})
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p>No tags found.</p>
      )}
    </div>
  );
}