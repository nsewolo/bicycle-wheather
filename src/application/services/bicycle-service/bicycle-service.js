import { HttpInterface } from '../http-interface';

export class BicycleService extends HttpInterface {

  constructor({ logger, httpService }) {
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
    const networks = this._extractNetworks(await this.fetch(url));
    if ( networks ) {
      return this._findLocation(networks, company);
    }
    this.log.error(`Invalid response received from '${url}' missing property 'networks'`);
    return undefined;
  }

  _findLocation(networks, company) {
    for (const network of networks) {
      if ( network['name'] === company ) {
        return network['location'];
      }
    }
    return undefined;
  }

  _extractNetworks(data) {
    if ( !data || !data['data'] ) {
      return undefined;
    }
    return data['data']['networks'];
  }
}
