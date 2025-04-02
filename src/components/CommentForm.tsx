'use client';

import { useState } from 'react';
import { submitComment } from '../lib/actions';

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
    <div className="rounded-xl overflow-hidden">
      <h3 className="text-xl font-serif font-bold mb-6 bg-gradient-to-r from-glamour-rose to-glamour-lavender bg-clip-text text-transparent inline-block">
        Share Your Thoughts
      </h3>
      
      {formStatus === 'success' && (
        <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-l-4 border-green-500 text-green-700 dark:text-green-300 rounded-lg animate-pulse">
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <p>Your comment has been submitted successfully!</p>
          </div>
        </div>
      )}
      
      {formStatus === 'error' && (
        <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 border-l-4 border-red-500 text-red-700 dark:text-red-300 rounded-lg">
          <div className="flex items-center">
            <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p>{error || 'An error occurred. Please try again.'}</p>
          </div>
        </div>
      )}
      
      <form action={handleSubmit} id="comment-form" className="space-y-6">
        <input type="hidden" name="postId" value={postId} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative group">
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder=" "
              className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-accent-400 dark:focus:border-accent-500 transition-all duration-200 peer dark:text-white"
              disabled={formStatus === 'submitting'}
            />
            <label 
              htmlFor="name" 
              className="absolute left-4 -top-3 bg-white dark:bg-gray-800 px-2 text-xs font-medium text-accent-600 dark:text-accent-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-accent-600 dark:peer-focus:text-accent-400"
            >
              Your Name
            </label>
          </div>
          
          <div className="relative group">
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder=" "
              className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-accent-400 dark:focus:border-accent-500 transition-all duration-200 peer dark:text-white"
              disabled={formStatus === 'submitting'}
            />
            <label 
              htmlFor="email" 
              className="absolute left-4 -top-3 bg-white dark:bg-gray-800 px-2 text-xs font-medium text-accent-600 dark:text-accent-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-accent-600 dark:peer-focus:text-accent-400"
            >
              Email Address
            </label>
          </div>
        </div>
        
        <div className="relative group">
          <textarea
            id="content"
            name="content"
            required
            placeholder=" "
            rows={4}
            className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:border-accent-400 dark:focus:border-accent-500 transition-all duration-200 peer dark:text-white resize-none"
            disabled={formStatus === 'submitting'}
          ></textarea>
          <label 
            htmlFor="content" 
            className="absolute left-4 -top-3 bg-white dark:bg-gray-800 px-2 text-xs font-medium text-accent-600 dark:text-accent-400 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-3 peer-focus:text-xs peer-focus:text-accent-600 dark:peer-focus:text-accent-400"
          >
            Your Comment
          </label>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={formStatus === 'submitting'}
            className="relative px-6 py-3 overflow-hidden group rounded-lg"
          >
            <span className="absolute inset-0 bg-glamour-gradient transition-all duration-300 group-hover:scale-105 opacity-80"></span>
            <span className="relative text-white font-medium flex items-center">
              {formStatus === 'submitting' ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Post Comment
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}