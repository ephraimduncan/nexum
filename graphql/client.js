import { GraphQLClient } from "graphql-request";

// Use for Local Developments
// const client = new GraphQLClient("http://localhost:3000/api/graphql");
const client = new GraphQLClient("https://nexum.vercel.app/api/graphql");

export default client;
