import axios from 'axios';

export class BicycleService {

  constructor({httpService = axios}) {
    this.httpService = httpService;
  }

  findLocationOf(company) {
    if ( !company ) {
      return undefined;
    }
    return this._getLocationOfCompany(company);
  }

  // private methods
  _getLocationOfCompany(company) {
    const url = 'http://api.citybik.es/v2/networks';

    const response = this.httpService.get(url);
    if ( !response ) {
      console.log(`Invalid response received from '${url}'`);
      return undefined;
    }

    const networks = response['networks'];
    if ( !networks ) {
      console.log(`Invalid response received from '${url}' missing property 'networks'`);
    }
    // for (const network of networks) {
    //   const cmp = network['name'];
    //   if (cmp === company) {
    //     console.info(`Returned a valid city: ${cmp}`);
    //     return cmp;
    //   }
    // }
    console.debug(`No valid response received from tier api`);

    return undefined;
  }
}
