import { RestApi } from './rest-api';

describe('BicycleWeather REST Api', () => {
  const restApi = new RestApi();

  test('it should return empty response when city is an empty string', () => {
    const town = restApi.getCityWeather('');

    expect(town).toEqual({});
  });

  test('it should return empty response when city is undefined', () => {
    const town = restApi.getCityWeather(undefined);

    expect(town).toEqual({});
  });

    test('it should return empty response when city is null', () => {
        const town = restApi.getCityWeather(null);

        expect(town).toEqual({});
    });
});
