import { Routes } from './router';
import { BicycleWeatherComposer } from '../../../application';

export class RestApi {

  constructor({ logger , router }) {
    this.log = logger;

    this.router = new Routes({
      logger: logger,
      router: router,
      composerService: new BicycleWeatherComposer({ logger })
    });
  }

  getRoutes() {
    return this.router.getRoutes();
  }
}
