import axios, {AxiosInstance, AxiosRequestConfig, Method} from 'axios';
import {HTTP_METHODS} from '../consts/net';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 10000,
  headers: {'Content-Type': 'application/json'},
});

const createApiMethod =
  (_axiosInstance: AxiosInstance, methodType: Method) =>
  (config: AxiosRequestConfig): Promise<any> => {
    _axiosInstance.interceptors.request.use(config => {
      const token = cookies.get('access_token');
      if (config.headers) {
        config.headers.Authorization = token ? `Bearer ${token}` : '';
      }
      console.log(config);
      return config;
    });

    _axiosInstance.interceptors.response.use(response => {
      if (!response.data) return response;
      return response.data.data;
    });

    return _axiosInstance({
      ...config,
      method: methodType,
    });
  };

export default {
  get: createApiMethod(axiosInstance, HTTP_METHODS.GET),
  post: createApiMethod(axiosInstance, HTTP_METHODS.POST),
  patch: createApiMethod(axiosInstance, HTTP_METHODS.PATCH),
  put: createApiMethod(axiosInstance, HTTP_METHODS.PUT),
  delete: createApiMethod(axiosInstance, HTTP_METHODS.DELETE),
};
