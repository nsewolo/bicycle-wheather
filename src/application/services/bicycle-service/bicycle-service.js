import { HttpInterface } from '../http-interface';

export class BicycleService extends HttpInterface {

  constructor({httpService}) {
    super({ httpService });
  }

  findLocationOf(company) {
    if ( !company ) {
      console.log(`Company invalid argument received '${company}'`);
      return undefined;
    }
    return this._getLocationOfCompany(company);
  }

  // private methods
  async _getLocationOfCompany(company) {
    const url = 'http://api.citybik.es/v2/networks';
    const response = await this.httpService.get(url);

    if ( !response || !response['data'] ) {
      console.log(`Invalid response received from '${url}'`);
      return undefined;
    }
    const networks = response['data']['networks'];
    if ( networks ) {
      for (const network of networks) {
        if (network['name'] === company) {
          const location = network['location'];
          console.log('Found location: ', location);
          return location;
        }
      }
    }
    console.log(`Invalid response received from '${url}' missing property 'networks'`);
    return undefined;
  }
}
