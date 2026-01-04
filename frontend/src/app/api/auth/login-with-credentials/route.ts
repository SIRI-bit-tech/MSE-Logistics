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
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation SyncAuth0UserOnAuth($auth0Id: String!, $email: String!, $firstName: String!, $lastName: String!) {
            syncAuth0UserOnAuth(
              auth0Id: $auth0Id, 
              email: $email, 
              firstName: $firstName,
              lastName: $lastName
            ) {
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
          firstName: userInfo.name?.split(' ')[0] || userInfo.email?.split('@')[0] || 'User',
          lastName: userInfo.name?.split(' ').slice(1).join(' ') || ''
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

    const isProduction = process.env.NODE_ENV === 'production'
    const secureFlag = isProduction ? 'Secure; ' : ''

    return NextResponse.json(backendData.data.syncAuth0UserOnAuth, {
      headers: {
        'Set-Cookie': `auth_token=${backendData.data.syncAuth0UserOnAuth.token}; HttpOnly; ${secureFlag}SameSite=Strict; Path=/; Max-Age=${7 * 24 * 60 * 60}` // 7 days
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}