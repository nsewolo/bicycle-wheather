import { BicycleService } from './bicycle-service';
import { WeatherService } from './weather-service';

export class BicycleWeatherComposerService {

  constructor() {
    this.bicycleService = new BicycleService();
    this.weatherService = new WeatherService();
  }

  getCityWeather(company) {
    if (!company) {
      return undefined;
    }
    return this._getCityWeatherDetails(company);
  }

  _getCityWeatherDetails(company) {
    return {
      'name': company,
    };
  }
}