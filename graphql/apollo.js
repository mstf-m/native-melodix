import { ApolloClient, InMemoryCache } from "@apollo/client";
import { baseURL } from "../config/env";

const apollo = new ApolloClient({
  uri: `${baseURL}/graphql`,
  cache: new InMemoryCache(),
});

export default apollo;
