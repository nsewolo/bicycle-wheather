import cors from 'cors';
import compression from 'compression';

import { logger  } from './infrastructure';
import { RestApiServer } from './interfaces';

const options = {
  logger,
  cors,
  compression
};

new RestApiServer(options)
  .start()
  .catch((error) => {
    options.logger.log(`Error during rest api execution: `, error);
});