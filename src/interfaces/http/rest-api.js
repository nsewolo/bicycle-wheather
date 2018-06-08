import express from 'express';
import bodyParser from 'body-parser';
import { BicycleWeatherComposer } from '../../application';

const HTTP_PORT = 3000;
const app = express();

export class RestApi {

  constructor() {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    this.composerService = new BicycleWeatherComposer();
  }

  start() {
    app.get('/company/:id', (req, res) => {
      const id = req.params['id'];

      if ( id ) {
        console.log(`Calling path: ', ${req.route.path}`);

        const details = this.composerService.getCityWeather(id);
        res
          .status(200)
          .send(details);

        console.log('Response from api:', details);
      } else {
        res
          .status(400)
          .send({});
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
