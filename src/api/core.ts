import axios, {AxiosInstance, AxiosRequestConfig, Method} from 'axios';
import {HTTP_METHODS} from '../consts/net';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  timeout: 10000,
  headers: {'Content-Type': 'application/json'},
});

const createApiMethod =
  (_axiosInstance: AxiosInstance, methodType: Method) =>
  (config: AxiosRequestConfig): Promise<any> => {
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
