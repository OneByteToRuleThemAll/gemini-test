'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const hydrationErrorLogged = useRef(false);
  
  // Handle theme initialization on client side only
  useEffect(() => {
    try {
      setMounted(true);
      
      // Check if user has a theme preference in localStorage
      const storedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      const isDarkMode = storedTheme === 'dark' || (!storedTheme && prefersDark);
      
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark-mode');
      }
      
      setDarkMode(isDarkMode);
      
      // Listen for system preference changes
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        // Only update if user hasn't set a preference
        if (!localStorage.getItem('theme')) {
          const newDarkMode = e.matches;
          setDarkMode(newDarkMode);
          
          if (newDarkMode) {
            document.documentElement.classList.add('dark');
            document.body.classList.add('dark-mode');
          } else {
            document.documentElement.classList.remove('dark');
            document.body.classList.remove('dark-mode');
          }
        }
      };
      
      // Add event listener
      mediaQuery.addEventListener('change', handleChange);
      
      // Clean up
      return () => mediaQuery.removeEventListener('change', handleChange);
    } catch (error) {
      logHydrationError('ThemeToggle initialization error', error);
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  const toggleTheme = () => {
    try {
      const newDarkMode = !darkMode;
      setDarkMode(newDarkMode);
      
      if (newDarkMode) {
        // Switch to dark mode
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
        console.log('Dark mode enabled');
      } else {
        // Switch to light mode
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
        console.log('Light mode enabled');
      }
      
      // Force a re-layout/repaint to apply styles
      document.body.style.display = 'none';
      void document.body.offsetHeight; 
      document.body.style.display = '';
      
    } catch (error) {
      logHydrationError('Theme toggle error', error);
    }
  };
  
  // Helper function to log hydration and other errors
  const logHydrationError = (context: string, error: any) => {
    if (!hydrationErrorLogged.current) {
      hydrationErrorLogged.current = true;
      
      const errorData = {
        message: error?.message || 'Unknown error',
        name: error?.name || 'Error',
        stack: error?.stack || '',
        componentStack: 'ThemeToggle Component',
        context: context,
        url: typeof window !== 'undefined' ? window.location.href : '',
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
        timestamp: new Date().toISOString(),
        htmlClasses: typeof document !== 'undefined' ? document.documentElement.className : '',
        darkModeState: darkMode
      };
      
      // Send error to our logging endpoint
      fetch('/api/log-error', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorData),
      }).catch(e => console.error('Failed to log error:', e));
      
      console.error('ThemeToggle Error:', context, error);
    }
  };
  
  // Render a simple placeholder until client-side hydration is complete
  if (!mounted) {
    return (
      <div className={styles['theme-toggle-placeholder']}></div>
    );
  }
  
  return (
    <button 
      onClick={toggleTheme}
      className={`${styles['theme-toggle']} ${darkMode ? styles['theme-toggle-dark'] : ''}`}
      aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
      title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
    >
      <div className={styles['theme-toggle-gradient']}></div>
      <div className={styles['theme-toggle-icon']}>
        {darkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" className={styles['theme-toggle-sun-icon']} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className={styles['theme-toggle-moon-icon']} viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </div>
    </button>
  );
}