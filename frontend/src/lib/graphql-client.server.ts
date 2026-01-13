import { GraphQLClient } from 'graphql-request'
import { cookies } from 'next/headers'

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

// Base GraphQL client for server-side use
export const graphqlClient = new GraphQLClient(APP_URL, {
  headers: {
    'Content-Type': 'application/json',
  },
})

// Server-side function to get authenticated GraphQL client
export const getAuthenticatedGraphQLClient = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth_token')?.value
  
  if (token) {
    return new GraphQLClient(APP_URL, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    })
  }
  
  return graphqlClient
}