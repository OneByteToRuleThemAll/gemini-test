import { Metadata } from 'next';
import Link from 'next/link';
import { getSortedPostsData } from '../../../lib/posts';

export const metadata: Metadata = {
  title: 'Manage Posts - Admin Dashboard',
  description: 'Manage your blog posts',
};

export default async function PostsPage() {
  const allPostsData = await getSortedPostsData();

  return (
    <div className="admin-container">
      <div className="posts-header">
        <h2 className="section-title">All Posts</h2>
        <button className="create-button">Create New Post</button>
      </div>

      <div className="posts-list">
        {allPostsData.map(({ id, date, title, tags }) => (
          <div key={id} className="post-card">
            <h3 className="post-title">{title}</h3>
            <div className="post-meta">
              <time className="post-date">{new Date(date).toLocaleDateString()}</time>
              <span className="post-id">{id}</span>
            </div>
            <div className="post-tags">
              {tags && tags.map(tag => (
                <span key={tag} className="post-tag">{tag}</span>
              ))}
            </div>
            <div className="post-actions">
              <Link href={`/posts/${id}`} className="post-view-link">
                View
              </Link>
              <button className="post-edit-button">
                Edit
              </button>
              <button className="post-delete-button">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}