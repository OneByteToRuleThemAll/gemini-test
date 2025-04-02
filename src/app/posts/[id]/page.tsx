import { getPostData, getAllPostIds } from '../../../lib/posts';
import { notFound } from 'next/navigation';
import { getComments } from '../../../lib/comments';
import CommentForm from '../../../components/CommentForm';
import Link from 'next/link';

export async function generateStaticParams() {
  const paths = await getAllPostIds();
  return paths;
}

export default async function Post({ params }: { params: { id: string } }) {
  const postData = await getPostData(params.id);
  const comments = await getComments(params.id);

  if (!postData) {
    notFound();
  }

  return (
    <article className="max-w-4xl mx-auto">
      {/* Post Header */}
      <div className="relative overflow-hidden rounded-2xl mb-8">
        <div className="absolute inset-0 bg-glamour-gradient opacity-10 dark:opacity-20 z-0"></div>
        <div className="relative z-10 px-6 py-12 text-center">
          <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 bg-gradient-to-r from-glamour-rose via-accent-600 to-primary-500 bg-clip-text text-transparent">
            {postData.title}
          </h1>
          <div className="text-gray-500 dark:text-gray-400 font-medium mb-6 italic">
            Published on {new Date(postData.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          
          {/* Display tags if they exist */}
          {postData.tags && postData.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {postData.tags.map(tag => (
                <Link 
                  key={tag} 
                  href={`/tags/${encodeURIComponent(tag)}`}
                  className="inline-block px-4 py-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm text-accent-600 dark:text-accent-300 rounded-full text-sm font-medium border border-accent-200 dark:border-accent-800 hover:bg-accent-50 dark:hover:bg-accent-900/30 transition-all duration-200"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-10 mb-12">
        <div className="prose lg:prose-xl prose-glamour dark:prose-invert max-w-none">
          <style jsx global>{`
            .prose-glamour h2 {
              color: rgb(192, 38, 211);
              font-family: var(--font-playfair);
            }
            .prose-glamour h3 {
              color: rgb(14, 165, 233);
              font-family: var(--font-playfair);
            }
            .prose-glamour a {
              color: rgb(255, 0, 127);
              text-decoration: none;
              font-weight: 500;
            }
            .prose-glamour a:hover {
              text-decoration: underline;
            }
            .prose-glamour code {
              background-color: rgba(255, 0, 127, 0.1);
              color: rgb(255, 0, 127);
              padding: 0.2em 0.4em;
              border-radius: 0.25em;
              font-weight: 500;
            }
            .prose-glamour blockquote {
              border-left-color: rgb(181, 126, 220);
              background-color: rgba(181, 126, 220, 0.1);
              padding: 1em;
              border-radius: 0.5em;
              font-style: italic;
            }
            .dark .prose-glamour h2 {
              color: rgb(216, 180, 254);
            }
            .dark .prose-glamour h3 {
              color: rgb(56, 189, 248);
            }
            .dark .prose-glamour a {
              color: rgb(240, 171, 252);
            }
            .dark .prose-glamour code {
              background-color: rgba(240, 171, 252, 0.1);
              color: rgb(240, 171, 252);
            }
            .dark .prose-glamour blockquote {
              border-left-color: rgb(192, 38, 211);
              background-color: rgba(192, 38, 211, 0.1);
            }
          `}</style>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </div>
      </div>
      
      {/* Comments Section */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-10">
        <h2 className="text-2xl font-display font-bold mb-8 relative pb-2 inline-block">
          <span className="relative z-10">Comments ({comments.length})</span>
          <span className="absolute bottom-0 left-0 h-1 w-full bg-glamour-gradient"></span>
        </h2>
        
        {comments.length > 0 ? (
          <div className="space-y-6 mb-10">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white dark:bg-gray-750 rounded-xl p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-glamour-rose to-glamour-lavender flex items-center justify-center text-white font-bold text-lg">
                      {comment.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium dark:text-white">{comment.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{comment.email}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400 mb-8 italic text-center">
            No comments yet. Be the first to share your thoughts!
          </p>
        )}
        
        <CommentForm postId={params.id} />
      </div>
    </article>
  );
}
