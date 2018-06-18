import express from 'express';
import request from 'supertest';
import compression from 'compression';

import { RestApi } from './rest-api';

describe('Integration testing', () => {
  let api;
  const server = express();
  const PORT = 3002;

  beforeAll(() => {
    const logger = {
      info: () => {
      },
      debug: () => {
      },
      error: () => {
      }
    };
    api = new RestApi({
      logger: logger,
      compression: compression,
      router: express.Router()
    });

    server.use(api.getRoutes());
    server.listen(PORT);
  });

  test('It should details for a given company', async () => {
    const response = await request(server).get('/company/Bixi');
    const expected = {
      "name": "Bixi",
      "location": {
        "city": "Montréal, QC",
        "country": "CA",
        "latitude": 45.508693,
        "longitude": -73.553928
      },
      "condition": {
        "condition": {
          "date": "Mon, 11 Jun 2018 11:00 AM EDT",
          "temp": "66", "text": "Sunny"
        }
      }
    };
    const parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.name).toEqual(expected.name);
    expect(parsedResponse.location).toEqual(expected.location);
    expect(parsedResponse.condition).toBeDefined();
    expect(response.statusCode).toEqual(200);
  });

  test('It should response with 400 when unknown company', async () => {
    return request(server).get('/company/unknown').expect(400);
  });

  test('It should response health with 200', async () => {
    return request(server).get('/health').expect(200);
  });

  afterAll(() => {
    server.close();
  });
});