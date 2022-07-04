import prisma from "../lib/prismaClient";
import { Kind } from "graphql/language";
import { GraphQLScalarType } from "graphql";
import { AuthenticationError } from "apollo-server-errors";

export const resolvers = {
  Query: {
    // Remove this. It is useless
    async users(parent, args, context) {
      return await prisma.user.findMany({
        include: {
          posts: true,
        },
      });
    },

    async posts(parent, args, context) {
      return await prisma.post.findMany({
        include: {
          author: true,
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
            select: { name: true }, // Returns only the name of the author
          },
        },
      });
    },

    async publishedPosts(parent, args, context) {
      return await prisma.post.findMany({
        where: { published: true },
        include: {
          author: true,
        },
      });
    },
  },

  Mutation: {
    async createPost(parent, args, context) {
      const { title, content } = args.input;

      if (!context.session) {
        throw new AuthenticationError("You must be logged in to create a post");
      }

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

    async publishPost(parent, args, context) {
      if (!context.session) {
        throw new AuthenticationError("You must be logged in to publish a post");
      }

      return await prisma.post.update({
        where: { id: args.id },
        data: { published: true },
        include: {
          author: true,
        },
      });
    },

    async updatePost(parent, args, context) {
      const { title, content, publish } = args.input;

      if (!context.session) {
        throw new AuthenticationError("You must be logged in to update a post");
      }

      return await prisma.post.update({
        where: { id: args.id },
        data: {
          title,
          content,
          published: publish,
        },
        include: {
          author: true,
        },
      });
    },

    async deletePost(parent, args, context) {
      if (!context.session) {
        throw new AuthenticationError("You must be logged in to delete a post");
      }

      return await prisma.post.delete({
        where: { id: args.id },
      });
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
