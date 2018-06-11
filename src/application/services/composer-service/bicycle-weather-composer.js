import { BicycleService } from '../bicycle-service/index';
import { WeatherService } from '../weather-service/index';

export class BicycleWeatherComposer {

  constructor({
                bicycleService = new BicycleService({}),
                weatherService = new WeatherService({}) }) {

    this.bicycleService = bicycleService;
    this.weatherService = weatherService;
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
    if ( location ){
      const city = location['city'];
      const condition = await this.weatherService.findConditionOf(city);
      if ( condition ) {
        return {
          "name": company,
          "location": location,
          "condition": condition
        };
      }
      console.log(`City '${city}' is unknown from weather system`);
      return undefined;
    }
    console.log(`Location '${location}' is unknown from bicycle networks`);
    return location;
  }
}