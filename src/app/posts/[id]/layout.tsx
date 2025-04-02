import Link from 'next/link';
import { getPostData } from '../../../lib/posts';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const postData = await getPostData(params.id);
  
  return {
    title: postData.title,
    description: `Read more about ${postData.title}`,
  };
}

export default function PostLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <div className="max-w-prose mx-auto">
      <div className="mb-8">
        <Link href="/" className="text-blue-600 hover:underline flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to blog
        </Link>
      </div>
      {children}
    </div>
  );
}