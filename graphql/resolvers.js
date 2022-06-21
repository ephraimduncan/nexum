import prisma from "../lib/prismaClient";

export const resolvers = {
  Query: {
    users(parent, args, context) {
      return [{ name: "Nextjs" }];
    },

    async posts(parent, args, context) {
      return await prisma.post.findMany({
        where: { published: true },
        include: {
          author: {
            select: { name: true },
          },
        },
      });
    },

    async post(parent, args, context) {
      return await prisma.post.findUnique({
        where: {
          id: args.id,
        },
        include: {
          author: {
            select: { name: true },
          },
        },
      });
    },
  },
};
