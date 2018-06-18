import graphqlHTTP from 'express-graphql';

import { schema } from '../schema';

export class Router {
  constructor({ logger, router }) {
    this.logger = logger;
    this.routes = router;

    this._registerRoutes();
  }

  getRoutes() {
    return this.routes;
  }

  // private methods
  _registerRoutes() {
    this.routes.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: {
          message: () => 'Hello World!'
        },
        graphiql: true,
      })
    );
  }
}