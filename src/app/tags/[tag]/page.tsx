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
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-2">Posts tagged with "{decodedTag}"</h1>
      <p className="text-gray-600 mb-8">
        {posts.length} post{posts.length > 1 ? 's' : ''}
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <Link href={`/posts/${post.id}`} className="text-xl font-medium text-blue-600 hover:underline">
              <h2>{post.title}</h2>
            </Link>
            <p className="text-gray-500 mt-2">{post.date}</p>
            
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags?.map((tag) => (
                <Link 
                  key={tag} 
                  href={`/tags/${encodeURIComponent(tag)}`}
                  className="inline-block bg-gray-100 px-2 py-1 text-sm text-gray-700 rounded hover:bg-gray-200"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8">
        <Link href="/tags" className="text-blue-600 hover:underline">
          ← View all tags
        </Link>
      </div>
    </div>
  );
}