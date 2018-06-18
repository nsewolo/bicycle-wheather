import cors from 'cors';
import express from 'express';
import request from 'supertest';

import { GraphQlApi } from './graph-ql-api';

describe('GraphQL Api Integration tests', () => {
  let api;
  const server = express();
  const PORT = 3003;

  beforeAll(() => {
    api = new GraphQlApi({
      logger: {
        info: () => {},
        debug: () => {},
        error: () => {}
      },
      cors: cors,
      router: express.Router(),
    });

    server.use(api.getRoutes());
    server.listen(PORT)
  });

  test('it should return message', async () => {
    // Given
    const expected = {"message": "Hello World!"};

    // When
    const response = await request(server)
      .post('/graphql')
      .send({query: '{message}'})
      .set('Accept', 'application/json');

    // Then
    const parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.data).toEqual(expected);
    expect(response.statusCode).toEqual(200);
  });

  afterAll(() => {
    server.close();
  });
});