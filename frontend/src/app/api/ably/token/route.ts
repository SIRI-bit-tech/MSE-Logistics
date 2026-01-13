import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import Ably from 'ably'

// GET /api/ably/token - Generate Ably token for authenticated users
export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const ablyApiKey = process.env.ABLY_API_KEY
    
    if (!ablyApiKey) {
      return NextResponse.json({ 
        error: 'Ably not configured',
        message: 'Set ABLY_API_KEY environment variable'
      }, { status: 503 })
    }

    const ably = new Ably.Rest({ key: ablyApiKey })
    
    // Generate token for the authenticated user
    const tokenRequest = await ably.auth.createTokenRequest({
      clientId: session.user.id,
      capability: {
        [`user:${session.user.id}:tracking:*`]: ['subscribe'],
        [`user:${session.user.id}:shipments`]: ['subscribe'],
      },
      ttl: 60 * 60 * 1000, // 1 hour
    })

    return NextResponse.json({ tokenRequest })
  } catch (error) {
    console.error('Error generating Ably token:', error)
    return NextResponse.json({ error: 'Failed to generate token' }, { status: 500 })
  }
}