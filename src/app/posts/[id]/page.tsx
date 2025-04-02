import { getPostData, getAllPostIds } from '../../../lib/posts';
import { notFound } from 'next/navigation';
import { getComments } from '../../../lib/comments';
import CommentForm from '../../../components/CommentForm';

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
    <article className="mx-auto">
      <h1 className="text-3xl font-bold mb-2">{postData.title}</h1>
      <div className="text-gray-500 mb-8">
        {postData.date}
      </div>
      <div className="prose prose-lg prose-blue max-w-none" dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Comments ({comments.length})</h2>
        
        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{comment.name}</h3>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleString()}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}
        
        <CommentForm postId={params.id} />
      </div>
    </article>
  );
}
