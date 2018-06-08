import axios from 'axios';
import JSON_DATA from '../../data/networks';
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
      const expectation = {
        "city": "Montréal, QC",
        "country": "CA",
        "latitude": 45.508693,
        "longitude": -73.553928
      };
      const httpService = {};
      httpService.get = jest.fn(() => JSON_DATA);
      const mockedService = new BicycleService({httpService});

      // When
      const result = await mockedService.findLocationOf('Bixi');

      expect(result).toEqual(expectation);
      expect(httpService.get).toHaveBeenCalled();
      expect(httpService.get).toHaveBeenCalledWith('http://api.citybik.es/v2/networks');
    });
  });
});