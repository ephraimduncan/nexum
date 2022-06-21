import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    users: [User!]!
    posts: [Post!]!
    post(id: ID!): Post!
  }

  type User {
    name: String
  }

  type Post {
    id: ID!
    title: String!
    content: String
    published: Boolean!
    author: User!
  }
`;
