import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { fullName, companyName, businessEmail, phoneNumber, country, password } = await request.json()

    // Create user in Auth0
    const managementToken = await getAuth0ManagementToken()
    
    const createUserResponse = await fetch(`https://${process.env.AUTH0_ISSUER_BASE_URL?.replace('https://', '')}/api/v2/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${managementToken}`,
      },
      body: JSON.stringify({
        email: businessEmail,
        password: password,
        name: fullName,
        connection: 'Username-Password-Authentication',
        user_metadata: {
          companyName,
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

    const auth0User = await createUserResponse.json()

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

    const authData = await authResponse.json()

    // Sync user with our backend database
    const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation SyncAuth0User($auth0Id: String!, $email: String!, $name: String, $phone: String, $companyName: String, $country: String) {
            syncAuth0User(
              auth0Id: $auth0Id, 
              email: $email, 
              name: $name,
              phone: $phone,
              companyName: $companyName,
              country: $country
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
          name: fullName,
          phone: phoneNumber,
          companyName,
          country
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
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function getAuth0ManagementToken() {
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

  const data = await response.json()
  return data.access_token
}