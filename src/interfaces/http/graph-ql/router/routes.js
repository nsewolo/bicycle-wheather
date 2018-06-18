import graphqlHTTP from 'express-graphql';

import { schema } from '../schema';

export class Router {

  constructor({ logger, router }) {
    this.log = logger;
    this.router = router;

    this._registerRoutes();
  }

  getRoutes() {
    return this.router;
  }

  // private methods
  _registerRoutes() {
    this.router.use('/graphql', graphqlHTTP({
        schema: schema,
        rootValue: {
          message: () => 'Hello World!'
        },
        graphiql: true,
      })
    );
  }
}