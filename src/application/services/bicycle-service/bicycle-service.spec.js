import {BicycleInterface} from "./interfaces/biclycle-interface";
import {BicycleService} from "./bicycle-service";

describe('BicycleService', () => {

    const BASE_URL = {baseURL: 'http://api.citybik.es/v2/networks'};
    const bicycleInterface = new BicycleService();

    describe('GetCity', () => {

        test('it should return undefined when company is an empty string', async () => {
            expect.assertions(1);
            const city = await bicycleInterface.getBicycleCompany('');

            expect(city).toEqual(undefined);
        });

        test('it should return undefined when company is null', async () => {
            expect.assertions(1);
            const city = await bicycleInterface.getBicycleCompany(null);

            expect(city).toEqual(undefined);
        });

        test('it should return undefined when company is undefined', async () => {
            expect.assertions(1);
            const city = await bicycleInterface.getBicycleCompany(undefined);

            expect(city).toEqual(undefined);
        });

        test('it should return undefined when the requested company is unknown', async () => {
            expect.assertions(1);
            const city = await bicycleInterface.getBicycleCompany('unknown-company');

            expect(city).toEqual(undefined);
        });

        test('it should return city details', async () => {
            const response = {
                data: [{
                    "company": [
                        "Bike U Sp. z o.o."
                    ],
                    "href": "/v2/networks/bbbike",
                    "id": "bbbike",
                    "location": {
                        "city": "Bielsko-Bia\u0142a",
                        "country": "PL",
                        "latitude": 49.8225,
                        "longitude": 19.044444
                    },
                    "name": "BBBike"
                }]
            };

            expect.assertions(1);
            const expectedCity = {};
            const city = await bicycleInterface.getBicycleCompany('BIXI');

            expect(city).toEqual(expectedCity);
        });
    });
});