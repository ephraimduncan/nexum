# Nexum - Next.js FullStack Starter

Next.js + Prisma + Next-Auth + GraphQL

## Features

- Query database with [Prisma](https://prisma.io)
- [GraphQL API](https://www.graphql-yoga.com/)
- Authentication with [Next-Auth](https://next-auth.js.org/)

## Documentation

### Prerequisites

Moving `.env.example` to `.env`.

Then get your database ready, install PostgreSQL and make sure you have a user and database matching the default one we use or you can create your own:

```
DB_URL="postgresql://postgres:pass@localhost:5432/mydb?schema=public"
```

You can also customize it by updating `.env` file.

### Development

```bash
# Install dependencies
yarn

# Apply migrations if you're running for the first time
yarn migrate-dev

# Start Next.js
yarn dev
```

### NPM Scripts

#### `yarn dev`

Run the development server.

#### `yarn build`

Build for production.

#### `yarn generate`

Generate Prisma client.

#### `yarn migrate-dev`

**For development only**

Save migrate files, and apply changes to database, typically you should run this after making changes to `prisma/schema.prisma`.

#### `yarn migrate-deploy`

**For production only**

Applying local migrations to the database.

#### `yarn generate-data-proxy`

Generate Prisma client using Prisma's proxy service on Prisma Data Platform


#### `yarn migrate-deploy-data-proxy`

**For production only**
**SET MIGRATION_URL in .env file**

Applying migrations to the database using Prisma Data Platform.


### GraphQL

We create a GraphQL at `/api/graphql` using GraphQL Yoga, GraphQL resolvers are populated at `graphql/resolvers`.

On the client-side we use GraphQL Request to execute GraphQL queries. On a development server, you can get a GraphQL playground at http://localhost:3000/api/graphql.

Update the GraphQL API endpoint  to `http://localhost:3000/api/graphql` in your local development and switch it to `https://<your-deployed-domain>/api/graphql` in production respectively.

## License

MIT &copy; [Ephraim Atta-Duncan](https://github.com/dephraiim)