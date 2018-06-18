export class Routes {

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
      this.log.info(`Time: ${new Date().toString()}`);
      next();
    });

    this.router.get('/company/:id', async (req, res) => {
      const details = await this.composerService.getCityWeather(req.params['id']);
      if ( details ) {
        res
          .status(200)
          .send(details);
        this.log.info(`Response from api was: , with status '${res.statusCode}'`, details);
      } else {
        res
          .status(400)
          .send(new Error(`Bad request sent.`));
        this.log.error(`Response from api with status '${res.statusCode}'`);
      }
    });

    this.router.get('/health', (req, res) => {
      res
        .status(200)
        .send({"health": "UP"});
      this.log.info(`Response from api was: , with status '${res.statusCode}'`);
    });
  }
}

