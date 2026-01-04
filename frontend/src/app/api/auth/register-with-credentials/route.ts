import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  let auth0User: any = null
  let managementToken: string | null = null

  try {
    const { firstName, lastName, businessEmail, phoneNumber, country, password } = await request.json()

    // Create user in Auth0
    managementToken = await getAuth0ManagementToken()
    
    const createUserResponse = await fetch(`https://${process.env.AUTH0_ISSUER_BASE_URL?.replace('https://', '')}/api/v2/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${managementToken}`,
      },
      body: JSON.stringify({
        email: businessEmail,
        password: password,
        name: `${firstName} ${lastName}`,
        connection: 'Username-Password-Authentication',
        user_metadata: {
          firstName,
          lastName,
          phoneNumber,
          country,
        },
      }),
    })

    if (!createUserResponse.ok) {
      const error = await createUserResponse.json()
      return NextResponse.json(
        { message: error.message || 'Registration failed' },
        { status: 400 }
      )
    }

    auth0User = await createUserResponse.json()

    // Now authenticate the user to get tokens
    const authResponse = await fetch(`https://${process.env.AUTH0_ISSUER_BASE_URL?.replace('https://', '')}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        grant_type: 'password',
        username: businessEmail,
        password: password,
        audience: process.env.AUTH0_AUDIENCE,
        scope: 'openid profile email',
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
      }),
    })

    if (!authResponse.ok) {
      return NextResponse.json(
        { message: 'Registration successful but login failed. Please try logging in.' },
        { status: 201 }
      )
    }

    // Sync user with our backend database
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation SyncAuth0UserOnAuth($auth0Id: String!, $email: String!, $firstName: String!, $lastName: String!, $phone: String) {
            syncAuth0UserOnAuth(
              auth0Id: $auth0Id, 
              email: $email, 
              firstName: $firstName,
              lastName: $lastName,
              phone: $phone
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
          auth0Id: auth0User.user_id,
          email: businessEmail,
          firstName,
          lastName,
          phone: phoneNumber
        }
      })
    })

    if (!backendResponse.ok) {
      // Backend request failed - clean up the Auth0 user
      if (managementToken) {
        await deleteAuth0User(auth0User.user_id, managementToken, 'backend request failure')
      }

      return NextResponse.json(
        { message: 'Registration failed. Please try again.' },
        { status: 500 }
      )
    }

    const backendData = await backendResponse.json()

    if (backendData.errors) {
      // Backend sync failed - clean up the Auth0 user to prevent orphaned accounts
      if (managementToken) {
        await deleteAuth0User(auth0User.user_id, managementToken, 'backend sync failure')
      }

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
    console.error('Registration error:', error)
    
    // If we have an Auth0 user that was created, try to clean it up
    if (auth0User?.user_id && managementToken) {
      await deleteAuth0User(auth0User.user_id, managementToken, 'unexpected error')
    }
    
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function deleteAuth0User(userId: string, managementToken: string, reason: string) {
  try {
    const deleteResponse = await fetch(`https://${process.env.AUTH0_ISSUER_BASE_URL?.replace('https://', '')}/api/v2/users/${encodeURIComponent(userId)}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${managementToken}`,
      },
    })
    
    if (deleteResponse.ok) {
      console.log(`Auth0 user ${userId} deleted due to ${reason}`)
      return true
    } else {
      console.error(`Failed to delete Auth0 user ${userId} after ${reason}:`, await deleteResponse.text())
      return false
    }
  } catch (deleteError) {
    console.error(`Error deleting Auth0 user ${userId} after ${reason}:`, deleteError)
    return false
  }
}

async function getAuth0ManagementToken() {
  try {
    const response = await fetch(`https://${process.env.AUTH0_ISSUER_BASE_URL?.replace('https://', '')}/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        audience: `https://${process.env.AUTH0_ISSUER_BASE_URL?.replace('https://', '')}/api/v2/`,
        grant_type: 'client_credentials',
      }),
    })

    if (!response.ok) {
      let errorMessage = `Auth0 management token request failed: ${response.status} ${response.statusText}`
      try {
        const errorData = await response.json()
        errorMessage += ` - ${errorData.error_description || errorData.error || 'Unknown error'}`
      } catch {
        // If we can't parse the error response, use the status text
      }
      console.error('Auth0 Management Token Error:', errorMessage)
      throw new Error(errorMessage)
    }

    const data = await response.json()
    
    if (!data.access_token) {
      const errorMessage = 'Auth0 management token response missing access_token'
      console.error('Auth0 Management Token Error:', errorMessage, data)
      throw new Error(errorMessage)
    }

    return data.access_token
  } catch (error) {
    console.error('Failed to get Auth0 management token:', error)
    throw error instanceof Error ? error : new Error('Failed to get Auth0 management token')
  }
}