import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';

export default async function Home() {
  const allPostsData = await getSortedPostsData();
  const featuredPost = allPostsData[0]; // Latest post as featured
  const remainingPosts = allPostsData.slice(1);

  return (
    <main className="max-w-4xl mx-auto px-4">
      <section className="my-8">
        <h1 className="text-4xl font-bold mb-6">Welcome to My Blog</h1>
        <p className="text-xl text-gray-600">
          Exploring modern web development with Next.js, React, and more.
        </p>
      </section>

      {featuredPost && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 border-b pb-2">Featured Post</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <Link href={`/posts/${featuredPost.id}`} className="text-2xl font-bold text-blue-600 hover:underline">
                {featuredPost.title}
              </Link>
              <p className="text-gray-500 mt-2">{featuredPost.date}</p>
              <div className="mt-4 flex justify-end">
                <Link href={`/posts/${featuredPost.id}`} className="text-blue-600 hover:underline">
                  Read more →
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">All Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {remainingPosts.map(({ id, date, title }) => (
            <div key={id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <Link href={`/posts/${id}`} className="text-xl font-medium text-blue-600 hover:underline">
                <h3>{title}</h3>
              </Link>
              <p className="text-gray-500 mt-2">{date}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
