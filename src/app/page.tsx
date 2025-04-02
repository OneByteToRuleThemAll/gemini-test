import { getSortedPostsData } from '../lib/posts';

export default async function Home() {
  const allPostsData = await getSortedPostsData();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Blog</h2>
        <ul>
          {allPostsData.map(({ id, date, title }) => (
            <li key={id} className="mb-2">
              {title}
              <br />
              <small className="text-gray-500">
                {date}
              </small>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
