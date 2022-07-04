import { getSession } from "next-auth/react";
import prisma from "../lib/prismaClient";
import { createServer } from "@graphql-yoga/node";
import { typeDefs } from "../../graphql/typeDefs";
import { resolvers } from "../../graphql/resolvers";

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
  endpoint: "/api/graphql",
  context: async ({ req, res }) => {
    const session = await getSession({ req });
    return { session, prisma };
  },
});

export default server;
