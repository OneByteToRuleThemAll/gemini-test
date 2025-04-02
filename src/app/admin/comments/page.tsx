import { Metadata } from 'next';
import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';
import { Comment } from '../../../lib/comments';
import { getSortedPostsData } from '../../../lib/posts';

export const metadata: Metadata = {
  title: 'Manage Comments - Admin Dashboard',
  description: 'Manage comments on your blog posts',
};

// Server action for admin to get all comments with post titles
async function getAllComments(): Promise<Array<Comment & { postTitle: string }>> {
  const commentsDir = path.join(process.cwd(), 'content/comments');
  const posts = await getSortedPostsData();
  const postMap = posts.reduce((map, post) => {
    map[post.id] = post.title;
    return map;
  }, {} as Record<string, string>);
  
  let allComments: Array<Comment & { postTitle: string }> = [];
  
  try {
    // Check if directory exists before reading
    await fs.access(commentsDir);
    const commentFiles = await fs.readdir(commentsDir);
    
    for (const file of commentFiles) {
      if (file.endsWith('.json')) {
        const fileContent = await fs.readFile(path.join(commentsDir, file), 'utf8');
        const comments = JSON.parse(fileContent);
        const postId = file.replace('.json', '');
        
        // Add post title to each comment
        const commentsWithTitle = comments.map((comment: Comment) => ({
          ...comment,
          postTitle: postMap[postId] || 'Unknown Post'
        }));
        
        allComments = [...allComments, ...commentsWithTitle];
      }
    }
    
    // Sort by date, newest first
    allComments.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    
  } catch (error) {
    console.error('Error getting comments:', error);
  }
  
  return allComments;
}

export default async function CommentsPage({
  searchParams,
}: {
  searchParams: { postId?: string };
}) {
  const allComments = await getAllComments();
  const { postId } = searchParams;
  
  // Get unique post IDs from comments for filtering
  const uniquePostIds = Array.from(
    new Set(allComments.map(comment => comment.postId))
  );
  
  // Filter comments by postId if selected
  const filteredComments = postId
    ? allComments.filter(comment => comment.postId === postId)
    : allComments;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 dark:text-white">All Comments</h2>
      
      {uniquePostIds.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filter by post:
          </label>
          <div className="flex flex-wrap gap-2">
            <Link 
              href="/admin/comments"
              className={`inline-block px-3 py-1 text-sm rounded-md ${
                !postId 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
              }`}
            >
              All Posts
            </Link>
            {uniquePostIds.map(id => {
              const post = allComments.find(comment => comment.postId === id);
              return (
                <Link 
                  key={id}
                  href={`/admin/comments?postId=${encodeURIComponent(id)}`}
                  className={`inline-block px-3 py-1 text-sm rounded-md truncate max-w-xs ${
                    postId === id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                  }`}
                >
                  {post?.postTitle || id}
                </Link>
              );
            })}
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {filteredComments.length > 0 ? (
          filteredComments.map(comment => (
            <div 
              key={comment.id} 
              className="bg-white dark:bg-gray-750 border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium dark:text-white">{comment.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{comment.email}</p>
                </div>
                <div className="text-right">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
              
              <p className="mt-2 text-gray-700 dark:text-gray-300">{comment.content}</p>
              
              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <Link 
                  href={`/posts/${comment.postId}`} 
                  className="text-blue-600 dark:text-blue-400 text-sm hover:underline"
                >
                  {comment.postTitle}
                </Link>
                
                <div className="space-x-2">
                  <button className="text-red-600 dark:text-red-400 text-sm hover:underline">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500 dark:text-gray-400">
              {postId ? `No comments found for this post.` : 'No comments found.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}