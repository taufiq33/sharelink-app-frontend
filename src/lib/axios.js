import axios from "axios";
import { getAccessToken, appStore } from "@/store";

import { requestNewAccessToken } from "@/features/auth/api";
import { saveAndDecodeAccessToken } from "@/features/auth/authCustomActions";

// // export const baseURLApi = "http://localhost:3300";
// export const baseURLApi = "http://10.193.230.216:3300";
export const baseURLApi = import.meta.env.VITE_API_BASE_URL;

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

  if (
    error?.response?.status === 401 &&
    !originalConfig._retry &&
    !originalConfig.skipAuthRedirect
  ) {
    originalConfig._retry = true;

    try {
      const _newAccessToken = await requestNewAccessToken();

      appStore.dispatch(saveAndDecodeAccessToken(_newAccessToken));

      return baseApi(originalConfig);
    } catch (refreshError) {
      window.location.href = "/auth/login";
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
  errorResponseInterceptor,
);

export { baseApi };
