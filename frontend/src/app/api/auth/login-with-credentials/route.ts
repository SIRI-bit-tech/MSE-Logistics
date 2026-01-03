import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Authenticate with Auth0 using Resource Owner Password Grant
    // Note: This is a secure server-side implementation
    const auth0Response = await fetch(`https://${process.env.AUTH0_ISSUER_BASE_URL?.replace('https://', '')}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'password',
        username: email,
        password: password,
        audience: process.env.AUTH0_AUDIENCE,
        scope: 'openid profile email',
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
      }),
    })

    if (!auth0Response.ok) {
      const error = await auth0Response.json()
      return NextResponse.json(
        { message: error.error_description || 'Authentication failed' },
        { status: 401 }
      )
    }

    const auth0Data = await auth0Response.json()

    // Get user info from Auth0
    const userInfoResponse = await fetch(`https://${process.env.AUTH0_ISSUER_BASE_URL?.replace('https://', '')}/userinfo`, {
      headers: {
        Authorization: `Bearer ${auth0Data.access_token}`,
      },
    })

    if (!userInfoResponse.ok) {
      return NextResponse.json(
        { message: 'Failed to get user information' },
        { status: 500 }
      )
    }

    const userInfo = await userInfoResponse.json()

    // Sync user with our backend database
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation SyncAuth0User($auth0Id: String!, $email: String!, $name: String) {
            syncAuth0User(auth0Id: $auth0Id, email: $email, name: $name) {
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
        variables: {
          auth0Id: userInfo.sub,
          email: userInfo.email,
          name: userInfo.name
        }
      })
    })

    const backendData = await backendResponse.json()

    if (backendData.errors) {
      return NextResponse.json(
        { message: backendData.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(backendData.data.syncAuth0User)
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}