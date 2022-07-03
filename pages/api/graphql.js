import { createServer } from "@graphql-yoga/node";
import { typeDefs } from "../../graphql/typeDefs";
import { resolvers } from "../../graphql/resolvers";
import { getSession } from "next-auth/react";

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
  endpoint: "/api/graphql",
  context: async ({ req, res }) => {
    const session = await getSession({ req });
    return { session };
  },
});

export default server;
