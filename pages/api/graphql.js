import { createServer } from "@graphql-yoga/node";

const typeDefs = `
  type Query {
    users: [User!]!
  }
  type User {
    name: String
  }
`;

const resolvers = {
  Query: {
    users(parent, args, context) {
      return [{ name: "Nextjs" }];
    },
  },
};

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
  endpoint: "/api/graphql",
});

export default server;
