import express from 'express';
import bodyParser from 'body-parser';
import { BicycleWeatherComposer } from '../../application';

export class RestApi {

  constructor({HTTP_PORT = 3000}) {
    this.port = HTTP_PORT;
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
    this.composerService = new BicycleWeatherComposer({});
  }

  async start() {
    this.app.get('/company/:id', async (req, res) => {
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

    this.app.get('/health', (req, res) => {
      console.log('Calling path: ', req.route.path);
      res
        .status(200)
        .send({"health": "UP"});
    });

    this.app.listen(this.port);

    console.log(`Started RESTful API server on: ${this.port} ...`);
  }

  getApp() {
    return this.app;
  }
}
