import { baseApi, baseURLApi } from "@/lib/axios";
import axios from "axios";

export async function login(email, password) {
  try {
    const request = await axios.post(
      baseURLApi + "/auth/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );

    return request.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}
export async function logout() {
  try {
    const request = await baseApi.delete("/auth/logout", {
      withCredentials: true,
    });

    return request.data;
  } catch (error) {
    return Promise.reject(error);
  }
}
export async function register() {}
export async function nextStepRegister() {}
export async function requestNewAccessToken() {
  try {
    const request = await axios.get(baseURLApi + "/auth/token", {
      withCredentials: true,
    });

    const newAccessToken = request.data.accessToken;
    return newAccessToken;
  } catch (error) {
    return Promise.reject(error);
  }
}
