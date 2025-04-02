'use client';

import { useState } from 'react';
import { submitComment } from '@/lib/actions';

export default function CommentForm({ postId }: { postId: string }) {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    setFormStatus('submitting');
    setError(null);
    
    try {
      await submitComment(formData);
      setFormStatus('success');
      
      // Reset the form
      const form = document.getElementById('comment-form') as HTMLFormElement;
      form.reset();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    } catch (e) {
      setFormStatus('error');
      setError(e instanceof Error ? e.message : 'Something went wrong');
    }
  }

  return (
    <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Leave a Comment</h3>
      
      {formStatus === 'success' && (
        <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
          Your comment has been submitted successfully!
        </div>
      )}
      
      {formStatus === 'error' && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error || 'An error occurred. Please try again.'}
        </div>
      )}
      
      <form action={handleSubmit} id="comment-form" className="space-y-4">
        <input type="hidden" name="postId" value={postId} />
        
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-3 py-2 border rounded-md"
            disabled={formStatus === 'submitting'}
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2 border rounded-md"
            disabled={formStatus === 'submitting'}
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Comment
          </label>
          <textarea
            id="content"
            name="content"
            required
            rows={4}
            className="w-full px-3 py-2 border rounded-md"
            disabled={formStatus === 'submitting'}
          ></textarea>
        </div>
        
        <button
          type="submit"
          disabled={formStatus === 'submitting'}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300"
        >
          {formStatus === 'submitting' ? 'Submitting...' : 'Submit Comment'}
        </button>
      </form>
    </div>
  );
}