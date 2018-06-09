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

  start() {
    app.get('/company/:id', (req, res) => {
      const id = req.params['id'];

      if ( id ) {
        const details = this.composerService.getCityWeather(id);
        res
          .status(200)
          .send(details);

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
