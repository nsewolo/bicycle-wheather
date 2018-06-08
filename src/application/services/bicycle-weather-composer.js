import { BicycleService } from './bicycle-service';
import { WeatherService } from './weather-service';

export class BicycleWeatherComposer {

  constructor() {
    this.bicycleService = new BicycleService();
    this.weatherService = new WeatherService();
  }

  getCityWeather(company) {
    if ( !company ) {
      return undefined;
    }
    return this._getCityWeatherDetails(company);
  }

  // private methods
  _getCityWeatherDetails(company) {
    const result = this.bicycleService.findCompany(company);
    if ( result ){
      return {
        'name': company,
      };
    }
    return result;
  }
}