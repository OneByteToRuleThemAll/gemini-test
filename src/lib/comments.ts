'use server';

import fs from 'fs';
import path from 'path';

// This is a simple file-based storage that can be replaced with a database later
const commentsDirectory = path.join(process.cwd(), 'content/comments');

// Ensure the comments directory exists
try {
  if (!fs.existsSync(commentsDirectory)) {
    fs.mkdirSync(commentsDirectory, { recursive: true });
  }
} catch (error) {
  console.error('Failed to create comments directory:', error);
}

export type Comment = {
  id: string;
  postId: string;
  name: string;
  email: string;
  content: string;
  createdAt: string;
};

export async function getComments(postId: string): Promise<Comment[]> {
  const commentsFilePath = path.join(commentsDirectory, `${postId}.json`);
  
  if (!fs.existsSync(commentsFilePath)) {
    return [];
  }
  
  const fileContents = fs.readFileSync(commentsFilePath, 'utf8');
  return JSON.parse(fileContents);
}

export async function addComment(postId: string, name: string, email: string, content: string) {
  const commentsFilePath = path.join(commentsDirectory, `${postId}.json`);
  
  let comments: Comment[] = [];
  if (fs.existsSync(commentsFilePath)) {
    const fileContents = fs.readFileSync(commentsFilePath, 'utf8');
    comments = JSON.parse(fileContents);
  }
  
  const newComment: Comment = {
    id: Date.now().toString(),
    postId,
    name,
    email,
    content,
    createdAt: new Date().toISOString(),
  };
  
  comments.push(newComment);
  
  fs.writeFileSync(commentsFilePath, JSON.stringify(comments, null, 2), 'utf8');
  
  return newComment;
}