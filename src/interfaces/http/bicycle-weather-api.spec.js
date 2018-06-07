import { BicycleWeatherApi } from './bicycle-weather-api';

describe('BicycleWeather REST Api', () => {

    const bicycleWeatherApi = new BicycleWeatherApi();

    test('it should return empty response when empty town', () => {
        const town = bicycleWeatherApi.getWeatherOf('');

        expect(town).toEqual({});
    });

    test('it should return empty response when empty town', () => {
        const town = bicycleWeatherApi.getWeatherOf(undefined);

        expect(town).toEqual({});
    });
});