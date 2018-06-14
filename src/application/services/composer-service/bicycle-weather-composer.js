import { BicycleService } from '../bicycle-service/index';
import { WeatherService } from '../weather-service/index';

export class BicycleWeatherComposer {

  constructor({ logger, bicycleService = new BicycleService({logger}),
                weatherService = new WeatherService({logger}) }) {

    this.bicycleService = bicycleService;
    this.weatherService = weatherService;
    this.log = logger;
  }

  async getCityWeather(company) {
    if ( !company ) {
      return undefined;
    }
    return await this._getCityWeatherDetails(company);
  }

  // private methods
  async _getCityWeatherDetails(company) {
    const location = await this.bicycleService.findLocationOf(company);
    if ( location ) {
      const condition = await this.weatherService.findConditionOf(location['city']);
      return {
        "name": company,
        "location": location,
        "condition": condition ? condition: {}
      };
    }
    this.log.debug(`Location '${location}' is unknown from bicycle networks`);
    return location;
  }
}