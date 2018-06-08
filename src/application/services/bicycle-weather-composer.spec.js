import { BicycleService } from './bicycle-service/bicycle-service';
import { WeatherService } from './weather-service/weather-service';
import { BicycleWeatherComposer } from './bicycle-weather-composer';

describe('BicycleWeatherCompoerService', () => {
  const options = {
    bicycleService: new BicycleService(),
    weatherService: new WeatherService()
  };
  const bicycleWeatherComposerService = new BicycleWeatherComposer(options);

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

  test('it should return undefined when company is unknown', () => {
    const details = bicycleWeatherComposerService.getCityWeather('unknown-company');

    expect(details).toEqual(undefined);
  });

  test('it should return location weather details when company is known', () => {
    const expectedResult = {
      "name": "Bixi",
      "location": {
        "city": "Montréal, QC",
        "country": "CA",
        "latitude": 45.508693,
        "longitude": -73.553928
      },
      "condition": {
        "code": "28",
        "date": "Thu, 07 Jun 2018 07:00 AM EDT",
        "temp": "56",
        "text": "Mostly Cloudy"
      }
    };
    bicycleWeatherComposerService.getCityWeather = jest.fn(() => expectedResult);
    const company = 'bixi';
    const result = bicycleWeatherComposerService.getCityWeather(company);

    expect(result).toEqual(expectedResult);
    expect(bicycleWeatherComposerService.getCityWeather).toHaveBeenCalled();
    expect(bicycleWeatherComposerService.getCityWeather).toHaveBeenCalledTimes(1);
    expect(bicycleWeatherComposerService.getCityWeather).toHaveBeenCalledWith(company);
  });
});