import { getSortedPostsData } from '../lib/posts';
import Link from 'next/link';

export default async function Home() {
  const allPostsData = await getSortedPostsData();
  const featuredPost = allPostsData[0]; // Latest post as featured
  const remainingPosts = allPostsData.slice(1);

  return (
    <main className="container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="hero-content">
          <h1 className="text-gradient">
            Welcome to My Glamorous Blog
          </h1>
          <p className="hero-subtitle font-serif">
            Exploring modern web development with style, flair, and a touch of glamour.
          </p>
          <div className="hero-buttons">
            <Link href="/tags" className="button button-secondary">
              Browse Topics
            </Link>
            <Link href="/about" className="button button-primary">
              About Me
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="mb-8">
          <div className="section-header">
            <h2 className="font-serif">Featured Post</h2>
            <div className="section-divider"></div>
          </div>
          <div className="card featured-card">
            <div className="card-content">
              <div className="tag-container">
                {featuredPost.tags?.map((tag) => (
                  <Link 
                    key={tag} 
                    href={`/tags/${encodeURIComponent(tag)}`}
                    className="tag"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
              
              <Link href={`/posts/${featuredPost.id}`} className="post-link">
                <h3 className="post-title font-serif">
                  {featuredPost.title}
                </h3>
                <p className="post-date text-muted">{featuredPost.date}</p>
                <div className="read-more">
                  <span className="read-more-text">
                    Read more 
                    <svg xmlns="http://www.w3.org/2000/svg" style={{height: '1rem', width: '1rem', marginLeft: '0.25rem'}} fill="none" viewBox="0 0 24 24" stroke="currentColor" className="read-more-icon">
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
      <section className="mb-8">
        <div className="section-header">
          <h2 className="font-serif">Latest Articles</h2>
          <div className="section-divider reverse"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {remainingPosts.map(({ id, date, title, tags }) => (
            <div key={id} className="card">
              <div className="card-content">
                <div className="tag-container">
                  {tags?.map((tag) => (
                    <Link 
                      key={tag} 
                      href={`/tags/${encodeURIComponent(tag)}`}
                      className="tag"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
                
                <Link href={`/posts/${id}`} className="post-link">
                  <h3 className="post-title font-serif text-lg">
                    {title}
                  </h3>
                  <p className="post-date text-muted text-sm">{date}</p>
                  <div className="read-more">
                    <span className="read-more-text text-sm">
                      Read article
                      <svg xmlns="http://www.w3.org/2000/svg" style={{height: '0.75rem', width: '0.75rem', marginLeft: '0.25rem'}} fill="none" viewBox="0 0 24 24" stroke="currentColor" className="read-more-icon">
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
