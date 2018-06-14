import { HttpInterface } from '../http-interface';

export class WeatherService extends HttpInterface {

  constructor({ logger, httpService }) {
    super({ httpService });
    this.log = logger;
  }

  async findConditionOf(city) {
    if ( !city ) {
      this.log.info(`Find condition invalid city received: '${city}'`);
      return undefined;
    }
    return await this._getConditionOf(city);
  }

  // private methods
  async _getConditionOf(city) {
    const response = await this.fetch(this._buildQuery(city));
    const condition = await this._extractCondition(response);

    if ( !condition ) {
      this.log.info(`City '${city}' is unknown from weather system, received: '${condition}'`);
      return undefined;
    } else {
      this.log.info(`City '${city}' found in weather system.`);
      delete condition['code'];

      return {"condition": condition};
    }
  }

  _extractCondition(response) {
    try {
      return response['data']['query']['results']['channel']['item']['condition'];
    } catch (error) {
      this.log.error(`Unable to parse response received from 'Weather-Api'`, error);
      return undefined;
    }
  }

  _buildQuery(city) {
    return `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${city}")&format=json&env=store://datatables.org/alltableswithkeys`;
  }
}