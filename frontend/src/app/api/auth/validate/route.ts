import { getAccessToken } from '@auth0/nextjs-auth0'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { accessToken } = await getAccessToken()
    
    if (!accessToken) {
      return NextResponse.json({ error: 'No access token available' }, { status: 401 })
    }

    // Call our backend to validate the token and get our app token
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation ValidateAuth0Token($accessToken: String!) {
            validateAuth0Token(accessToken: $accessToken) {
              token
              user {
                id
                email
                firstName
                lastName
                role
              }
            }
          }
        `,
        variables: { accessToken }
      })
    })

    const data = await response.json()
    
    if (data.errors) {
      return NextResponse.json({ error: data.errors[0].message }, { status: 400 })
    }

    return NextResponse.json(data.data.validateAuth0Token)
  } catch (error) {
    console.error('Token validation error:', error)
    return NextResponse.json({ error: 'Token validation failed' }, { status: 500 })
  }
}