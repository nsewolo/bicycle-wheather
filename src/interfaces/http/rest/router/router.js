export class Router {

  constructor({ logger, router, composerService }) {
    this.router = router;
    this.composerService = composerService;
    this.log = logger;

    this._registerRoutes();
  }

  getRoutes() {
    return this.router;
  }

  // private methods
  _registerRoutes() {
    this.router.use((req, res, next) => {
      this.log.info(`Time RESTfull API: ${new Date().toString()}`);
      next();
    });

    this.router.get('/company/:id', async (req, res) => {
      const details = await this.composerService.getCityWeather(req.params['id']);
      if ( details ) {
        res
          .status(200)
          .send(details);
      } else {
        res
          .status(400)
          .send(new Error(`Bad request sent.`));
      }
      this.log.info('Response from api was :', details);
    });

    this.router.get('/health', (req, res) => {
      this.log.info(`Calling path: ${req.route["path"]}`);
      res
        .status(200)
        .send({"health": "UP"});
    });
  }
}

