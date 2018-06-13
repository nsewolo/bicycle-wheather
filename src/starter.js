import { RestApi } from './interfaces';

/**
 * Start the Rest API
 */
new RestApi({})
  .start()
  .catch((error) => {
    console.log(`Error during rest api execution: `, error);
});