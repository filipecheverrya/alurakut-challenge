import { ApolloClient, InMemoryCache, HttpLink, gql } from "@apollo/client";

const token = process.env.NEXT_DATOCMS_API_TOKEN;

const httpLink = new HttpLink({
  uri: "https://graphql.datocms.com/",
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': `Bearer ${token}`,
  }
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export const HomeRequest = client.query({
  query: gql`query Home {
    allCommunities {
      id
      title
      image {
        url
      }
    }
  }
  `
})

export default client;