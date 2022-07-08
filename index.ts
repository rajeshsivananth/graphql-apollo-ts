import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloWorldResolver } from "./Schemas/Resolvers/HelloWorldResolver";
import express from "express";

(async () => {
  const app = express();

  console.log("init..");
  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloWorldResolver],
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  await server.start();
  server.applyMiddleware({ app });

  app.listen(3001, () => {
    console.log("Graphql is up and running..");
  });
})();
