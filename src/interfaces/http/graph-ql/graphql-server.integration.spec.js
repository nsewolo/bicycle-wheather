import cors from 'cors';
import request from 'supertest';

import {GraphQlServer} from './graphql-server';

describe('GraphQL server', () => {
  let server;

  beforeAll( () => {
    const logger = {
      info: () => {},
      debug: () => {},
      error: () => {}
    };
    server = new GraphQlServer({
      logger,
      PORT: 3003,
      cors
    });

    server.start();
  });

  test('it should return message', async () => {
    // Given
    const expected = {"message": "Hello World!"};

    // When
    const response = await request(server.getApp())
      .post('/graphql')
      .send({query: '{message}'})
      .set('Accept', 'application/json');

    // Then
    const parsedResponse = JSON.parse(response.text);
    expect(parsedResponse.data).toEqual(expected);
    expect(response.statusCode).toEqual(200);
  });

  afterAll(() => {
    server
      .getApp()
      .close();
  });
});