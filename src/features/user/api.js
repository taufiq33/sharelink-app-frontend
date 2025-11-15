import { baseApi } from "@/lib/axios";

export async function fetchMe() {
  try {
    const { data } = await baseApi.get("/me");
    return data.data.user;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}
