import { Metadata } from 'next';
import RecentPosts from '../../components/RecentPosts';

export const metadata: Metadata = {
  title: 'About - My Next.js Blog',
  description: 'Learn more about the author of this blog',
};

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About Me</h1>
      
      <div className="prose prose-lg mb-8">
        <p>
          Hi there! I'm a passionate web developer and blogger who loves working with modern JavaScript frameworks, 
          especially Next.js and React.
        </p>
        
        <p>
          This blog was built using Next.js App Router, with a focus on Server Components and Server Actions. 
          It demonstrates how to build a simple yet effective blog with:
        </p>
        
        <ul>
          <li>Markdown for content management</li>
          <li>Server Components for improved performance</li>
          <li>Server Actions for data operations</li>
          <li>Static Site Generation with dynamic routes</li>
          <li>Tailwind CSS for styling</li>
        </ul>
        
        <p>
          Feel free to browse my posts and reach out if you have any questions or suggestions!
        </p>
      </div>
      
      <RecentPosts />
    </div>
  );
}