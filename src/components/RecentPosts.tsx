import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';

export default async function RecentPosts({ count = 3 }: { count?: number }) {
  const allPosts = await getSortedPostsData();
  const recentPosts = allPosts.slice(0, count);
  
  return (
    <div className="recent-posts">
      <h2 className="recent-posts-title">Recent Posts</h2>
      <div className="recent-posts-list">
        {recentPosts.map(({ id, title, date }) => (
          <div key={id} className="recent-post-item">
            <Link href={`/posts/${id}`} className="recent-post-link">
              <h3 className="recent-post-title">{title}</h3>
            </Link>
            <p className="recent-post-date">{date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}