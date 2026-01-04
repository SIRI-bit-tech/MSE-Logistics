import { GraphQLClient } from 'graphql-request'

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/graphql"

// Base GraphQL client for client-side use (no authentication)
export const graphqlClient = new GraphQLClient(API_URL, {
  headers: {
    'Content-Type': 'application/json',
  },
})

// Client-side function for making authenticated requests
export const makeAuthenticatedRequest = async <T = any>(
  query: string, 
  variables?: Record<string, unknown>
): Promise<T> => {
  try {
    const response = await fetch('/api/graphql-proxy', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
      credentials: 'include', // Include cookies
    })
    
    // Check if the response is ok
    if (!response.ok) {
      let errorBody = 'Unknown error'
      try {
        const errorData = await response.text()
        errorBody = errorData
      } catch {
        // If we can't read the error body, use the status text
        errorBody = response.statusText
      }
      
      throw new Error(`GraphQL request failed: ${response.status} ${response.statusText}. ${errorBody}`)
    }
    
    // Parse JSON safely
    let data: T
    try {
      data = await response.json()
    } catch (jsonError) {
      throw new Error(`Failed to parse JSON response: ${jsonError instanceof Error ? jsonError.message : 'Unknown JSON parsing error'}`)
    }
    
    return data
  } catch (error) {
    // Re-throw with additional context if it's a network error
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error(`Network error: Failed to connect to GraphQL proxy. ${error.message}`)
    }
    
    // Re-throw other errors as-is
    throw error
  }
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