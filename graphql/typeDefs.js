import gql from "graphql-tag";

export const typeDefs = gql`
  scalar DateTime

  type Query {
    # users: [User!]!
    # user(email: String!): User!
    posts: [Post!]!
    post(id: ID!): Post!
    publishedPosts: [Post!]
    drafts: [Post!]
  }

  type Mutation {
    createPost(input: PostInput!): Post
    publishPost(id: ID!): Post
    deletePost(id: ID!): Post!
    updatePost(id: ID!, input: PostInput!): Post

    updateUser(input: UserInput!): User
    deleteUser(email: String!): User
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
    publish: Boolean
  }

  # Add feature to update email with verification and profile picture
  input UserInput {
    name: String
  }
`;
