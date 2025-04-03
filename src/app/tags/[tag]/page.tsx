import { Metadata } from 'next';
import Link from 'next/link';
import { getPostsByTag, getAllTags } from '../../../lib/posts';
import { notFound } from 'next/navigation';

interface TagPageProps {
  params: {
    tag: string;
  };
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  return {
    title: `Posts tagged with ${params.tag} - My Next.js Blog`,
    description: `Browse all blog posts tagged with ${params.tag}`,
  };
}

export async function generateStaticParams() {
  const tags = await getAllTags();
  
  return tags.map((tag) => ({
    tag,
  }));
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = params;
  const decodedTag = decodeURIComponent(tag);
  const posts = await getPostsByTag(decodedTag);
  
  if (posts.length === 0) {
    notFound();
  }
  
  return (
    <div className="container" style={{ padding: '0 1.5rem' }}>
      <h1 className="text-3xl font-bold mb-2">Posts tagged with "{decodedTag}"</h1>
      <p className="mb-8" style={{ color: 'var(--muted)' }}>
        {posts.length} post{posts.length > 1 ? 's' : ''}
      </p>
      
      <div className="grid" style={{ gridTemplateColumns: '1fr', gap: '1.5rem' }}>
        {posts.map((post) => (
          <div key={post.id} className="card" style={{ padding: '1.5rem' }}>
            <Link href={`/posts/${post.id}`} style={{ color: 'var(--color-primary)', fontWeight: 500, textDecoration: 'none' }}>
              <h2 className="text-xl">{post.title}</h2>
            </Link>
            <p className="mt-2" style={{ color: 'var(--muted)' }}>{post.date}</p>
            
            <div className="mt-4 flex gap-2" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {post.tags?.map((tag) => (
                <Link 
                  key={tag} 
                  href={`/tags/${encodeURIComponent(tag)}`}
                  style={{ 
                    display: 'inline-block', 
                    padding: '0.25rem 0.5rem', 
                    fontSize: '0.875rem',
                    color: 'var(--muted-foreground)',
                    backgroundColor: 'var(--card-border)',
                    borderRadius: '0.25rem'
                  }}
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8" style={{ paddingBottom: '2rem' }}>
        <Link href="/tags" style={{ color: 'var(--color-primary)' }}>
          ← View all tags
        </Link>
      </div>
    </div>
  );
}