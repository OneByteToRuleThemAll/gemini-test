'use client';

import { useQuery } from '@tanstack/react-query';
import { 
  getAllTags,
  getPostData, 
  getPostsByTag, 
  getRecentPosts, 
  getSortedPostsData, 
  queryKeys, 
  searchPosts 
} from './posts';

// Hook to get all posts
export function usePosts() {
  return useQuery({
    queryKey: queryKeys.posts.all,
    queryFn: () => getSortedPostsData(),
  });
}

// Hook to get a single post by ID
export function usePost(id: string) {
  return useQuery({
    queryKey: queryKeys.posts.byId(id),
    queryFn: () => getPostData(id),
  });
}

// Hook to get posts by tag
export function usePostsByTag(tag: string) {
  return useQuery({
    queryKey: queryKeys.posts.byTag(tag),
    queryFn: () => getPostsByTag(tag),
    enabled: !!tag,
  });
}

// Hook to get all tags
export function useTags() {
  return useQuery({
    queryKey: queryKeys.posts.tags,
    queryFn: () => getAllTags(),
  });
}

// Hook to get recent posts
export function useRecentPosts(count: number = 5) {
  return useQuery({
    queryKey: [...queryKeys.posts.all, 'recent', count],
    queryFn: () => getRecentPosts(count),
  });
}

// Hook to search posts
export function useSearchPosts(query: string) {
  return useQuery({
    queryKey: [...queryKeys.posts.all, 'search', query],
    queryFn: () => searchPosts(query),
    enabled: query.length > 0,
  });
}