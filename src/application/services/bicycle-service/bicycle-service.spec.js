import axios from 'axios';
import { BicycleService } from './bicycle-service';

describe('BicycleService', () => {

  const bicycleService = new BicycleService({httpService: axios});

  describe('findLocationOf', () => {

    test('it should return undefined when company is an empty string', async () => {
      expect.assertions(1);
      const city = await bicycleService.findLocationOf('');

      expect(city).toEqual(undefined);
    });

    test('it should return undefined when company is null', async () => {
      expect.assertions(1);
      const city = await bicycleService.findLocationOf(null);

      expect(city).toEqual(undefined);
    });

    test('it should return undefined when company is undefined', async () => {
      expect.assertions(1);
      const city = await bicycleService.findLocationOf(undefined);

      expect(city).toEqual(undefined);
    });

    test('it should return undefined when the requested company is unknown', async () => {
      // Given
      const httpService = {};
      httpService.get = jest.fn(() => undefined);
      const mockedService = new BicycleService({httpService});

      // When
      const location = await mockedService.findLocationOf('unknown-company');

      // Then
      expect(location).toEqual(undefined);
      expect(httpService.get).toHaveBeenCalled();
      expect(httpService.get).toHaveBeenCalledWith('http://api.citybik.es/v2/networks');
    });

    test('it should return city details', async () => {
      // Given
      const response = {
        data: [{
          "networks": [
            {
              "company": [
                "Motivate International, Inc.",
                "PBSC Urban Solutions",
                "BIXI Montr\u00e9al"
              ],
              "gbfs_href": "https://api-core.bixi.com/gbfs/gbfs.json",
              "href": "/v2/networks/bixi-montreal",
              "id": "bixi-montreal",
              "location": {
                "city": "Montr\u00e9al, QC",
                "country": "CA",
                "latitude": 45.508693,
                "longitude": -73.553928
              },
              "name": "Bixi"
            },
            {
              "company": [
                "PBSC",
                "Alta Bicycle Share, Inc"
              ],
              "href": "/v2/networks/melbourne-bike-share",
              "id": "melbourne-bike-share",
              "location": {
                "city": "Melbourne",
                "country": "AU",
                "latitude": -37.814107,
                "longitude": 144.96328
              },
              "name": "Melbourne Bike Share"
            }
          ]
        }]
      };
      const httpService = {};
      httpService.get = jest.fn(() => response);
      const mockedService = new BicycleService({httpService});

      // When
      const location = await mockedService.findLocationOf('Bixi');

      expect(location).toEqual({});
      expect(httpService.get).toHaveBeenCalled();
      expect(httpService.get).toHaveBeenCalledWith('http://api.citybik.es/v2/networks');
    });
  });
});