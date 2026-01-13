import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session) {
      return NextResponse.json({ 
        user: null, 
        isAuthenticated: false 
      }, { status: 200 })
    }

    // Parse name into firstName and lastName
    const nameParts = session.user.name?.split(' ') || []
    const firstName = nameParts[0] || ""
    const lastName = nameParts.slice(1).join(' ') || ""

    return NextResponse.json({
      user: {
        id: session.user.id,
        email: session.user.email,
        firstName,
        lastName,
        phone: undefined, // Better Auth doesn't store phone by default
        profileImage: session.user.image || undefined,
        role: "CUSTOMER", // Default role, extend Better Auth to store roles if needed
        createdAt: session.user.createdAt,
      },
      isAuthenticated: true
    }, { status: 200 })
  } catch (error) {
    console.error('Error getting user session:', error)
    return NextResponse.json({ 
      user: null, 
      isAuthenticated: false 
    }, { status: 200 })
  }
}