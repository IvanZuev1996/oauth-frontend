import axios from 'axios';

import { backendUrl } from '../const/system';
import { getCookie } from '../lib/utils/cookies';

export const $axiosApi = axios.create({
  baseURL: backendUrl,
});

$axiosApi.interceptors.request.use((config) => {
  if (config.headers) {
    config.headers.Authorization = `Bearer ${getCookie('access_token')}`;
  }
  return config;
});
