import { WeatherService } from './weather-service';
import weatherValidResponse from '../../data/weather-valid-response';
import weatherInvalidResponse from '../../data/weather-invalid-response';

describe('WeatherService', () => {

  const weatherService = new WeatherService({});

  test('it should return undefined when city is empty', async () => {
    const result = await weatherService.findConditionOf('');

    expect(result).toBeUndefined();
  });

  test('it should return undefined when city is undefined', async () => {
    const result = await weatherService.findConditionOf();

    expect(result).toBeUndefined();
  });

  test('it should return undefined when city is null', async () => {
    const result = await weatherService.findConditionOf(null);

    expect(result).toBeUndefined();
  });

  test('it should return undefined when received undefined response from api', async () => {
    // Given
    const httpService = {};
    httpService.get = jest.fn(() => undefined);
    const mockedService = new WeatherService({httpService});

    // When
    const city = 'any-value';
    const location = await mockedService.findConditionOf(city);

    // Then
    expect(location).toBeUndefined();
    expect(httpService.get).toHaveBeenCalled();
    expect(httpService.get).toHaveBeenCalledWith(buildQuery(city));
  });

  test('it should return undefined when received invalid response from api', async () => {
    // Given
    const httpService = {};
    httpService.get = jest.fn(() => weatherInvalidResponse);
    const mockedService = new WeatherService({httpService});

    // When
    const city = 'Montréal, QC';
    const location = await mockedService.findConditionOf(city);

    // Then
    expect(location).toBeUndefined();
    expect(httpService.get).toHaveBeenCalled();
    expect(httpService.get).toHaveBeenCalledWith(buildQuery(city));
  });

  test('it should return valid condition when received valid response from api', async () => {
    // Given
    const condition = {
      "condition": {
        "date": "Thu, 07 Jun 2018 07:00 AM EDT",
        "temp": "56",
        "text": "Mostly Cloudy"
      }
    };
    const httpService = {};
    httpService.get = jest.fn(() => weatherValidResponse);
    const mockedService = new WeatherService({httpService});

    // When
    const city = 'Montréal, QC';
    const result = await mockedService.findConditionOf(city);

    // Then
    expect(result).toEqual(condition);
    expect(httpService.get).toHaveBeenCalled();
    expect(httpService.get).toHaveBeenCalledWith(buildQuery(city));
  });

  function buildQuery(city) {
    return `https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${city}")&format=json&env=store://datatables.org/alltableswithkeys`;
  }
});