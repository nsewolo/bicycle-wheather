import express from 'express';
import bodyParser from 'body-parser';
import graphqlHTTP from 'express-graphql';

import { schema } from './schema';
import { corsOptions } from '../config';

export class GraphQlServer {
  constructor({ logger, PORT = 3001, cors }) {
    this.port = PORT;
    this.app = express();
    this.log = logger;
    this.cors = cors;
  }

  start() {
    const root = {
      message: () => 'Hello World!'
    };

    this.app.use(this.cors(corsOptions))
      .use(bodyParser.json())
      .use((req, res, next) => {
        this.log.info(`Time GraphQL API: ${new Date().toString()}`);
        next();
      });

    this.app.use('/graphql', graphqlHTTP({
      schema: schema,
      rootValue: root,
      graphiql: true,
    }));

    this.app.listen(this.port);
    this.log.info(`Started GraphQL server on port: ${this.port}`)
  }

  close() {
    this.app.close();
  }

  getApp() {
    return this.app;
  }
}