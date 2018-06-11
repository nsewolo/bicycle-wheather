import express from 'express';
import bodyParser from 'body-parser';
import { BicycleWeatherComposer } from '../../application';

const HTTP_PORT = 3000;
const app = express();

export class RestApi {

  constructor() {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    this.composerService = new BicycleWeatherComposer({});
  }

  async start() {
    app.get('/company/:id', async (req, res) => {
      const id = req.params['id'];

      if ( id ) {
        const details = await this.composerService.getCityWeather(id);

        if ( details ) {
          res
            .status(200)
            .send(details);
        } else {
          res
            .status(400)
            .send(new Error(`Bad request sent.`));
        }

        console.log('Response from api was :', details);
      } else {
        res
          .status(422)
          .send(new Error(`Bad parameter request sent. Provided value: ${id}`));

        console.log(`Bad parameter request sent. Provided value: ${id}`);
      }
    });

    app.get('/health', (req, res) => {
      console.log('Calling path: ', req.route.path);
      res
        .status(200)
        .send('Health status');
    });

    app.listen(HTTP_PORT);

    console.log(`Started RESTful API server on: ${HTTP_PORT} ...`);
  }
}
