/**
 * Build-time utilities for API routes
 * Helps skip database/external service operations during Vercel build
 */

import { NextResponse } from 'next/server'

/**
 * Check if we're in build mode and should skip database operations
 */
export function shouldSkipDatabaseOperations(): boolean {
  // Skip if we're not in production and don't have a real database URL
  return process.env.NODE_ENV !== 'production' && 
         (!process.env.DATABASE_URL || !process.env.DATABASE_URL.includes('neon'))
}

/**
 * Check if we're in build mode and should skip Ably operations
 */
export function shouldSkipAblyOperations(): boolean {
  // Skip if we're not in production and don't have a real Ably key
  return process.env.NODE_ENV !== 'production' && 
         (!process.env.ABLY_API_KEY || !process.env.ABLY_API_KEY.startsWith('1vyaTg'))
}

/**
 * Return a build-time response for database-dependent endpoints
 */
export function buildTimeResponse(message: string = 'Build time - database not available') {
  return NextResponse.json({ 
    error: 'Build time',
    message,
    data: []
  }, { status: 503 })
}