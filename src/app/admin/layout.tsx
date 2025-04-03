import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Dashboard - My Next.js Blog',
  description: 'Manage your blog posts and comments',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      
      <div className="flex flex-col">
        <aside className="mb-4">
          <nav className="card">
            <ul className="py-2">
              <li>
                <Link 
                  href="/admin" 
                  className="button button-secondary"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/posts" 
                  className="button button-secondary"
                >
                  Posts
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/comments" 
                  className="button button-secondary"
                >
                  Comments
                </Link>
              </li>
              <li className="mb-2 mt-2"></li>
              <li>
                <Link 
                  href="/" 
                  className="button button-primary"
                >
                  Return to Blog
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        
        <main>
          <div className="card">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}