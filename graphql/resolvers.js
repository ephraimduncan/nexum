import { getSession } from "next-auth/react";
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

  Mutation: {
    async createPost(parent, args, context) {
      const { title, content } = args.input;

      const result = await prisma.post.create({
        data: {
          title: title,
          content: content,
          published: false,
          author: { connect: { email: context.session?.user?.email } },
        },
      });

      const user = await prisma.user.findUnique({
        where: {
          id: result.authorId,
        },
      });

      return {
        ...result,
        author: user,
      };
    },
  },
};
