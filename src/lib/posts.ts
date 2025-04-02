import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'content/posts');

// For client components - Query keys
export const queryKeys = {
  posts: {
    all: ['posts'] as const,
    byId: (id: string) => ['posts', id] as const,
    byTag: (tag: string) => ['posts', 'tag', tag] as const,
    tags: ['posts', 'tags'] as const,
  },
};

// Get all post IDs for static generation
export async function getAllPostIds() {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    
    return fileNames.map((fileName) => {
      return {
        id: fileName.replace(/\.md$/, ''),
      };
    });
  } catch (error) {
    console.error('Error getting all post IDs:', error);
    return [];
  }
}

// Utility function to read and parse a post file
export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);
    
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content);
    const contentHtml = processedContent.toString();
    
    return {
      id,
      contentHtml,
      ...matterResult.data,
    } as {
      id: string;
      contentHtml: string;
      title: string;
      date: string;
      tags?: string[];
    };
  } catch (error) {
    console.error(`Error reading post ${id}:`, error);
    return null;
  }
}

// Get all post metadata for listings
export async function getSortedPostsData() {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = await Promise.all(fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      const matterResult = matter(fileContents);
      
      return {
        id,
        ...matterResult.data as { 
          date: string;
          title: string;
          tags?: string[];
        },
      };
    }));
    
    return allPostsData.sort(({ date: a }, { date: b }) => {
      if (a < b) {
        return 1;
      } else {
        return -1;
      }
    });
  } catch (error) {
    console.error('Error getting sorted posts data:', error);
    return [];
  }
}

// Get posts by tag
export async function getPostsByTag(tag: string) {
  const allPosts = await getSortedPostsData();
  return allPosts.filter((post) => 
    post.tags?.some((postTag) => 
      postTag.toLowerCase() === tag.toLowerCase()
    )
  );
}

// Get all unique tags
export async function getAllTags() {
  const allPosts = await getSortedPostsData();
  const tagsSet = new Set<string>();
  
  allPosts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => tagsSet.add(tag.toLowerCase()));
    }
  });
  
  return Array.from(tagsSet);
}
