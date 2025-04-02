'use server';

import { addComment } from './comments';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

// Install zod for validation
// npm install zod

const CommentSchema = z.object({
  postId: z.string().min(1, "Post ID is required"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  content: z.string().min(3, "Comment must be at least 3 characters").max(1000, "Comment is too long"),
});

export async function submitComment(formData: FormData) {
  // Extract form data
  const rawData = {
    postId: formData.get('postId'),
    name: formData.get('name'),
    email: formData.get('email'),
    content: formData.get('content'),
  };
  
  // Convert FormData values to strings for validation
  const data = {
    postId: String(rawData.postId || ''),
    name: String(rawData.name || ''),
    email: String(rawData.email || ''),
    content: String(rawData.content || ''),
  };
  
  // Validate the data
  const validationResult = CommentSchema.safeParse(data);
  
  if (!validationResult.success) {
    const errorMessage = validationResult.error.issues
      .map(issue => issue.message)
      .join(', ');
    
    throw new Error(errorMessage);
  }
  
  // Add the comment to storage
  await addComment(
    data.postId,
    data.name,
    data.email,
    data.content
  );
  
  // Revalidate the post page to show the new comment
  revalidatePath(`/posts/${data.postId}`);
}