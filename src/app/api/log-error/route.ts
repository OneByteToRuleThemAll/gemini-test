import fs from 'fs';
import path from 'path';
import { NextRequest, NextResponse } from 'next/server';

// Define the error log file path
const LOG_DIR = path.join(process.cwd(), 'logs');
const ERROR_LOG_FILE = path.join(LOG_DIR, 'error.log');

// Ensure the logs directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

export async function POST(request: NextRequest) {
  try {
    // Parse the error data from the request
    const errorData = await request.json();
    
    // Format the error for logging
    const timestamp = new Date().toISOString();
    const formattedError = `[${timestamp}] ${JSON.stringify({
      message: errorData.message,
      stack: errorData.stack,
      componentStack: errorData.componentStack,
      url: errorData.url,
      userAgent: errorData.userAgent
    }, null, 2)}\n\n`;
    
    // Append the error to the log file
    fs.appendFileSync(ERROR_LOG_FILE, formattedError);
    
    // Return a success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to log error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to log error' },
      { status: 500 }
    );
  }
}