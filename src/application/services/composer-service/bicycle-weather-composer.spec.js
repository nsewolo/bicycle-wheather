import { BicycleService } from '../bicycle-service/bicycle-service';
import { WeatherService } from '../weather-service/weather-service';
import { BicycleWeatherComposer } from './bicycle-weather-composer';

describe('BicycleWeatherComponentService', () => {
  const options = {
    bicycleService: new BicycleService({}),
    weatherService: new WeatherService({})
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

  test('it should return undefined when location was not found', () => {
    // Given
    const httpService = {};
    httpService.get = jest.fn(() => undefined);
    const bicycleService = new BicycleService({httpService});
    const weatherService = new WeatherService({httpService});

    bicycleService.findLocationOf = jest.fn(() => undefined);
    weatherService.findConditionOf = jest.fn(() => undefined);
    const bicycleWeatherComposerService = new BicycleWeatherComposer({ bicycleService, weatherService });

    // When
    const result = bicycleWeatherComposerService.getCityWeather('unknown-company');

    // Then
    expect(result).toEqual(undefined);
    expect(bicycleService.findLocationOf).toHaveBeenCalled();
    expect(bicycleService.findLocationOf).toHaveBeenCalledWith('unknown-company');

    expect(weatherService.findConditionOf).toHaveBeenCalledTimes(0);
  });

  test('it should return undefined when weather condition is undefined', () => {
    // Given
    const location = {
      "city": "Montréal, QC",
      "country": "CA",
      "latitude": 45.508693,
      "longitude": -73.553928
    };
    const httpService = {};
    httpService.get = jest.fn(() => undefined);
    const bicycleService = new BicycleService({httpService});
    const weatherService = new WeatherService({httpService});

    bicycleService.findLocationOf = jest.fn(() => location);
    weatherService.findConditionOf = jest.fn(() => undefined);
    const bicycleWeatherComposerService = new BicycleWeatherComposer({ bicycleService, weatherService });

    // When
    const result = bicycleWeatherComposerService.getCityWeather('Bixi');

    // Then
    expect(result).toEqual(undefined);
    expect(bicycleService.findLocationOf).toHaveBeenCalled();
    expect(bicycleService.findLocationOf).toHaveBeenCalledWith('Bixi');

    expect(weatherService.findConditionOf).toHaveBeenCalled();
    expect(weatherService.findConditionOf).toHaveBeenCalledWith('Montréal, QC');
  });

  test('it should return location weather details when company is known', () => {
    // Given
    const location = {
      "city": "Montréal, QC",
      "country": "CA",
      "latitude": 45.508693,
      "longitude": -73.553928
    };
    const condition = {
      "code": "28",
      "date": "Thu, 07 Jun 2018 07:00 AM EDT",
      "temp": "56",
      "text": "Mostly Cloudy"
    };
    const expectedResult = {
      "name": "Bixi",
      "location": location,
      "condition": condition
    };
    const httpService = {};
    httpService.get = jest.fn(() => undefined);
    const bicycleService = new BicycleService({httpService});
    const weatherService = new WeatherService({httpService});
    bicycleService.findLocationOf = jest.fn(() => location);
    weatherService.findConditionOf = jest.fn(() => condition);
    const bicycleWeatherComposerService = new BicycleWeatherComposer({ bicycleService, weatherService });

    // When
    const result = bicycleWeatherComposerService.getCityWeather('Bixi');

    // Then
    expect(result).toEqual(expectedResult);
    expect(bicycleService.findLocationOf).toHaveBeenCalled();
    expect(bicycleService.findLocationOf).toHaveBeenCalledWith('Bixi');

    expect(weatherService.findConditionOf).toHaveBeenCalled();
    expect(weatherService.findConditionOf).toHaveBeenCalledWith('Montréal, QC');
  });
});