import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import Ably from 'ably'

// GET /api/ably/token - Generate Ably token for all users (authenticated or not)
export async function GET(request: NextRequest) {
  try {
    const ablyApiKey = process.env.ABLY_API_KEY
    
    if (!ablyApiKey) {
      return NextResponse.json({ 
        error: 'Ably not configured',
        message: 'Set ABLY_API_KEY environment variable'
      }, { status: 503 })
    }

    const ably = new Ably.Rest({ key: ablyApiKey })
    
    // Check if user is authenticated
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    // Generate token with appropriate permissions
    const tokenRequest = await ably.auth.createTokenRequest({
      clientId: session?.user?.id || `guest-${Date.now()}`,
      capability: {
        // Allow subscribing to any tracking channel (public tracking)
        'tracking:*': ['subscribe'],
        // Allow subscribing to user-specific channels if authenticated
        ...(session?.user?.id && {
          [`user:${session.user.id}:*`]: ['subscribe', 'publish'],
        }),
      },
      ttl: 60 * 60 * 1000, // 1 hour
    })

    return NextResponse.json(tokenRequest)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate token' }, { status: 500 })
  }
}