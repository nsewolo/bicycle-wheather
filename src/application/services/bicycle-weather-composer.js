import { BicycleService } from './bicycle-service';
import { WeatherService } from './weather-service';

export class BicycleWeatherComposer {

  constructor({
                bicycleService = new BicycleService(),
                weatherService = new WeatherService()}) {

    this.bicycleService = bicycleService;
    this.weatherService = weatherService;
  }

  getCityWeather(company) {
    if ( !company ) {
      return undefined;
    }
    return this._getCityWeatherDetails(company);
  }

  // private methods
  _getCityWeatherDetails(company) {
    const location = this.bicycleService.findLocationOf(company);
    if ( location ){
      const city = location['city'];
      const condition = this.weatherService.findConditionOf(city);
      if ( condition ) {
        return {
          "name": company,
          "location": location,
          "condition": condition
        };
      }
      console.log(`Company '${company}' is not known in bicycle networks`);
      return undefined;
    }
    console.log(`Company '${company}' is not known in bicycle networks`);
    return location;
  }
}