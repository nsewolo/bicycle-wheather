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
      }
    });
  });

  test('it should return routes', () => {
    const routes = graphQlApi.getRoutes();

    expect(routes).toBeDefined();
    expect(routes.use).toHaveBeenCalled();
  });
});