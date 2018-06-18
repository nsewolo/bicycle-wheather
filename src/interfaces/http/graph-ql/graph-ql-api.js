import { Router } from './router';

export class GraphQlApi {
  constructor({ logger, router }) {
    this.log = logger;

    this.router = new Router({
      logger: this.log,
      router: router
    });
  }

  getRoutes() {
    return this.router.getRoutes();
  }
}