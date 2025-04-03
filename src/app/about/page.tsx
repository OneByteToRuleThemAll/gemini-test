import { Metadata } from 'next';
import RecentPosts from '../../components/RecentPosts';

export const metadata: Metadata = {
  title: 'About - My Next.js Blog',
  description: 'Learn more about the author of this blog',
};

export default function AboutPage() {
  return (
    <div className="container" style={{ padding: '0 1.5rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>About Me</h1>
      
      <div style={{ lineHeight: '1.6', color: 'var(--foreground)' }}>
        <p style={{ marginBottom: '1rem' }}>
          Hi there! I&apos;m a passionate web developer and blogger who loves working with modern JavaScript frameworks, 
          especially Next.js and React.
        </p>
        
        <p style={{ marginBottom: '1rem' }}>
          This blog was built using Next.js App Router, with a focus on Server Components and Server Actions. 
          It demonstrates how to build a simple yet effective blog with:
        </p>
        
        <ul style={{ marginLeft: '1.5rem', marginBottom: '1.5rem', listStyleType: 'disc' }}>
          <li style={{ marginBottom: '0.5rem' }}>Markdown for content management</li>
          <li style={{ marginBottom: '0.5rem' }}>Server Components for improved performance</li>
          <li style={{ marginBottom: '0.5rem' }}>Server Actions for data operations</li>
          <li style={{ marginBottom: '0.5rem' }}>Static Site Generation with dynamic routes</li>
          <li style={{ marginBottom: '0.5rem' }}>Custom CSS for styling (converted from Tailwind)</li>
        </ul>
        
        <p style={{ marginBottom: '1rem' }}>
          Feel free to browse my posts and reach out if you have any questions or suggestions!
        </p>
      </div>
      
      <RecentPosts />
    </div>
  );
}