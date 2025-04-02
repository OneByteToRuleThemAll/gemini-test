import { getSortedPostsData } from '../../lib/posts';
import { Feed } from 'feed';

export async function GET() {
  const posts = await getSortedPostsData();
  const siteUrl = process.env.SITE_URL || 'http://localhost:3000';
  
  const feed = new Feed({
    title: "My Next.js Blog",
    description: "Exploring modern web development with Next.js, React, and more.",
    id: siteUrl,
    link: siteUrl,
    language: "en",
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    updated: new Date(posts[0]?.date || new Date()),
    author: {
      name: "Blog Author",
      email: "author@example.com",
    }
  });

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: `${siteUrl}/posts/${post.id}`,
      link: `${siteUrl}/posts/${post.id}`,
      date: new Date(post.date),
      description: `Read the full article about ${post.title}`,
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}