import { GraphQLClient } from 'graphql-request'
import { cookies } from 'next/headers'

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/graphql"

export const graphqlClient = new GraphQLClient(API_URL, {
  headers: {
    'Content-Type': 'application/json',
  },
})

// Server-side function to get authenticated GraphQL client
export const getAuthenticatedGraphQLClient = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')?.value
  
  if (token) {
    return new GraphQLClient(API_URL, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
  }
  
  return graphqlClient
}

// Client-side function for making authenticated requests
export const makeAuthenticatedRequest = async (query: string, variables?: any) => {
  const response = await fetch('/api/graphql-proxy', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
    credentials: 'include', // Include cookies
  })
  
  return response.json()
}

// Legacy functions - deprecated but kept for compatibility
export const setAuthToken = (_token: string) => {
  // This function is deprecated - tokens are now stored in httpOnly cookies
  console.warn('setAuthToken is deprecated - tokens are now stored in httpOnly cookies')
}

export const removeAuthToken = () => {
  // This function is deprecated - logout should be handled server-side
  console.warn('removeAuthToken is deprecated - logout should be handled server-side')
}

// Auth mutations
export const LOGIN_MUTATION = `
  mutation Login($input: LoginInput!) {
    login(input: $input) {
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
`

export const REGISTER_MUTATION = `
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
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
`

export const VALIDATE_AUTH0_TOKEN_MUTATION = `
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
`

// Auth queries
export const ME_QUERY = `
  query Me {
    me {
      id
      email
      firstName
      lastName
      role
      phone
      profileImage
    }
  }
`