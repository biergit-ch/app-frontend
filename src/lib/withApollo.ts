import ApolloClient, { InMemoryCache }  from 'apollo-boost'
import withApollo from 'next-with-apollo'

export default withApollo(({ initialState }) => (
  new ApolloClient({
    uri: process.env.GRAPHQL_URL,
    cache: new InMemoryCache().restore(initialState || {})
  })
))