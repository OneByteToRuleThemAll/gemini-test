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
    <div className="admin-container">
      <h2 className="section-title">Overview</h2>
      
      <div className="stats-grid">
        <div className="stat-card stat-card-blue">
          <h3 className="stat-title">Total Posts</h3>
          <p className="stat-value">{posts.length}</p>
          <div className="stat-action">
            <Link href="/admin/posts" className="stat-link stat-link-blue">
              View all posts →
            </Link>
          </div>
        </div>
        
        <div className="stat-card stat-card-green">
          <h3 className="stat-title">Total Comments</h3>
          <p className="stat-value">{totalComments}</p>
          <div className="stat-action">
            <Link href="/admin/comments" className="stat-link stat-link-green">
              View all comments →
            </Link>
          </div>
        </div>
        
        <div className="stat-card stat-card-purple">
          <h3 className="stat-title">Total Tags</h3>
          <p className="stat-value">{tags.length}</p>
          <div className="stat-action">
            <Link href="/tags" className="stat-link stat-link-purple">
              View all tags →
            </Link>
          </div>
        </div>
      </div>
      
      <h3 className="subsection-title">Recent Posts</h3>
      <div className="table-container">
        <table className="data-table">
          <thead className="data-table-head">
            <tr>
              <th className="data-table-header">Title</th>
              <th className="data-table-header">Date</th>
              <th className="data-table-header">Tags</th>
              <th className="data-table-header data-table-header-actions">Actions</th>
            </tr>
          </thead>
          <tbody className="data-table-body">
            {posts.slice(0, 5).map((post) => (
              <tr key={post.id} className="data-table-row">
                <td className="data-table-cell data-table-cell-title">{post.title}</td>
                <td className="data-table-cell">{post.date}</td>
                <td className="data-table-cell">
                  <div className="tags-container">
                    {post.tags?.map((tag) => (
                      <span key={tag} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="data-table-cell data-table-cell-actions">
                  <Link href={`/posts/${post.id}`} className="action-link">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}