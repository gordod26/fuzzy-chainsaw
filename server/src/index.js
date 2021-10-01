const { ApolloServer } = require("apollo-server-express");
const { PrismaClient } = require("@prisma/client");
const express = require("express");
const { getUserId } = require("./utils");
const fs = require("fs");
const path = require("path");
const { createServer } = require("http");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { PubSub } = require("graphql-subscriptions");

const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const Subscription = require("./resolvers/Subscription");
const User = require("./resolvers/User");
const Post = require("./resolvers/Post");
const Vote = require("./resolvers/Vote");

const prisma = new PrismaClient();
const pubsub = new PubSub();

const typeDefs = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);

const resolvers = {
  Query,
  Mutation,
  Subscription, //uncomment when I get context to work in subscriptions.js
  User,
  Post,
  Vote,
};

async function startApolloServer(typeDefs, resolvers, context) {
  const app = express();
  const httpServer = createServer(app);
  const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
  });
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      return {
        ...req,
        prisma,
        pubsub,
        userId: req && req.headers.authorization ? getUserId(req) : null,
      };
    },
  });
  await server.start();

  server.applyMiddleware({ app, path: "/" });

  const subscriptionServer = SubscriptionServer.create(
    {
      // This is the `schema` we just created.
      schema,
      // These are imported from `graphql`.
      execute,
      subscribe,
      // this function acts as the context for subscriptions because context can't be used on subscriptions
      onConnect(connectionParams, webSocket, context) {
        console.log("context", context);
        return {
          pubsub,
          prisma,
        };
      },
      onDisconnect(webSocket, context) {
        console.log("Disconnected!");
      },
    },
    {
      server: httpServer, // This is the `httpServer` we created in a previous step.
      path: server.graphqlPath, // This `server` is the instance returned from `new ApolloServer`.
    }
  );

  ["SIGINT", "SIGTERM"].forEach((signal) => {
    // Shut down in the case of interrupt and termination signals
    process.on(signal, () => subscriptionServer.close());
  });

  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`
    );
  });
}

startApolloServer(typeDefs, resolvers);
