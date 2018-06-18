import {RestApi} from './rest-api';

describe('RestApi', () => {
  let restApi;

  beforeAll(() => {
    restApi = new RestApi({
      logger: {
        info: () => {
        },
        debug: () => {
        },
        error: () => {
        }
      },
      router: {
        use: jest.fn(() => {
        }),
        get: jest.fn(() => {
        })
      }
    })
  });

  test('it should return routes', () => {
    const routes = restApi.getRoutes();

    expect(routes).toBeDefined();
    expect(routes.use).toHaveBeenCalled();
    expect(routes.get).toHaveBeenCalled();
  });
});