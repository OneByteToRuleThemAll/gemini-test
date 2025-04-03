import Link from 'next/link';
import { getPostData } from '../../../lib/posts';
import { Metadata } from 'next';

export async function generateMetadata({ 
  params 
}: { 
  params: { id: string } 
}): Promise<Metadata> {
  // Properly await the params object before accessing its properties
  const { id } = await params;
  
  // Wait for postData to resolve
  const postData = await getPostData(id);
  
  return {
    title: postData.title,
    description: `Read more about ${postData.title}`,
  };
}

export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-prose mx-auto">
      <div className="mb-8">
        <Link href="/" className="flex items-center" style={{ color: 'var(--color-primary)' }}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            style={{ height: '16px', width: '16px', marginRight: '4px' }} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to blog
        </Link>
      </div>
      {children}
    </div>
  );
}