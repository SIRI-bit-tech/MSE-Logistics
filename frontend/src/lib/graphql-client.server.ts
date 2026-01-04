import { GraphQLClient } from 'graphql-request'
import { cookies } from 'next/headers'

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/graphql"

// Base GraphQL client for server-side use
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