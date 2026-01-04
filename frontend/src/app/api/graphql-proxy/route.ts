import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const { query, variables } = await request.json()
    
    // Get the auth token from httpOnly cookie
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    }
    
    // Add authorization header if token exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }
    
    // Forward the request to the GraphQL backend
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
    })
    
    // Handle JSON parsing with proper error handling
    const clonedResponse = response.clone()
    let data
    try {
      data = await response.json()
    } catch (jsonError) {
      console.error('Failed to parse JSON response from GraphQL backend:', jsonError)
      
      // Use the cloned response to get the raw body for debugging
      const responseText = await clonedResponse.text()
      
      return NextResponse.json(
        { 
          error: 'Invalid JSON response from GraphQL backend',
          details: responseText,
          status: response.status
        },
        { status: response.status || 502 }
      )
    }
    
    return NextResponse.json(data, { status: response.status })
  } catch (error) {
    console.error('GraphQL proxy error:', error)
    return NextResponse.json(
      { error: 'GraphQL request failed' },
      { status: 500 }
    )
  }
}