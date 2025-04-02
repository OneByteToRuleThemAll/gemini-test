import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/posts');

// Query keys for React Query
export const queryKeys = {
  posts: {
    all: ['posts'] as const,
    byId: (id: string) => ['posts', id] as const,
    byTag: (tag: string) => ['posts', 'tag', tag] as const,
    tags: ['posts', 'tags'] as const,
  },
};

export interface PostMetadata {
  id: string;
  title: string;
  date: string;
  tags?: string[];
}

export interface Post extends PostMetadata {
  contentHtml: string;
}

export function getSortedPostsData(): PostMetadata[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      tags: matterResult.data.tags || [],
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getPostData(id: string): Promise<Post> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    title: matterResult.data.title,
    date: matterResult.data.date,
    tags: matterResult.data.tags || [],
  };
}

export async function getPostsByTag(tag: string): Promise<PostMetadata[]> {
  const allPosts = getSortedPostsData();
  return allPosts.filter(post => 
    post.tags && post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}

export async function getAllTags(): Promise<string[]> {
  const posts = getSortedPostsData();
  const tagsSet = new Set<string>();
  
  posts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => tagsSet.add(tag));
    }
  });
  
  return Array.from(tagsSet);
}

// Function to get recent posts
export async function getRecentPosts(count: number = 5): Promise<PostMetadata[]> {
  const allPosts = getSortedPostsData();
  return allPosts.slice(0, count);
}

// Function to search posts by query
export async function searchPosts(query: string): Promise<PostMetadata[]> {
  const allPosts = getSortedPostsData();
  const searchLower = query.toLowerCase();
  
  return allPosts.filter(post => 
    post.title.toLowerCase().includes(searchLower) || 
    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchLower)))
  );
}
