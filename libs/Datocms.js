import { GraphQLClient } from "graphql-request";

export function request({ query, variables, preview }) {
  const endpoint = preview
    ? `https://league-of-orkut.admin.datocms.com/preview`
    : `https://league-of-orkut.admin.datocms.com/`;
  const client = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`
    }
  });
  return client.request(query, variables);
}