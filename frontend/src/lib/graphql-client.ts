// Re-export client-safe functions for backward compatibility
// For new code, prefer importing from .client.ts or .server.ts directly
export {
  graphqlClient,
  makeAuthenticatedRequest,
  setAuthToken,
  removeAuthToken,
  LOGIN_MUTATION,
  REGISTER_MUTATION,
  ME_QUERY
} from './graphql-client.client'

// Note: getAuthenticatedGraphQLClient is now in graphql-client.server.ts
// Import from there for server-side usage