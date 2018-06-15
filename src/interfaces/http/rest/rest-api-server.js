import express from 'express';
import bodyParser from 'body-parser';

import { Router } from './router';
import { corsOptions } from '../config';
import { BicycleWeatherComposer } from '../../../application';

export class RestApiServer {

  constructor({port = 3000, logger, cors, compression}) {
    this.port = port;
    this.app = express();
    this.log = logger;

    this.app.use(cors(corsOptions))
      .use(bodyParser.json())
      .use(compression())
      .use(bodyParser.urlencoded({extended: true}));

    this.router = new Router({
      logger,
      router: express.Router(),
      composerService: new BicycleWeatherComposer({logger})
    });
  }

  async start() {
    this.app.use(this.router.getRoutes());
    this.app.listen(this.port);
    this.log.info(`Started RESTful API - Port ${this.port}`)
  }

  getApp() {
    return this.app;
  }
}
