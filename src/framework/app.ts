/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import express from 'express';
import cors from 'cors';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from 'src/infrastructure/graphql';
import resolvers from 'src/infrastructure/graphql/resolvers';

class App {
  public server: express.Application;

  public graphqlServer: ApolloServer;

  public constructor() {
    this.server = express();
    this.database();
    this.graphqlServer = new ApolloServer({
      typeDefs,
      resolvers,
    });
    this.graphqlServer.applyMiddleware({ app: this.server });
    this.middlewares();
    this.routes();
  }

  private database = (): void => {
    createConnection().catch((err) => {
      console.log(err.message);
    });
  }

  private middlewares = (): void => {
    this.server.use(express.json());
    this.server.use(cors());
  }

  private routes = (): void => {
    this.server.get('/', (_req, res) => res.json({ message: 'Hello Word' }));
  }
}

const app = new App();
const { server, graphqlServer } = app;

export default app;
export { server, graphqlServer };
