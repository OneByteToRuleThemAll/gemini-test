import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';

export default async function Home() {
  const allPostsData = await getSortedPostsData();
  const featuredPost = allPostsData[0]; // Latest post as featured
  const remainingPosts = allPostsData.slice(1);

  return (
    <main className="max-w-6xl mx-auto px-4">
      {/* Hero Section */}
      <section className="relative mb-16 overflow-hidden rounded-2xl shadow-glamour dark:shadow-glamour-dark">
        <div className="absolute inset-0 bg-glamour-gradient opacity-20 dark:opacity-30 z-0"></div>
        <div className="relative z-10 px-8 py-16 md:py-24 flex flex-col items-center text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-glamour-rose via-glamour-lavender to-primary-500 bg-clip-text text-transparent">
            Welcome to My Glamorous Blog
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 max-w-2xl mb-8 font-serif">
            Exploring modern web development with style, flair, and a touch of glamour.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/tags" 
              className="px-6 py-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-accent dark:text-accent-light font-medium"
            >
              Browse Topics
            </Link>
            <Link 
              href="/about" 
              className="px-6 py-3 bg-glamour-gradient text-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 font-medium"
            >
              About Me
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="mb-16">
          <div className="flex items-center mb-8">
            <h2 className="text-3xl font-display font-bold text-gray-800 dark:text-white">Featured Post</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-glamour-rose to-glamour-lavender ml-4"></div>
          </div>
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-glamour dark:hover:shadow-glamour-dark transition-all duration-300 transform hover:-translate-y-1">
            <div className="p-8">
              <div className="mb-4 flex flex-wrap gap-2">
                {featuredPost.tags?.map((tag) => (
                  <Link 
                    key={tag} 
                    href={`/tags/${encodeURIComponent(tag)}`}
                    className="inline-block px-3 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-dark dark:text-accent-light rounded-full text-xs font-medium"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
              
              <Link href={`/posts/${featuredPost.id}`} className="block group">
                <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4 group-hover:text-glamour-rose dark:group-hover:text-glamour-lavender transition-colors">
                  {featuredPost.title}
                </h3>
                <p className="text-muted mb-4">{featuredPost.date}</p>
                <div className="flex justify-end">
                  <span className="inline-flex items-center text-glamour-rose dark:text-glamour-lavender font-medium group-hover:underline">
                    Read more 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* All Posts Grid */}
      <section className="mb-12">
        <div className="flex items-center mb-8">
          <h2 className="text-3xl font-display font-bold text-gray-800 dark:text-white">Latest Articles</h2>
          <div className="h-px flex-1 bg-gradient-to-r from-glamour-lavender to-primary-500 ml-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {remainingPosts.map(({ id, date, title, tags }) => (
            <div key={id} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-lg overflow-hidden shadow-md hover:shadow-glamour dark:hover:shadow-glamour-dark transition-all duration-300 transform hover:-translate-y-1">
              <div className="p-6">
                <div className="mb-3 flex flex-wrap gap-1">
                  {tags?.map((tag) => (
                    <Link 
                      key={tag} 
                      href={`/tags/${encodeURIComponent(tag)}`}
                      className="inline-block px-2 py-1 bg-accent-100 dark:bg-accent-900/30 text-accent-dark dark:text-accent-light rounded-full text-xs font-medium"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
                
                <Link href={`/posts/${id}`} className="block group">
                  <h3 className="text-xl font-serif font-bold mb-2 group-hover:text-glamour-rose dark:group-hover:text-glamour-lavender transition-colors">
                    {title}
                  </h3>
                  <p className="text-muted mb-4 text-sm">{date}</p>
                  <div className="flex justify-end">
                    <span className="inline-flex items-center text-sm text-glamour-rose dark:text-glamour-lavender font-medium group-hover:underline">
                      Read article
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
