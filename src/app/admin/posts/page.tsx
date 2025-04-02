import { Metadata } from 'next';
import { getSortedPostsData, getAllTags } from '../../../lib/posts';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Manage Posts - Admin Dashboard',
  description: 'Manage your blog posts',
};

export default async function PostsPage({
  searchParams,
}: {
  searchParams: { tag?: string };
}) {
  const posts = await getSortedPostsData();
  const allTags = await getAllTags();
  const { tag: selectedTag } = searchParams;
  
  // Filter posts by tag if a tag is selected
  const filteredPosts = selectedTag 
    ? posts.filter(post => post.tags?.includes(selectedTag))
    : posts;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold dark:text-white">All Posts</h2>
        <div>
          <Link 
            href="#"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Post
          </Link>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Filter by tag:</label>
        <div className="flex flex-wrap gap-2">
          <Link 
            href="/admin/posts"
            className={`inline-block px-3 py-1 text-sm rounded-full ${
              !selectedTag 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
            }`}
          >
            All
          </Link>
          {allTags.map(tag => (
            <Link 
              key={tag}
              href={`/admin/posts?tag=${encodeURIComponent(tag)}`}
              className={`inline-block px-3 py-1 text-sm rounded-full ${
                selectedTag === tag 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Title</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Tags</th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredPosts.map((post) => (
              <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">
                  {post.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                  {post.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-300">
                  {post.date}
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {post.tags?.map((tag) => (
                      <span 
                        key={tag} 
                        className="inline-block px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full text-xs text-gray-800 dark:text-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link 
                    href={`/posts/${post.id}`} 
                    className="text-blue-600 dark:text-blue-400 hover:underline mr-4"
                  >
                    View
                  </Link>
                  <Link 
                    href="#" 
                    className="text-indigo-600 dark:text-indigo-400 hover:underline mr-4"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredPosts.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400">
            {selectedTag ? `No posts found with the tag "${selectedTag}".` : 'No posts found.'}
          </p>
        </div>
      )}
    </div>
  );
}