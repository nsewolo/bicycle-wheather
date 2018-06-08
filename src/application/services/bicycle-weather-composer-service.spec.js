import { BicycleService } from './bicycle-service/bicycle-service';
import { WeatherService } from './weather-service/weather-service';
import { BicycleWeatherComposerService } from './bicycle-weather-composer-service';

describe('BicycleWeatherCompoerService', () => {

    const bicycleService = new BicycleService();
    const weatherService = new WeatherService();

    const bicycleWeatherComposerService = new BicycleWeatherComposerService({bicycleService, weatherService});

    test('it should return undefined when company is empty', () => {
        const details = bicycleWeatherComposerService.getCityWeather('');

        expect(details).toEqual(undefined);
    });

});