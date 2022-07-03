import prisma from "../lib/prismaClient";
import { Kind } from "graphql/language";
import { GraphQLScalarType } from "graphql";

export const resolvers = {
  Query: {
    async users(parent, args, context) {
      return await prisma.user.findMany({
        include: {
          posts: true,
        },
      });
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

  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "Date custom scalar type",
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10); // ast value is always in string format
      }
      return null;
    },
  }),
};
