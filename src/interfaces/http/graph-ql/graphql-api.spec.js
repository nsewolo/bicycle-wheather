import * as cors from 'cors';

import { GraphQlApi } from './graph-ql-api';

describe('GraphQL Api', () => {
  let graphQlApi;

  beforeAll(() => {
    graphQlApi = new GraphQlApi({
      router: {
        use: jest.fn(() => {})
      },
      logger: {
        info: () => {
        },
        debug: () => {
        },
        error: () => {
        }
      },
      cors: cors
    });
  });

  test('it should return routes', () => {
    const routes = graphQlApi.getRoutes();

    expect(routes).toBeDefined();
    expect(routes.use).toHaveBeenCalled();
  });
});