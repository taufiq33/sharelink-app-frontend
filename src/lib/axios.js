import axios from "axios";
import { getAccessToken } from "@/store";
import { requestNewAccessToken } from "@/features/auth/api";
import { authActions } from "@/features/auth/slices";

export const baseURLApi = "http://localhost:3300";

const baseApi = axios.create({
  baseURL: baseURLApi,
  withCredentials: true,
});

function requestInterceptor(config) {
  config.headers = {
    ...config.headers,
    Authorization: "Bearer " + getAccessToken(),
  };

  return config;
}

async function errorResponseInterceptor(error) {
  const originalConfig = error.config;

  if (error?.response?.status === 401 && !originalConfig._retry) {
    originalConfig._retry = true;

    try {
      const _newAccessToken = await requestNewAccessToken();

      authActions.saveAccessToken(_newAccessToken.data);

      return baseApi(originalConfig);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
  return Promise.reject(error);
}

function successResponseInterceptor(response) {
  return response;
}

baseApi.interceptors.request.use(requestInterceptor);
baseApi.interceptors.response.use(
  successResponseInterceptor,
  errorResponseInterceptor
);

export { baseApi };
