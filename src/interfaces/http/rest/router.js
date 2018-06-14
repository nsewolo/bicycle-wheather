export class Router {

  constructor({logger, router, composerService}) {
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
      this.log.info('Time: ', new Date().toString());
      next();
    });

    this.router.get('/company/:id', async (req, res) => {
      const id = req.params['id'];
      if (id) {
        const details = await this.composerService.getCityWeather(id);
        if (details) {
          res
            .status(200)
            .send(details);
        } else {
          res
            .status(400)
            .send(new Error(`Bad request sent.`));
        }
        this.log.info('Response from api was :', details);
      } else {
        res
          .status(422)
          .send(new Error(`Bad parameter request sent. Provided value: ${id}`));
        this.log.error(`Bad parameter request sent. Provided value: ${id}`);
      }
    });

    this.router.get('/health', (req, res) => {
      this.log.info(`Calling path: ${req.route["path"]}`);
      res
        .status(200)
        .send({"health": "UP"});
    });
  }
}

