import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

const tradeCardApi = axios.create({
  baseURL: process.env.BASE_URL,
});

tradeCardApi.interceptors.request.use(
  config => {
    const token = localStorage.getItem('Token');
    if (token) {
      config.headers[
        'Authorization'
      ] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = tradeCardApi;
});

export { tradeCardApi };
