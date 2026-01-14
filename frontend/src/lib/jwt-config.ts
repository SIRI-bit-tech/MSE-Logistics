/**
 * JWT Configuration Module
 * 
 * Centralizes JWT secret management and authentication utilities.
 * The application will not start if JWT_SECRET is missing or empty.
 */

import { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.trim() === '') {
  throw new Error(
    'FATAL: JWT_SECRET environment variable is not set. ' +
    'The application cannot run without a secure JWT secret. ' +
    'Please set JWT_SECRET in your .env file.'
  )
}

export const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

/**
 * Extract and verify user ID from JWT token in request cookies
 * @param request - Next.js request object
 * @returns User ID if token is valid, null otherwise
 */
export async function getUserFromToken(request: NextRequest): Promise<string | null> {
  const token = request.cookies.get('auth_token')?.value
  if (!token) return null

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload.userId as string
  } catch {
    return null
  }
}
