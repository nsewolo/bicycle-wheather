import {HttpInterface} from '../http-interface';

export class WeatherService extends HttpInterface {

  constructor({httpService}) {
    super({httpService});
  }

  async findConditionOf(city) {
    if (!city) {
      return undefined;
    }
    return await this._getConditionOf(city);
  }

  // private methods
  async _getConditionOf(city) {
    const urlQuery = WeatherService._buildQuery(city);
    const response = await this.httpService.get(urlQuery);
    const condition = await this._extractConditionFrom(response);

    if ( !condition ) {
      console.log(`Unable to find condition, invalid response from api received: '${condition}'`);
      return undefined;
    }
    delete condition['code'];
    return {"condition": condition};
  }

  static _buildQuery(city) {
    return `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${city}")&format=json&env=store://datatables.org/alltableswithkeys`;
  }

  async _extractConditionFrom(response) {
    try {
      return response['data']['query']['results']['channel']['item']['condition'];
    } catch (error) {
      return undefined;
    }
  }
}