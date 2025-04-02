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
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Admin Dashboard</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="md:w-64 flex-shrink-0">
          <nav className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/admin" 
                  className="block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/posts" 
                  className="block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                >
                  Posts
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/comments" 
                  className="block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                >
                  Comments
                </Link>
              </li>
              <li className="border-t my-2 dark:border-gray-700"></li>
              <li>
                <Link 
                  href="/" 
                  className="block p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200"
                >
                  Return to Blog
                </Link>
              </li>
            </ul>
          </nav>
        </aside>
        
        <main className="flex-1">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}