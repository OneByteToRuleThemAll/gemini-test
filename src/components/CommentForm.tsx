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
    <div className="comment-form-container">
      <h3 className="comment-form-title text-gradient">
        Share Your Thoughts
      </h3>
      
      {formStatus === 'success' && (
        <div className="alert alert-success">
          <div className="alert-content">
            <svg className="alert-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <p>Your comment has been submitted successfully!</p>
          </div>
        </div>
      )}
      
      {formStatus === 'error' && (
        <div className="alert alert-error">
          <div className="alert-content">
            <svg className="alert-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <p>{error || 'An error occurred. Please try again.'}</p>
          </div>
        </div>
      )}
      
      <form action={handleSubmit} id="comment-form" className="comment-form">
        <input type="hidden" name="postId" value={postId} />
        
        <div className="form-row">
          <div className="form-group">
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder=" "
              className="form-input"
              disabled={formStatus === 'submitting'}
            />
            <label htmlFor="name" className="form-label">
              Your Name
            </label>
          </div>
          
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder=" "
              className="form-input"
              disabled={formStatus === 'submitting'}
            />
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
          </div>
        </div>
        
        <div className="form-group">
          <textarea
            id="content"
            name="content"
            required
            placeholder=" "
            rows={4}
            className="form-textarea"
            disabled={formStatus === 'submitting'}
          ></textarea>
          <label htmlFor="content" className="form-label">
            Your Comment
          </label>
        </div>
        
        <div className="form-submit">
          <button
            type="submit"
            disabled={formStatus === 'submitting'}
            className="submit-button"
          >
            <span className="button-bg"></span>
            <span className="button-content">
              {formStatus === 'submitting' ? (
                <>
                  <svg className="spinner" fill="none" viewBox="0 0 24 24">
                    <circle className="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  Post Comment
                  <svg xmlns="http://www.w3.org/2000/svg" className="button-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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