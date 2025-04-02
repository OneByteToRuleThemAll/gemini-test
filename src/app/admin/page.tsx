import { getSortedPostsData } from '../../lib/posts';
import Link from 'next/link';
import { getAllTags } from '../../lib/posts';
import { promises as fs } from 'fs';
import path from 'path';

export default async function AdminDashboard() {
  const posts = await getSortedPostsData();
  const tags = await getAllTags();
  
  // Get a count of all comments by reading the comments directory
  const commentsDir = path.join(process.cwd(), 'content/comments');
  let totalComments = 0;
  
  try {
    // Check if directory exists before reading
    await fs.access(commentsDir);
    const commentFiles = await fs.readdir(commentsDir);
    
    // Count comments in each file
    for (const file of commentFiles) {
      if (file.endsWith('.json')) {
        const fileContent = await fs.readFile(path.join(commentsDir, file), 'utf8');
        const comments = JSON.parse(fileContent);
        totalComments += comments.length;
      }
    }
  } catch (error) {
    console.error('Error counting comments:', error);
    // If directory doesn't exist or any other error, just leave total as 0
  }
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 dark:text-white">Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 dark:bg-blue-900/30 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300 mb-2">Total Posts</h3>
          <p className="text-3xl font-bold text-blue-800 dark:text-blue-200">{posts.length}</p>
          <div className="mt-4">
            <Link 
              href="/admin/posts" 
              className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
            >
              View all posts →
            </Link>
          </div>
        </div>
        
        <div className="bg-green-50 dark:bg-green-900/30 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-green-700 dark:text-green-300 mb-2">Total Comments</h3>
          <p className="text-3xl font-bold text-green-800 dark:text-green-200">{totalComments}</p>
          <div className="mt-4">
            <Link 
              href="/admin/comments" 
              className="text-green-600 dark:text-green-400 hover:underline text-sm"
            >
              View all comments →
            </Link>
          </div>
        </div>
        
        <div className="bg-purple-50 dark:bg-purple-900/30 p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-purple-700 dark:text-purple-300 mb-2">Total Tags</h3>
          <p className="text-3xl font-bold text-purple-800 dark:text-purple-200">{tags.length}</p>
          <div className="mt-4">
            <Link 
              href="/tags" 
              className="text-purple-600 dark:text-purple-400 hover:underline text-sm"
            >
              View all tags →
            </Link>
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-bold mb-4 dark:text-white">Recent Posts</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tags</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {posts.slice(0, 5).map((post) => (
              <tr key={post.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{post.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{post.date}</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                  <div className="flex flex-wrap gap-1">
                    {post.tags?.map((tag) => (
                      <span key={tag} className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link href={`/posts/${post.id}`} className="text-blue-600 dark:text-blue-400 hover:underline">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}