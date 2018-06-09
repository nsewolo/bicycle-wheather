import { HttpInterface } from '../http-interface';

export class WeatherService extends HttpInterface {

  constructor({httpService}) {
    super({ httpService });
  }

  findConditionOf( city ) {
    return undefined;
  }
}