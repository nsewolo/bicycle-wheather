import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

import { logger } from './infrastructure';
import { GraphQlApi, RestApi, corsOptions } from './interfaces';

const PORT = process.env.PORT || 3000;
const server = express();
const log = logger;

server.use(cors(corsOptions))
  .use(bodyParser.json())
  .use(compression())
  .use(bodyParser.urlencoded({extended: true}))
  .use((req, res, next) => {
    log.info(`Time GraphQL API: ${new Date().toString()}`);
    next();
  });

// Apis
const restApi = new RestApi({logger, cors, compression, app: express});
const graphQlApi = new GraphQlApi({logger, cors, app: express});

// register routes
server.use(restApi.getRoutes());
server.use(graphQlApi.getRoutes());

// Run server
server.listen(PORT)
  .then(() => {
    log.info(`Started RESTfull and GraphQL servers on port: ${PORT}`);
  })
  .catch((error) => {
    logger.log(`Error during GrapghQl api execution: `, error);
  });