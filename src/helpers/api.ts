import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const { REACT_APP_SERVER_BASE_URL } = process.env;
export const { REACT_APP_API_TIMEOUT } = process.env;

const NOCACHE = {
  'Content-Type': 'application/json',
  'Cache-Control': 'no-cache, must-revalidate',
  Expires: 0,
};

const config: AxiosRequestConfig = {
  baseURL: REACT_APP_SERVER_BASE_URL,
  timeout: REACT_APP_API_TIMEOUT ? parseInt(REACT_APP_API_TIMEOUT) : 25000,
  headers: NOCACHE,
};

export const api = (options: AxiosRequestConfig = {}): Promise<AxiosResponse> =>
  axios.request({ ...config, ...options });
