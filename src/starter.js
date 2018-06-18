import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

import {logger} from './infrastructure';
import {corsOptions, GraphQlApi, RestApi} from './interfaces';

const PORT = process.env.PORT || 3000;
const router = express.Router();
const log = logger;

const server = express();

server
  .use(cors(corsOptions))
  .use(bodyParser.json())
  .use(compression())
  .use(bodyParser.urlencoded({extended: true}))
  // Apis register routes
  .use(new RestApi({logger, router}).getRoutes())
  .use(new GraphQlApi({logger, router}).getRoutes())
  // Run server
  .listen(PORT);

log.info(`Started RESTfull and GraphQL servers on port: ${PORT}`);