import cors from 'cors';
import compression from 'compression';

import { RestApi } from './interfaces';
import { logger  } from './infrastructure';

const options = {
  logger,
  cors,
  compression
};

new RestApi(options)
  .start()
  .catch((error) => {
    options.logger.log(`Error during rest api execution: `, error);
});