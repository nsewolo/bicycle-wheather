import axios from 'axios/index';

export class HttpInterface {

  constructor({httpService = axios}) {
    this.httpService = httpService;
  }

  async fetch(url) {
    return await this.httpService.get(url);
  }

  async send(url, data, options) {
    return await this.httpService.post(url, data, options);
  }
}