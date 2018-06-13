import express from 'express';
import { Router } from './router';
import bodyParser from 'body-parser';
import { BicycleWeatherComposer } from '../../application';

export class RestApi {

  constructor({port = 3000}) {
    this.port = port;
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));

    this.router = new Router({
      router: express.Router(),
      composerService: new BicycleWeatherComposer({})
    });
  }

  async start() {
    this.app.use(this.router.getRoutes());

    this.app.listen(this.port);

    console.log(`Started RESTful API server on port: ${this.port} ...`);
  }

  getApp() {
    return this.app;
  }
}
