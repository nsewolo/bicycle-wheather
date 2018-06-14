import { BicycleService } from '../bicycle-service/bicycle-service';
import { WeatherService } from '../weather-service/weather-service';
import { BicycleWeatherComposer } from './bicycle-weather-composer';

describe('BicycleWeatherComponentService', () => {
  const logger = {
    info: ()=> {},
    debug: ()=> {},
    error: ()=> {}
  };
  const options = {
    logger: logger,
    bicycleService: new BicycleService({}),
    weatherService: new WeatherService({})
  };
  const bicycleWeatherComposerService = new BicycleWeatherComposer(options);

  test('it should return undefined when company is empty', async () => {
    const details = await bicycleWeatherComposerService.getCityWeather('');

    expect(details).toBeUndefined();
  });

  test('it should return undefined when company is null', async () => {
    const details = await bicycleWeatherComposerService.getCityWeather(null);

    expect(details).toBeUndefined();
  });

  test('it should return undefined when company is undefined', async () => {
    const details = await bicycleWeatherComposerService.getCityWeather(undefined);

    expect(details).toBeUndefined();
  });

  test('it should return undefined when company is unknown', async () => {
    const details = await bicycleWeatherComposerService.getCityWeather('unknown-company');

    expect(details).toBeUndefined();
  });

  test('it should return undefined when location was not found', async () => {
    // Given
    const httpService = {};
    httpService.get = jest.fn(() => undefined);
    const bicycleService = new BicycleService({logger, httpService});
    const weatherService = new WeatherService({logger, httpService});

    bicycleService.findLocationOf = jest.fn(() => undefined);
    weatherService.findConditionOf = jest.fn(() => undefined);
    const bicycleWeatherComposerService = new BicycleWeatherComposer({logger, bicycleService, weatherService });

    // When
    const result = await bicycleWeatherComposerService.getCityWeather('unknown-company');

    // Then
    expect(result).toBeUndefined();
    expect(bicycleService.findLocationOf).toHaveBeenCalled();
    expect(bicycleService.findLocationOf).toHaveBeenCalledWith('unknown-company');

    expect(weatherService.findConditionOf).toHaveBeenCalledTimes(0);
  });

  test('it should return details with empty condition property when weather condition is undefined', async () => {
    // Given
    const location = {
      "city": "Montréal, QC",
      "country": "CA",
      "latitude": 45.508693,
      "longitude": -73.553928
    };
    const expected = {
      "name": "Bixi",
      "condition": {},
      "location": {
        "city": "Montréal, QC",
        "country": "CA",
        "latitude": 45.508693,
        "longitude": -73.553928
      }
    };
    const httpService = {};
    httpService.get = jest.fn(() => undefined);
    const bicycleService = new BicycleService({httpService});
    const weatherService = new WeatherService({httpService});

    bicycleService.findLocationOf = jest.fn(() => location);
    weatherService.findConditionOf = jest.fn(() => undefined);
    const bicycleWeatherComposerService = new BicycleWeatherComposer({ bicycleService, weatherService });

    // When
    const result = await bicycleWeatherComposerService.getCityWeather('Bixi');

    // Then
    expect(result).toEqual(expected);
    expect(bicycleService.findLocationOf).toHaveBeenCalled();
    expect(bicycleService.findLocationOf).toHaveBeenCalledWith('Bixi');

    expect(weatherService.findConditionOf).toHaveBeenCalled();
    expect(weatherService.findConditionOf).toHaveBeenCalledWith('Montréal, QC');
  });

  test('it should return location weather details when company is known', async () => {
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
    const result = await bicycleWeatherComposerService.getCityWeather('Bixi');

    // Then
    expect(result).toEqual(expectedResult);
    expect(bicycleService.findLocationOf).toHaveBeenCalled();
    expect(bicycleService.findLocationOf).toHaveBeenCalledWith('Bixi');

    expect(weatherService.findConditionOf).toHaveBeenCalled();
    expect(weatherService.findConditionOf).toHaveBeenCalledWith('Montréal, QC');
  });
});