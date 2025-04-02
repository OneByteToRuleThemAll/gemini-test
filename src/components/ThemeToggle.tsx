'use client';

import { useState, useEffect, useRef } from 'react';

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
      } else {
        document.documentElement.classList.remove('dark');
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
          } else {
            document.documentElement.classList.remove('dark');
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
        document.body.classList.add('dark-mode'); // Add this class for additional styling
        localStorage.setItem('theme', 'dark');
        console.log('Dark mode enabled'); // For debugging
      } else {
        // Switch to light mode
        document.documentElement.classList.remove('dark');
        document.body.classList.remove('dark-mode'); // Remove class for light mode
        localStorage.setItem('theme', 'light');
        console.log('Light mode enabled'); // For debugging
      }
      
      // Force a re-layout/repaint to apply Tailwind dark mode classes
      document.body.style.display = 'none';
      // Reading this property causes a reflow
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
      <div className="w-10 h-10 rounded-full bg-gray-100 shadow-md"></div>
    );
  }
  
  return (
    <button 
      onClick={toggleTheme}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 relative overflow-hidden shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
      aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
      title={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
    >
      <div className="absolute inset-0 bg-glamour-gradient opacity-0 dark:opacity-10 transition-opacity duration-300"></div>
      <div className="relative transform transition-transform duration-500 ease-in-out">
        {darkMode ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-glamour-gold" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-glamour-lavender" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </div>
    </button>
  );
}