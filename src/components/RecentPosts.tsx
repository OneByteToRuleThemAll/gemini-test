import Link from 'next/link';
import { getSortedPostsData } from '../lib/posts';

export default async function RecentPosts({ count = 3 }: { count?: number }) {
  const allPosts = await getSortedPostsData();
  const recentPosts = allPosts.slice(0, count);
  
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
      <div className="space-y-3">
        {recentPosts.map(({ id, title, date }) => (
          <div key={id} className="border-l-4 border-blue-500 pl-4">
            <Link href={`/posts/${id}`} className="text-blue-600 hover:underline">
              <h3 className="font-medium">{title}</h3>
            </Link>
            <p className="text-sm text-gray-500">{date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}