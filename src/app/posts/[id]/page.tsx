import { getPostData, getAllPostIds } from '../../../lib/posts';
import { notFound } from 'next/navigation';
import { getComments } from '../../../lib/comments';
import CommentForm from '../../../components/CommentForm';
import PostContent from '../../../components/PostContent';
import Link from 'next/link';

export async function generateStaticParams() {
  const paths = await getAllPostIds();
  return paths;
}

export default async function Post({ params }: { params: { id: string } }) {
  // Extract the id parameter before using it
  const id = params?.id;
  const postData = await getPostData(id);
  const comments = await getComments(id);

  if (!postData) {
    notFound();
  }

  return (
    <article className="post-article">
      {/* Post Header */}
      <div className="post-header">
        <div className="post-header-bg"></div>
        <div className="post-header-content">
          <h1 className="text-gradient">
            {postData.title}
          </h1>
          <div className="post-date">
            Published on {new Date(postData.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
          
          {/* Display tags if they exist */}
          {postData.tags && postData.tags.length > 0 && (
            <div className="post-tags">
              {postData.tags.map(tag => (
                <Link 
                  key={tag} 
                  href={`/tags/${encodeURIComponent(tag)}`}
                  className="post-tag"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="post-content-container">
        <PostContent contentHtml={postData.contentHtml} />
      </div>
      
      {/* Comments Section */}
      <div className="comments-section">
        <h2 className="comments-title">
          <span>Comments ({comments.length})</span>
          <span className="comments-title-line"></span>
        </h2>
        
        {comments.length > 0 ? (
          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-header">
                  <div className="comment-user">
                    <div className="comment-avatar">
                      {comment.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="comment-user-info">
                      <h3 className="comment-user-name">{comment.name}</h3>
                      <p className="comment-user-email">{comment.email}</p>
                    </div>
                  </div>
                  <span className="comment-date">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="comment-content">{comment.content}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-comments">
            No comments yet. Be the first to share your thoughts!
          </p>
        )}
        
        <CommentForm postId={id} />
      </div>
    </article>
  );
}
