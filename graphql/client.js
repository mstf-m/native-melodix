import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: `http://api.afarineshweb.ir/graphql`,
  cache: new InMemoryCache(),
});

export default client;
