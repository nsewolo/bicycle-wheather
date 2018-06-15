import cors from 'cors';
import express from 'express';
import compression from 'compression';

import {logger} from './infrastructure';
import {GraphQlServer, RestApiServer} from './interfaces';

new RestApiServer({logger, cors, compression, app: express})
  .start()
  .catch((error) => {
    logger.log(`Error during RESTfull api execution: `, error);
  });

new GraphQlServer({logger, cors, app: express})
  .start()
  .catch((error) => {
    logger.log(`Error during GrapghQl api execution: `, error);
  });