'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './ThemeToggle.module.css';

interface ErrorWithMessage {
  message?: string;
  name?: string;
  stack?: string;
}

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const hydrationErrorLogged = useRef(false);
  
  // Helper function to log hydration and other errors
  const logHydrationError = (context: string, error: ErrorWithMessage) => {
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
      logHydrationError('ThemeToggle initialization error', error as ErrorWithMessage);
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
      logHydrationError('Theme toggle error', error as ErrorWithMessage);
    }
  };
  
  // Render placeholder before hydration
  if (!mounted) {
    return <div className={styles.themeTogglePlaceholder} />;
  }
  
  return (
    <button 
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}