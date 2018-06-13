export class Router {

  constructor({router, composerService}) {
    this.router = router;
    this.composerService = composerService;

    this._registerRoutes();
  }

  getRoutes() {
    return this.router;
  }

  // private methods
  _registerRoutes() {
    this.router.use(function timeLog(req, res, next) {
      console.log('Time: ', Date.now());
      next()
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

        console.log('Response from api was :', details);
      } else {
        res
          .status(422)
          .send(new Error(`Bad parameter request sent. Provided value: ${id}`));

        console.log(`Bad parameter request sent. Provided value: ${id}`);
      }
    });

    this.router.get('/health', (req, res) => {
      console.log('Calling path: ', req.route.path);
      res
        .status(200)
        .send({"health": "UP"});
    });
  }
}

