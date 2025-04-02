'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorLogger extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { 
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to console for debugging
    console.error('🔴 React Error:', error);
    console.error('🔴 Component Stack:', errorInfo.componentStack);
    
    // Log the error to file through API
    this.logErrorToFile(error, errorInfo);
    
    // Update the state
    this.setState({
      error,
      errorInfo
    });
  }

  logErrorToFile = async (error: Error, errorInfo: ErrorInfo): Promise<void> => {
    try {
      // Prepare error data for logging
      const errorData = {
        message: error.message,
        name: error.name,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        url: typeof window !== 'undefined' ? window.location.href : '',
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
        timestamp: new Date().toISOString()
      };
      
      // Send the error to our API endpoint
      const response = await fetch('/api/log-error', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorData),
      });
      
      if (!response.ok) {
        console.error('Failed to log error to file:', await response.text());
      }
    } catch (loggingError) {
      console.error('Error while trying to log error to file:', loggingError);
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Check if we have a custom fallback
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      // Default error UI
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md my-4">
          <h2 className="text-red-800 font-bold mb-2">Something went wrong</h2>
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-2">
              <details className="whitespace-pre-wrap text-sm">
                <summary className="text-red-600 cursor-pointer font-medium">View error details</summary>
                <pre className="mt-2 p-4 bg-red-100 rounded overflow-auto text-sm">
                  <code>
                    {this.state.error?.toString()}
                    {'\n\n'}
                    {this.state.errorInfo?.componentStack}
                  </code>
                </pre>
              </details>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorLogger;