import cors from 'cors';
import compression from 'compression';

import { logger  } from './infrastructure';
import { RestApiServer, GraphQlServer } from './interfaces';

const options = {
  logger,
  cors,
  compression
};

new RestApiServer(options)
  .start()
  .catch((error) => {
    options.logger.log(`Error during RESTfull api execution: `, error);
});

new GraphQlServer({logger, cors})
  .start()
  .catch((error) => {
    options.logger.log(`Error during GrapghQl api execution: `, error);
  });