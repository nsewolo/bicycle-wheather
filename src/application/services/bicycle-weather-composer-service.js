export class BicycleWeatherComposerService {
    constructor({bicycleService, weatherService}) {
        this.bicycleService = bicycleService;
        this.weatherService = weatherService;
    }

    getCityWeather(company) {
        if ( !company ) {
            return undefined;
        }
        return this.getCityWeatherDetails(company);
    }

    getCityWeatherDetails(company) {
        this.bicycleService.get
        return  {
            'name': company,
        };
    }
}