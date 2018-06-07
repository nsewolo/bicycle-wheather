import { BicycleService, WeatherService } from '../../application';

export default class BicycleWeatherApi {
  getWeatherOf( town ) {
    if (!town) {
      return {};
    }
    return undefined;
  }
}
