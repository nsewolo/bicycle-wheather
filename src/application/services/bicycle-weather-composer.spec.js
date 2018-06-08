import { BicycleService } from './bicycle-service/bicycle-service';
import { WeatherService } from './weather-service/weather-service';
import { BicycleWeatherComposer } from './bicycle-weather-composer';

describe('BicycleWeatherCompoerService', () => {

  const bicycleService = new BicycleService();
  const weatherService = new WeatherService();

  const bicycleWeatherComposerService = new BicycleWeatherComposer({bicycleService, weatherService});

  test('it should return undefined when company is empty', () => {
    const details = bicycleWeatherComposerService.getCityWeather('');

    expect(details).toEqual(undefined);
  });

  test('it should return undefined when company is null', () => {
    const details = bicycleWeatherComposerService.getCityWeather(null);

    expect(details).toEqual(undefined);
  });

  test('it should return undefined when company is undefined', () => {
    const details = bicycleWeatherComposerService.getCityWeather(undefined);

    expect(details).toEqual(undefined);
  });

});