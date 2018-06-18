import graphqlHTTP from 'express-graphql';

import { schema } from './schema';

export class GraphQlApi {
  constructor({ logger, cors, router }) {
    this.log = logger;
    this.cors = cors;
    this.router = router;
  }

  getRoutes() {
    this.router.use('/graphql',
      graphqlHTTP({
        schema: schema,
        rootValue: {
          message: () => 'Hello World!'
        },
        graphiql: true,
      })
    );

    return this.router;
  }
}