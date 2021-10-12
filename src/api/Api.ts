import axios, { AxiosInstance } from 'axios';

interface Config {
  timeout: number;
  headers: Headers;
  validateStatus: (status: number) => boolean;
  baseURL: string;
}

interface Headers {
  Accept: string;
  'Content-Type': string;
}

export class Api {
  baseConfig: Config;

  baseHeaders: Headers;

  baseUrl: string;

  utility: AxiosInstance;

  constructor() {
    this.baseHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };

    this.baseUrl = this.setBaseUrl();

    this.baseConfig = {
      baseURL: this.baseUrl,
      timeout: 60000,
      headers: this.baseHeaders,
      validateStatus: (status: number) => {
        return status >= 200 && status < 300;
      },
    };
    //@ts-ignore
    this.utility = axios.create(this.baseConfig);
  }
  setAuthUtility(authToken: string) {
    //@ts-ignore
    this.utility.defaults.headers.common.Authorization = authToken;
  }

  setBaseUtility() {
    //@ts-ignore
    this.utility.defaults.headers.common.Authorization = undefined;
  }

  setBaseUrl() {
      return 'http://localhost:3000';
  }
}

const api = new Api();

export default api;
