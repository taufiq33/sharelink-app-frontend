import { baseApi } from "@/lib/axios";

export async function getAppStats() {
  try {
    const request = await baseApi.post("/admin/getStats");
    return request.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}

export async function get5LastAppStats() {
  try {
    const request = await baseApi.post("/admin/getRecentStats");
    return request.data;
  } catch (error) {
    return Promise.reject(error.response.data);
  }
}
