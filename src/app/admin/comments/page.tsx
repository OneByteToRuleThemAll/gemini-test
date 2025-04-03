import { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { getComments, Comment } from '../../../lib/comments';

export const metadata: Metadata = {
  title: 'Manage Comments - Admin Dashboard',
  description: 'Review and moderate user comments',
};

export default async function CommentsPage() {
  // Get all comment files, then merge all comments
  const commentsDirectory = path.join(process.cwd(), 'content/comments');
  const fileNames = fs.readdirSync(commentsDirectory);
  
  let allComments: Comment[] = [];
  
  for (const fileName of fileNames) {
    if (fileName.endsWith('.json')) {
      const postId = fileName.replace(/\.json$/, '');
      const postComments = await getComments(postId);
      allComments = [...allComments, ...postComments];
    }
  }

  return (
    <div className="admin-container">
      <h2 className="section-title">Comment Moderation</h2>

      <div className="comments-list">
        {allComments.map((comment) => (
          <div key={comment.id} className="comment-card">
            <div className="comment-header">
              <span className="comment-author">{comment.name}</span>
              <span className="comment-date">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="comment-content">{comment.content}</p>
            <div className="comment-meta">
              <span className="comment-post-id">Post: {comment.postId}</span>
            </div>
            <div className="comment-actions">
              <button className="approve-button">
                Approve
              </button>
              <button className="reject-button">
                Reject
              </button>
              <button className="delete-button">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}