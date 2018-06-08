import { BicycleWeatherComposerService } from './bicycle-weather-composer-service';
import {BicycleService} from "./bicycle-service";
import {WeatherService} from "./weather-service";

describe('BicycleWeatherCompoerService', () => {

    const bicycleService = new BicycleService();
    const weatherService = new WeatherService();

    const bicycleWeatherComposerService = new BicycleWeatherComposerService({bicycleService, weatherService});

    test('it should return undefined when company is empty', () => {
        const details = bicycleWeatherComposerService.getCityWeather('');

        expect(details).toEqual(undefined);
    });

});