import axios from 'axios';

export class BicycleService {

  constructor({httpService = axios}) {
    this.httpService = httpService;
  }

  findLocationOf(company) {
    if ( !company ) {
      return undefined;
    }
    return this._getLocationOfCompany(company).then( location => location);
  }

  // private methods
  _getLocationOfCompany(company) {
    const url = 'http://api.citybik.es/v2/networks';

    return this.httpService.get(url)
      .then(response => {
        if ( !response.data ) {
          console.log(`Invalid response received from '${url}'`);
          return undefined;
        }
        const networks = response['data']['networks'];
        if (networks) {
          for (const network of networks) {
            if (network['name'] === company) {
              return network['location'];
            }
          }
        }
        console.log(`Invalid response received from '${url}' missing property 'networks'`);
        return undefined;
      })
      .catch(error => {
        console.log(`Invalid response received from '${url}' error: ${error}`);
        return undefined;
      });
  }
}
