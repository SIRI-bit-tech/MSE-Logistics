import { NextRequest, NextResponse } from 'next/server'

export async function POST(_request: NextRequest) {
  try {
    const isProduction = process.env.NODE_ENV === 'production'
    const secureFlag = isProduction ? 'Secure; ' : ''
    
    // Clear the httpOnly auth cookie
    return NextResponse.json(
      { message: 'Logged out successfully' },
      {
        headers: {
          'Set-Cookie': `auth_token=; HttpOnly; ${secureFlag}SameSite=Strict; Path=/; Max-Age=0`
        }
      }
    )
  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    )
  }
}