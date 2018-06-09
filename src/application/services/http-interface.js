import axios from 'axios/index';

export class HttpInterface {

  constructor({httpService = axios}) {
    this.httpService = httpService;
  }
}