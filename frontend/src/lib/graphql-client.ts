import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"
import { onError } from "@apollo/client/link/error"

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/graphql",
  credentials: "include",
})

const errorLink = onError(({ graphQLErrors, networkError, response }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, extensions }) => {
      console.error(`[GraphQL error]: ${message}`)
    })
  }
  if (networkError) {
    console.error(`[Network error]: ${networkError}`)
  }
})

const authLink = (operation: any) => {
  const token = typeof window !== "undefined" ? localStorage.getItem("auth_token") : null

  if (token) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
  }

  return operation
}

export const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: errorLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV === "development",
})
