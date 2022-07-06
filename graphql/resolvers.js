import { Kind } from "graphql/language";
import { GraphQLScalarType } from "graphql";
import { AuthenticationError } from "apollo-server-errors";

export const resolvers = {
  Query: {
    async userPosts(_, args, context) {
      return await context.prisma.post.findMany({
        where: {
          author: { id: args.id },
        },
        include: {
          author: true,
        },
      });
    },

    async post(_, args, context) {
      return await context.prisma.post.findUnique({
        where: {
          id: args.id,
        },
        include: {
          author: {
            select: { name: true, id: true, image: true },
          },
        },
      });
    },

    async userDrafts(_, args, context) {
      return await context.prisma.post.findMany({
        where: {
          author: { id: args.id },
          published: false,
        },
        include: {
          author: true,
        },
      });
    },

    async publishedPosts(_, args, context) {
      return await context.prisma.post.findMany({
        where: { published: true },
        include: {
          author: true,
        },
      });
    },
  },

  Mutation: {
    async createPost(_, args, context) {
      const { title, content, publish } = args.input;

      if (!context.session) {
        throw new AuthenticationError("You must be logged in to create a post");
      }

      const result = await context.prisma.post.create({
        data: {
          title: title,
          content: content,
          published: publish,
          author: { connect: { email: context.session?.user?.email } },
        },
      });

      const user = await context.prisma.user.findUnique({
        where: {
          id: result.authorId,
        },
      });

      return {
        ...result,
        author: user,
      };
    },

    async publishPost(_, args, context) {
      if (!context.session) {
        throw new AuthenticationError("You must be logged in to publish a post");
      }

      return await context.prisma.post.update({
        where: { id: args.id },
        data: { published: true },
        include: {
          author: true,
        },
      });
    },

    async updatePost(_, args, context) {
      const { title, content, publish } = args.input;

      if (!context.session) {
        throw new AuthenticationError("You must be logged in to update a post");
      }

      return await context.prisma.post.update({
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

    async deletePost(_, args, context) {
      if (!context.session) {
        throw new AuthenticationError("You must be logged in to delete a post");
      }

      return await context.prisma.post.delete({
        where: { id: args.id },
      });
    },

    async updateUser(_, args, context) {
      if (!context.session) {
        throw new AuthenticationError("You must be logged in to update a user");
      }

      return await context.prisma.user.update({
        where: { email: context.session.user.email },
        data: {
          ...args.input,
        },
      });
    },

    async deleteUser(_, args, context) {
      if (!context.session) {
        throw new AuthenticationError("You must be logged in to delete a user");
      }

      const user = await context.prisma.user.findUnique({
        where: {
          email: args.email,
        },
      });

      await context.prisma.post.deleteMany({
        where: { authorId: user.id },
      });

      return await context.prisma.user.delete({
        where: { email: args.email },
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
