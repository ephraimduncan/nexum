import gql from "graphql-tag";

export const typeDefs = gql`
  scalar DateTime

  type Query {
    users: [User!]!
    posts: [Post!]!
    post(id: ID!): Post!
    publishedPosts: [Post!]
  }

  type Mutation {
    createPost(input: PostInput!): Post
    publishPost(id: ID!): Post
    deletePost(id: ID!): Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    emailVerified: Boolean
    image: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type Post {
    id: ID!
    title: String!
    content: String
    published: Boolean!
    author: User!
  }

  input PostInput {
    title: String!
    content: String
  }
`;
