import { GraphQLClient } from 'graphql-request'

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/graphql"

export const graphqlClient = new GraphQLClient(API_URL, {
  headers: {
    'Content-Type': 'application/json',
  },
})

export const setAuthToken = (token: string) => {
  graphqlClient.setHeader('Authorization', `Bearer ${token}`)
}

export const removeAuthToken = () => {
  // Use the public API to remove the Authorization header
  graphqlClient.setHeader('Authorization', undefined)
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