import { HttpInterface } from '../http-interface';

export class BicycleService extends HttpInterface {

  constructor({logger, httpService}) {
    super({ httpService });
    this.log = logger;
  }

  findLocationOf(company) {
    if ( !company ) {
      this.log.debug(`Company invalid argument received '${company}'`);
      return undefined;
    }
    return this._getLocationOfCompany(company);
  }

  // private methods
  async _getLocationOfCompany(company) {
    const url = 'http://api.citybik.es/v2/networks';
    const response = await this.fetch(url);

    if ( !response || !response['data'] ) {
      this.log.error(`Invalid response received from '${url}'`);
      return undefined;
    }
    const networks = response['data']['networks'];
    if ( networks ) {
      //TODO: use functional style instead
      for (const network of networks) {
        if (network['name'] === company) {
          const location = network['location'];
          this.log.debug('Found location: ', location);
          return location;
        }
      }
    }
    this.log.error(`Invalid response received from '${url}' missing property 'networks'`);
    return undefined;
  }
}
